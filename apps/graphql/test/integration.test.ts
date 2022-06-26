import { createMercuriusTestClient } from "mercurius-integration-testing";
import { createApp } from "../src/app";
import { context } from "../src/context";

let client: ReturnType<typeof createMercuriusTestClient>;

describe("Integration", () => {
  beforeAll(async () => {
    client = createMercuriusTestClient(createApp());
    await context.prisma.$connect();
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
    await context.prisma.$disconnect();
  });
});
