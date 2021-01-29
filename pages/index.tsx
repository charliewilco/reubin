import { Features } from "../components/features";
import { MarketingLayout } from "../components/layout";

const IndexPage = () => (
  <MarketingLayout addressbar="Reubin | Android Feedbin Client">
    <div className="relative pt-6 pb-12 mb-16">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="text-center">
          <h2 className="text-xl tracking-tight leading-10 font-extrabold text-gray-800 dark:text-gray-100 sm:leading-none md:text-2xl">
            RSS for Android.
            <br className="xl:hidden" />
            <span className="text-yellow-400"> Coming Soon.</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Reubin is a Feedbin client for Android.
          </p>
        </div>
      </div>
    </div>
    <Features />
  </MarketingLayout>
);

export default IndexPage;
