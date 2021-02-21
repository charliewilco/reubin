import got, { Got } from "got";
import { URLSearchParams } from "url";
import {
  ApolloError,
  ForbiddenError,
  AuthenticationError,
} from "apollo-server-micro";
import { SimpleLRU, ICacheStore } from "./lru";

export abstract class CachedAPI {
  public baseURL: string;
  public instance: Got;
  public cache: ICacheStore<unknown>;

  constructor(url: string) {
    this.baseURL = url;
    this.cache = new SimpleLRU();
    this.instance = got.extend({
      prefixUrl: this.baseURL,
      cache: this.cache,
    });
  }

  protected async get<T>(
    path: string,
    params?: NodeJS.Dict<string | readonly string[]>
  ) {
    const searchParams = new URLSearchParams(params);
    const response = await this.instance.get<T>(path, {
      prefixUrl: this.baseURL,
      searchParams,
      responseType: "json",
    });
    return response.body;
  }

  private _didEncounterError(error: any) {
    const status = error.statusCode ? error.statusCode : null;
    const message = error.bodyText ? error.bodyText : null;

    let apolloError: ApolloError;

    switch (status) {
      case 401:
        apolloError = new AuthenticationError(message);
        break;
      case 403:
        apolloError = new ForbiddenError(message);
        break;
      case 502:
        apolloError = new ApolloError("Bad Gateway", status);
        break;
      default:
        apolloError = new ApolloError(message, status);
    }

    throw apolloError;
  }
}
