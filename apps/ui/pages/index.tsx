import { MarketingLayout } from "../components/layout";

const IndexPage = () => (
  <MarketingLayout addressbar="Reubin | Android Feedbin Client">
    <div className="px-2 py-16 mx-auto max-w-7xl">
      <h2 className="inline-block font-bold tracking-tighter text-transparent font-display bg-gradient-to-tr from-sky-200 to-sky-600 bg-clip-text text-8xl">
        Reubin
      </h2>
      <p className="text-2xl opacity-50">RSS for the next generation. Coming Soon.</p>
    </div>
  </MarketingLayout>
);

export default IndexPage;
