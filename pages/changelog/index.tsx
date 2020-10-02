import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { IChangelogsQuery } from "../../util/github-sdk";
import { sdk } from "../../util/sdk";

export const getStaticProps: GetStaticProps<{
  results: IChangelogsQuery;
}> = async (context) => {
  const results = await sdk.Changelogs();

  return {
    props: {
      results,
    },
  } as const;
};

interface IChangelogPost {
  title: string;
  content: string;
}

const ChangelogPost: React.FC<IChangelogPost> = (props) => {
  return (
    <div>
      <p className="text-sm leading-5 text-gray-500">
        <time dateTime="2020-03-16">Mar 16, 2020</time>
      </p>
      <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-100">
        {props.title}
      </h3>
      <div
        className="mt-3 text-base leading-6 text-white"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  );
};

const Changelog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return (
    <div className="bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto lg:max-w-7xl">
        <div>
          <header
            id="header"
            className="mx-auto max-w-screen-xl px-4 py-16 text-center mb-16"
          >
            <img
              id="icon"
              className="mx-auto w-24 h-24 mb-8"
              src="/app-icon.png"
              alt="Round Yellow Circle"
            />
            <h1 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-100 sm:text-2xl sm:leading-none md:text-4xl">
              Reubin
            </h1>
          </header>
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-100 sm:text-4xl sm:leading-10">
            Changelog
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl leading-7 text-gray-400">
              Get weekly articles in your inbox on how to grow your business.
            </p>
            <form className="mt-6 flex lg:mt-0 lg:justify-end">
              <input
                aria-label="Email address"
                type="email"
                required
                className="appearance-none w-full px-4 py-2 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out lg:max-w-xs"
                placeholder="Enter your email"
              />
              <span className="ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Notify me
                </button>
              </span>
            </form>
          </div>
        </div>
        <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {props.results.repository?.releases.nodes?.map((n) => {
            return (
              <ChangelogPost title={n?.name!} content={n?.descriptionHTML!} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Changelog;
