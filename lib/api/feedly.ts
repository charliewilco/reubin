import { CachedAPI } from "./cached-service";

export class Feedly extends CachedAPI {
  constructor() {
    super("https://cloud.feedly.com/v3/");
  }
}
