import Head from "next/head";
import { MarketingLayout } from "../components/layout";
import { PrivacyContent } from "../components/privacy-content";

const Privacy = () => {
  return (
    <MarketingLayout title="Privacy Policy">
      <Head>
        <title>Privacy Policy | Reubin</title>
      </Head>
      <div className=" py-8">
        <div className="text-lg max-w-prose mx-auto mb-6">
          <p className="text-base text-center leading-6 dark:text-yellow-700 text-yellow-600 font-semibold tracking-wide uppercase">
            Legal
          </p>
          <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight dark:text-gray-300 text-gray-600 sm:text-4xl sm:leading-10">
            Privacy Policy of Reubin
          </h1>
        </div>
        <div className="prose prose-lg mx-auto">
          <PrivacyContent />
        </div>
      </div>
    </MarketingLayout>
  );
};

export default Privacy;
