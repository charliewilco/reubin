import { ChangelogPost } from "./changelog-post";
import { IChangelogsQuery } from "../util/github-sdk";

interface IReleaseNotesProps {
  results: IChangelogsQuery;
}

export const ReleaseNotes: React.FC<IReleaseNotesProps> = (props) => {
  return (
    <div className="relative py-8">
      <p className="text-xl text-gray-500">Release notes</p>
      <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-12 mb-32">
        {props.results.repository?.releases.nodes?.map((n, i) => {
          return (
            <ChangelogPost
              key={i}
              publishDate={n?.publishedAt}
              title={n?.name!}
              content={n?.descriptionHTML!}
            />
          );
        })}
      </div>
    </div>
  );
};
