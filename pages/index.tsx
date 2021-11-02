import { SiReact, SiTypescript, SiApollographql } from "react-icons/si";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { MarketingLayout } from "../components/layout";

interface IFeatureProps {
  title: string;
  icon: React.ReactNode;
}

const OSS = () => (
  <>
    <SiReact />
    <SiApollographql />
    <SiTypescript />
  </>
);

const FeatureBlock: React.FC<IFeatureProps> = (props) => {
  return (
    <div>
      <div className="flex items-center justify-start">{props.icon}</div>
      <div className="mt-5">
        <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
          {props.title}
        </dt>
        <dd className="mt-2 text-base text-gray-500">{props.children}</dd>
      </div>
    </div>
  );
};

const IndexPage = () => (
  <MarketingLayout addressbar="Reubin | Android Feedbin Client">
    <div className="relative pt-6 pb-12 mb-16">
      <div className="mx-auto max-w-xl px-4">
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
    <div className="mx-auto max-w-4xl mb-16">
      <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
        <FeatureBlock title="Favorite" icon={<AiFillStar />}>
          Save your favorite posts
        </FeatureBlock>
        <FeatureBlock title="Organize" icon={<AiFillTags />}>
          Add and organize your favorite RSS feeds.
        </FeatureBlock>
        <FeatureBlock title="Built with OSS" icon={<OSS />}>
          Built with React, TypeScript and Apollo Client.
        </FeatureBlock>
      </dl>
    </div>
  </MarketingLayout>
);

export default IndexPage;
