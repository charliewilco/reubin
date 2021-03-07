import { FeedbinAPI } from "./feedbin";
import { InstapaperAPI } from "./instapaper";
import { RSS } from "./rss";

interface IServices {
  rss: RSS;
  instapaper: InstapaperAPI;
  feedbin: FeedbinAPI;
}

export class API implements IServices {
  public rss = new RSS();
  public feedbin = new FeedbinAPI();
  public instapaper = new InstapaperAPI();
}
