import { IFeed, IItem } from "../types";

export interface IFeedService {
  favorites: Set<string>;
  unread: Set<string>;
  getTags?(): Promise<string[]>;
  getAllFeeds(): Promise<IFeed[]>;
  getFeedItems(url: string): Promise<IItem[]>;
  getFeedDetails(url: string): Promise<IFeed>;
}

export interface IHandlerOptions {
  authorization: string;
}
