import { SiReact, SiTypescript, SiApollographql } from "react-icons/si";
import { AiFillStar, AiFillTags } from "react-icons/ai";

interface IFeatureProps {
  title: string;
  icon: React.ReactNode;
}

const iconClassName = "h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-4";

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

const OSS = () => (
  <>
    <SiReact className={iconClassName} />
    <SiApollographql className={iconClassName} />
    <SiTypescript className={iconClassName} />
  </>
);

export const Features = () => {
  return (
    <div className="mx-auto max-w-4xl mb-32">
      <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
        <FeatureBlock
          title="Favorite"
          icon={<AiFillStar className={iconClassName} />}
        >
          Save your favorite posts
        </FeatureBlock>
        <FeatureBlock
          title="Organize"
          icon={<AiFillTags className={iconClassName} />}
        >
          Add and organize your favorite RSS feeds.
        </FeatureBlock>
        <FeatureBlock title="Built with OSS" icon={<OSS />}>
          Built with React, TypeScript and Apollo Client.
        </FeatureBlock>
      </dl>
    </div>
  );
};
