import { SiMedium, SiReddit, SiSubstack, SiTwitter, SiWordpress } from "react-icons/si";

export const Services = () => {
  return (
    <section>
      <div className="text-center">
        <figure>
          <div className="flex justify-center gap-8 text-sky-700 dark:text-sky-200">
            <SiReddit size={72} />
            <SiSubstack size={72} />
            <SiTwitter size={72} />
            <SiMedium size={72} />
            <SiWordpress size={72} />
          </div>
          <figcaption className="mx-auto max-w-md pt-16">
            <p className="bg-gradient-to-tr from-sky-200 to-sky-600 bg-clip-text text-6xl font-bold tracking-tighter text-transparent">
              Track feeds from all your favorite services
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
