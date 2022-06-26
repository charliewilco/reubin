import { createMercuriusTestClient } from "mercurius-integration-testing";
import { createApp } from "../src/app";

let client: ReturnType<typeof createMercuriusTestClient>;
let app: ReturnType<typeof createApp>;

describe("Integration", () => {
  beforeAll(() => {
    app = createApp();
    client = createMercuriusTestClient(app);
  });
  it("can add feed", async () => {
    const response = await client.mutate(`
    mutation CreateFeed {
        addFeed(url:"https://arwhd.co/feed.xml") {
            id
            title
        }
    }`);

    console.log(response.data);

    expect(response.data.addFeed.title).toEqual("ARWHD");
  });

  afterAll(async () => {
    await app.close();
  });
});
