import { IFeed, IItem } from "../types";

export interface IFeedService {
  getFeedItems(url: string): Promise<IItem[]>;
  getFeedDetails(url: string): Promise<IFeed>;
}
