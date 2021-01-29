import { AiFillNotification } from "react-icons/ai";

export const Banner = () => {
  return (
    <div className="bg-yellow-400">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <span className="flex p-2 rounded-lg bg-yellow-500">
              <AiFillNotification className="text-gray-900 h-6 w-6" />
            </span>
            <p className="ml-3 font-medium text-gray-900 truncate">
              Big news! We're excited to announce a brand new product.
            </p>
          </div>
          <div className="mt-2 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-100 bg-gray-900 hover:bg-gray-700"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
