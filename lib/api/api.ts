import { FeedbinAPI } from "./feedbin";
import { InstapaperAPI } from "./instapaper";
import { RSS } from "./rss";

interface IServices {
  rss: RSS;
  instapaper: InstapaperAPI;
  feedbin: FeedbinAPI;
}

export class API {
  public services: IServices;
  constructor() {
    this.services = {
      rss: new RSS(),
      feedbin: new FeedbinAPI(),
      instapaper: new InstapaperAPI(),
    };
  }
}
