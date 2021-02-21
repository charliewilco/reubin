import { FEEDBIN_API } from "../urls";
import { CachedAPI } from "./cached-service";

export class FeedbinAPI extends CachedAPI {
  constructor() {
    super(FEEDBIN_API);
  }
}
