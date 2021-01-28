interface IChangelogPost {
  title: string;
  content: string;
  publishDate: string;
}

export const ChangelogPost: React.FC<IChangelogPost> = (props) => {
  const d = new Date(props.publishDate).toLocaleString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className=" bg-white dark:bg-gray-800 p-4 shadow-md">
      <p className="text-sm leading-5 text-gray-600 dark:text-gray-500 uppercase tracking-widest font-mono">
        <time dateTime={props.publishDate}>{d}</time>
      </p>
      <h3 className="mt-2 text-xl leading-7 font-semibold  dark:text-gray-100">
        {props.title}
      </h3>
      <div
        className="mt-3 text-base leading-6 prose"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  );
};
