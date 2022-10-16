import Head from "next/head";
import { SiteFooter } from "../components/site-footer";
import { FeatureList } from "../components/promo/features";
import { Services } from "../components/promo/services";
import { Hero } from "../components/promo/hero";
import { CTA } from "../components/promo/call-to-action";

const IndexPage = () => (
  <div>
    <Head>
      <title>Reubin | An RSS Client for the Next Generation</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>

    <main className="mx-auto mb-32 max-w-7xl space-y-32 px-2 pt-32">
      <Hero />
      <CTA />
      <FeatureList />
      <Services />
    </main>
    <SiteFooter />
  </div>
);

export default IndexPage;
