import Image from "next/legacy/image";
import Newspaper from "./roman-kraft-unsplash.jpg";

export function CTA() {
  return (
    <section>
      <div className="relative grid min-h-min grid-cols-2 overflow-hidden rounded-lg bg-sky-700 text-zinc-100 dark:bg-sky-400 dark:text-zinc-900 lg:grid-cols-4">
        <div className="col-span-2">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block">Start your free trial today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-sky-200 dark:text-sky-900">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada
              adipiscing sagittis vel nulla nec.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-sky-600 shadow hover:bg-indigo-50">
              Sign up for free
            </a>
          </div>
        </div>

        <div className="col-span-2">
          <Image
            src={Newspaper}
            alt="App screenshot"
            className="opacity-75"
            layout="responsive"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
