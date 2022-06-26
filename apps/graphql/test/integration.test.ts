import { createMercuriusTestClient } from "mercurius-integration-testing";
import { app } from "../src/server";

let client: ReturnType<typeof createMercuriusTestClient>;

describe("Integration", () => {
  beforeAll(() => {
    client = createMercuriusTestClient(app);
  });
  it("can add feed", async () => {
    const response = await client.mutate(`
        mutation CreateFeed {
            addFeed(url:"https://arwhd.co/feed.xml") {
              id
              title
            }
          }          
        `);

    expect(response.data.addFeed.title).toEqual("ARWHD");
  });

  afterAll(async () => {
    await app.close();
  });
});
