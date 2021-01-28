import Image from "next/image";

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
        <Image
          id="icon"
          width={96}
          height={96}
          className="mx-auto w-24 h-24 block object-contain"
          src="/app-icon-play-store.png"
          alt="Round Yellow Circle"
        />
      </object>

      <h1 className="text-2xl tracking-tight leading-10 text-gray-800 dark:text-gray-100 sm:text-5xl sm:leading-none md:text-4xl">
        {title ?? "Reubin"}
      </h1>
    </header>
  );
};
