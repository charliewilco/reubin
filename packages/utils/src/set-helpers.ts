export class Setative<T> extends Set<T> {
	constructor(initial: Iterable<T> | null | undefined) {
		super(initial);
	}

	public remove(d: T): T | null {
		if (this.has(d)) {
			this.delete(d);
			return d;
		}

		return null;
	}

	public map<U>(callback: (value: T) => U) {
		return new Setative([...this.values()].map(callback));
	}

	public intersection(b: Set<T>) {
		return new Setative([...this.values()].filter((x) => b.has(x)));
	}

	public union(b: Set<T>) {
		return new Setative([...this, ...b]);
	}

	public difference(b: Set<T>) {
		return new Set([...this.values()].filter((x) => !b.has(x)));
	}
}
