import { getFixtureAsString } from "./utils/get-fixture";
import { RSSKit } from "../src";

const parser = new RSSKit();

describe("RSS", () => {
  it("can parse a string", async () => {
    const feed = await getFixtureAsString("guardian.rss");
    const output = await parser.parse(feed);

    expect(output.title).toBe("The Guardian");
    expect(output.items.length).toEqual(90);
  });

  it("can parse a podcast RSS feed", async () => {
    const feed = await getFixtureAsString("serial.rss");
    const output = await parser.parse(feed);
    expect(output.title).toBe("Serial");
    expect(output.items.length).toEqual(46);
  });
});
