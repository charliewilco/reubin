import { AiFillNotification, AiOutlineRight } from "react-icons/ai";

export const Banner: React.FC<{ link?: string }> = (
  { link } = { link: "#" }
) => {
  return (
    <div className="px-2 bg-black " role="banner">
      <div className="max-w-2xl mx-auto py-3">
        <a
          href={link}
          className="flex items-center justify-between text-white rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
        >
          <div className="md:flex items-center ">
            <span className="px-3 py-1 text-white flex items-center md:bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
              <AiFillNotification className="mr-2" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 md:text-white">
                Announcement
              </span>
            </span>
            <span className="block ml-4">
              Big news! We're excited to announce a brand new product.
            </span>
          </div>
          <AiOutlineRight className="ml-2 w-5 h-5 text-gray-500" />
        </a>
      </div>
    </div>
  );
};
