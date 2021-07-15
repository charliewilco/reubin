declare module "@metascraper/helpers" {
  import { Check } from "metascraper";
  export const url: any;
  export const toRule: (...params: any[]) => (c: Check) => Check;
}

declare module "metascraper" {
  import { Metadata as FormerMeta } from "metascraper";

  export interface Metadata extends FormerMeta {
    feed: string;
  }
}
