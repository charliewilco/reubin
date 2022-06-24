import Parser from "rss-parser";
import got from "got";
import { Metadata, scraper } from "./metascraper";

export const ERROR_CHANNEL = "Could not find a link to the channel in RSS";
export const ERROR_NO_LINK = "Could not find any RSS link";
export const ERROR_GENERIC = "An error occured";

interface MetadataError {
  message: string;
}

export type FeedAPIResponse = Metadata | MetadataError;

export class FeedMetadata {
  private _parser: Parser;
  constructor(parser: Parser) {
    this._parser = parser;
  }

  /**
   * URL ---> call the body through fetch ---> Valid XML Document ? loose html
   * valid xml document --> look for the link or check if it doesn't end in xml then scrape and send that.
   *
   */
  public async resolve(_url?: string): Promise<Metadata> {
    if (!_url) {
      throw new Error("Must provider url");
    }
    const contents = await this._getSiteContents(_url);
    const output = await this._mergeParserError(contents);

    if (output === null) {
      return this._getMetadata(contents, _url);
    } else {
      if (output.link) {
        const _ = await this._getSiteContents(output.link);
        const data = await this._getMetadata(_, output.link, _url);

        return data;
      } else {
        throw new Error(ERROR_CHANNEL);
      }
    }
  }

  private async _getMetadata(html: string, url: string, fallbackURL?: string) {
    const data = await scraper({
      html,
      url,
    });

    if (fallbackURL) {
      data.feed = fallbackURL;
    }

    if (data.feed === null) {
      throw new Error(ERROR_NO_LINK);
    }

    return data;
  }

  private async _mergeParserError(contents: string): Promise<Parser.Output<any> | null> {
    return new Promise((resolve) => {
      this._parser
        .parseString(contents)
        .then((output) => resolve(output))
        .catch((err) => {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          resolve(null);
        });
    });
  }

  private async _getSiteContents(url: string) {
    try {
      const { body } = await got(url);

      return body;
    } catch (error: any) {
      throw new Error(
        `Server responded with ${error.response.statusCode} ${error.response.statusMessage}`
      );
    }
  }
}
