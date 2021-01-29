import Image from "next/image";
import Link from "next/link";

interface IIconHeaderProps {
  title?: string;
}

export const IconHeader: React.FC<IIconHeaderProps> = ({ title }) => {
  return (
    <header
      id="header"
      className="mx-auto max-w-screen-xl px-4 py-32 text-center"
    >
      <object className="block mb-8">
        <Link href="/">
          <a className="mx-auto w-32 h-32 block">
            <Image
              id="icon"
              width={128}
              height={128}
              className="mx-auto w-32 h-32 block object-contain"
              src="/app-icon-play-store.png"
              alt="App icon for Reubin application"
            />
          </a>
        </Link>
      </object>

      <h1 className="text-2xl tracking-tight leading-10 text-gray-800 dark:text-gray-100 sm:text-5xl sm:leading-none md:text-4xl">
        {title ?? "Reubin"}
      </h1>
    </header>
  );
};
