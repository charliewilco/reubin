import { normalizeSubscriptions } from "../normalize";
import { subscriptions } from "../../mock/subscriptions.json";
import { taggings } from "../../mock/taggings.json";

describe("Normalize", () => {
  it("creates an array of tags", () => {
    const { tags } = normalizeSubscriptions(subscriptions, taggings);

    expect(tags.length).toBeGreaterThan(1);
  });
});
