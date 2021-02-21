import { CachedAPI } from "./cached-service";

export class InstapaperAPI extends CachedAPI {
  constructor() {
    super("https://www.instapaper.com/api/");
  }
}
