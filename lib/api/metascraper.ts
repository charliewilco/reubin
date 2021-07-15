import * as metascraper from "metascraper";
import description from "metascraper-description";
import image from "metascraper-image";
import url from "metascraper-url";
import title from "metascraper-title";
import favicon from "metascraper-logo-favicon";
import clearbit from "metascraper-clearbit";
import { rss } from "./rss-rule";

export const metaScraperRules = [
  description(),
  image(),
  url(),
  title(),
  favicon(),
  clearbit(),
  rss() as any as metascraper.Rule,
];

export interface Metadata {
  description?: string;
  image?: string;
  url?: string;
  title?: string;
  logo?: string;
  publisher?: string;
  feed?: string;
}

export const scraper = metascraper.default(metaScraperRules);
