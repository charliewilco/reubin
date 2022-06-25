type EvictionHandler<KeyType, ValueType> = (key: KeyType, value: ValueType) => void;

export interface Options<KeyType, ValueType> {
  /**
      The maximum number of milliseconds an item should remain in the cache.
      @default Infinity
      By default, `maxAge` will be `Infinity`, which means that items will never expire.
      Lazy expiration upon the next write or read call.
      Individual expiration of an item can be specified by the `set(key, value, maxAge)` method.
      */
  readonly maxAge?: number;

  /**
      The maximum number of items before evicting the least recently used items.
      */
  readonly maxSize: number;

  /**
      Called right before an item is evicted from the cache.
      Useful for side effects or for items like object URLs that need explicit cleanup (`revokeObjectURL`).
      */
  onEviction?: EvictionHandler<KeyType, ValueType>;
}

interface IValue<T> {
  value: T;
  maxAge?: number;
  expiry?: number;
}

type CacheIterable<T, K> = Iterable<[K, T]>;

export class QuickLRU<KeyType, ValueType> implements CacheIterable<KeyType, ValueType> {
  private _size: number;
  public oldCache: Map<KeyType, IValue<ValueType>>;
  public cache: Map<KeyType, IValue<ValueType>>;
  public maxSize: number;
  public maxAge: number;
  private onEviction?: EvictionHandler<KeyType, ValueType>;
  constructor(options: Options<KeyType, ValueType>) {
    if (!(options.maxSize && options.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }

    if (typeof options.maxAge === "number" && options.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }

    // TODO: Use private class fields when ESLint supports them.
    this.maxSize = options.maxSize;
    this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
    this.onEviction = options.onEviction;
    this.cache = new Map();
    this.oldCache = new Map();
    this._size = 0;
  }

  // TODO: Use private class methods when targeting Node.js 16.
  private _emitEvictions(cache: Map<KeyType, IValue<ValueType>>) {
    if (typeof this.onEviction !== "function") {
      return;
    }

    for (const [key, item] of cache) {
      this.onEviction(key, item.value);
    }
  }

  private _deleteIfExpired(key: KeyType, item: IValue<ValueType> | undefined) {
    if (typeof item?.expiry === "number" && item.expiry <= Date.now()) {
      if (typeof this.onEviction === "function") {
        this.onEviction(key, item.value);
      }

      return this.delete(key);
    }

    return false;
  }

  _getOrDeleteIfExpired(key: KeyType, item: IValue<ValueType> | undefined) {
    const deleted = this._deleteIfExpired(key, item);
    if (deleted === false) {
      return item?.value;
    }
  }

  _getItemValue(key: KeyType, item?: IValue<ValueType>): ValueType | undefined {
    return item?.expiry ? this._getOrDeleteIfExpired(key, item) : item?.value;
  }

  _peek(key: KeyType, cache: Map<KeyType, IValue<ValueType>>) {
    const item = cache.get(key);

    return this._getItemValue(key, item);
  }

  _set(key: KeyType, value?: IValue<ValueType>) {
    this.cache.set(key, value!);
    this._size++;

    if (this._size >= this.maxSize) {
      this._size = 0;
      this._emitEvictions(this.oldCache);
      this.oldCache = this.cache;
      this.cache = new Map();
    }
  }

  _moveToRecent(key: KeyType, item?: IValue<ValueType>) {
    this.oldCache.delete(key);
    this._set(key, item);
  }

  *_entriesAscending() {
    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield item;
        }
      }
    }

    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield item;
      }
    }
  }

  public get(key: KeyType) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);

      return this._getItemValue(key, item);
    }

    if (this.oldCache.has(key)) {
      const item = this.oldCache.get(key);
      if (this._deleteIfExpired(key, item) === false) {
        this._moveToRecent(key, item);
        return item?.value;
      }
    }
  }

  public set(
    key: KeyType,
    value: ValueType,
    {
      maxAge = this.maxAge === Number.POSITIVE_INFINITY ? undefined : Date.now() + this.maxAge,
    }: {
      maxAge?: number;
    }
  ) {
    if (this.cache.has(key)) {
      this.cache.set(key, {
        value,
        maxAge,
      });
    } else {
      this._set(key, { value, expiry: maxAge });
    }
  }

  public has(key: KeyType) {
    if (this.cache.has(key)) {
      return !this._deleteIfExpired(key, this.cache.get(key));
    }

    if (this.oldCache.has(key)) {
      return !this._deleteIfExpired(key, this.oldCache.get(key));
    }

    return false;
  }

  public peek(key: KeyType) {
    if (this.cache.has(key)) {
      return this._peek(key, this.cache);
    }

    if (this.oldCache.has(key)) {
      return this._peek(key, this.oldCache);
    }
  }

  public delete(key: KeyType) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this._size--;
    }

    return this.oldCache.delete(key) || deleted;
  }

  public clear() {
    this.cache.clear();
    this.oldCache.clear();
    this._size = 0;
  }

  public resize(newSize: number) {
    if (!(newSize && newSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }

    const items = [...this._entriesAscending()];
    const removeCount = items.length - newSize;
    if (removeCount < 0) {
      this.cache = new Map(items);
      this.oldCache = new Map();
      this._size = items.length;
    } else {
      if (removeCount > 0) {
        this._emitEvictions(new Map(items.slice(0, removeCount)));
      }

      this.oldCache = new Map(items.slice(removeCount));
      this.cache = new Map();
      this._size = 0;
    }

    this.maxSize = newSize;
  }

  *keys() {
    for (const [key] of this) {
      yield key;
    }
  }

  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }

  // @ts-ignore
  *[Symbol.iterator](): IterableIterator<[KeyType, ValueType]> {
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }

    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }

  *entriesDescending() {
    let items = [...this.cache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }

    items = [...this.oldCache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }

  *entriesAscending() {
    for (const [key, value] of this._entriesAscending()) {
      yield [key, value.value];
    }
  }

  get size() {
    if (!this._size) {
      return this.oldCache.size;
    }

    let oldCacheSize = 0;
    for (const key of this.oldCache.keys()) {
      if (!this.cache.has(key)) {
        oldCacheSize++;
      }
    }

    return Math.min(this._size + oldCacheSize, this.maxSize);
  }
}

export interface ICacheStore<TValue> {
  get(key: string): TValue | Promise<TValue | undefined> | undefined;
  set(key: string, value: TValue, ttl?: number): any;
  delete(key: string): boolean | Promise<boolean>;
  clear(): void | Promise<void>;
}

export class SimpleLRU<T = unknown> extends QuickLRU<string, T> implements ICacheStore<T> {
  constructor() {
    super({ maxSize: 1000 });
  }

  public clear() {
    super.clear();
  }

  public delete(key: string) {
    return super.delete(key);
  }

  public get(key: string) {
    return super.get(key);
  }

  public set(key: string, value: T): any {
    super.set(key, value, {});
  }
}
