import { normalizeSubscriptions, createUrlsofUnreads } from "../normalize";
import { subscriptions } from "../../mock/subscriptions.json";
import { taggings } from "../../mock/taggings.json";
import { unread } from "../../mock/unread_ids.json";

describe("Normalize", () => {
  it("creates an array of tags", () => {
    const { tags } = normalizeSubscriptions(subscriptions, taggings);

    expect(tags.length).toBeGreaterThan(1);
  });

  it("builds array of strings", () => {
    const urls = createUrlsofUnreads(unread);

    expect(urls.length).toBeGreaterThan(1);
  });
});
