import { CachedAPI } from "./cached-service";
import { IFeedService } from "./types";

export class InstapaperAPI extends CachedAPI implements IFeedService {
  constructor() {
    super("https://www.instapaper.com/api/");
  }
}
