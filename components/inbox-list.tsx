import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ILocalRssQuery, IItem } from "../util/reubin-sdk";

interface IInboxList {
  data: ILocalRssQuery;
}

export const renderInboxQueryItem = (
  v: Pick<IItem, "title" | "url" | "published">
) => {
  const d = new Date(v.published);
  const date = formatDistanceToNow(d, {
    addSuffix: true,
  });

  const formatedDate = format(d, "dd LLL yyyy");
  return (
    <li key={v.url} className="dark:text-white dark:bg-gray-800">
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4">
          <div>
            <p className="text-base font-medium ">{v.title}</p>
          </div>
          <time dateTime="2020-01-07" className="text-sm">
            {date} &bull; {formatedDate}
          </time>
        </div>
      </a>
    </li>
  );
};

export const renderInboxQuery = (
  product: Pick<IItem, "title" | "url" | "published">[]
) => (
  <ul className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
    {product.map(renderInboxQueryItem)}
  </ul>
);

export const InboxList: React.FC<IInboxList> = ({ data }) => {
  return (
    <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
      <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100 dark:bg-gray-900 dark:border-gray-600 overflow-y-scroll">
        {renderInboxQuery(data.product)}
      </div>
    </aside>
  );
};
