import { AiFillApple, AiFillAndroid } from "react-icons/ai";

export const DownloadBlock = () => {
  return (
    <div className="mx-auto max-w-4xl px-2 mb-16">
      <div className="bg-gradient-to-tr from-yellow-800 via-yellow-600 to-yellow-400 overflow-hidden shadow-xl py-8 px-4">
        <div className="mx-auto max-w-2xl py-8 text-gray-300 text-center">
          <h2 className="text-xl font-black text-gray-800 tracking-tight sm:text-3xl">
            Get Reubin
          </h2>
          <p className="my-6 mx-auto max-w-2xl text-lg text-yellow-100">
            Free of ads and in-app purchases, this is the only Feedbin reader on
            Android.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center w-full rounded-md border border-transparent px-5 py-3 text-base font-medium shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 bg-gray-900">
              <AiFillApple size={18} />
              <span className="ml-2"> Coming Soon</span>
            </button>
            <button className="flex items-center justify-center w-full rounded-md border border-transparent px-5 py-3 text-base font-medium shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 bg-gray-900">
              <AiFillAndroid size={18} />
              <span className="ml-2"> Download from Play Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
