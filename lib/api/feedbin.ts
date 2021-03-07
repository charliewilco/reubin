import { getContent } from "../html";
import { IItem } from "../types";
import { FEEDBIN_API } from "../urls";
import { CachedAPI } from "./cached-service";

interface IHandlerOptions {
  authorization: string;
}

export class FeedbinAPI extends CachedAPI {
  constructor() {
    super(FEEDBIN_API);
  }

  async getEntries(options: IHandlerOptions, page?: number | null) {
    this.instance.mergeOptions({
      headers: {
        Authorization: options.authorization,
      },
    });

    const params = page ? { page: page.toString() } : {};

    const entries = await this.get<IItem[]>("entries.json", params);

    return entries;
  }

  async getEntry(options: IHandlerOptions, id: number) {
    this.instance.mergeOptions({
      headers: { Authorization: options.authorization },
    });

    const entry = await this.get<IItem>(`/entries/${id}.json`);

    return {
      ...entry,
      content: getContent(entry.content),
    };
  }
}
