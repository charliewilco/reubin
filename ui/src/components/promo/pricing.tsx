import { FiCheck } from "react-icons/fi";

const tiers = [
  {
    name: "Free",
    href: "#",
    priceMonthly: 0,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc.",
      "Orci neque eget pellentesque.",
    ],
  },
  {
    name: "Premium",
    href: "#",
    priceMonthly: 24,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
    ],
  },
  {
    name: "Lifetime",
    href: "#",
    priceMonthly: 32,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
      "Donec mauris sit in eu tincidunt etiam.",
    ],
  },
];

export const Pricing = () => {
  return (
    <section>
      <div className="sm:align-center sm:flex sm:flex-col">
        <h1 className="text-5xl font-bold tracking-tight">Pricing Plans</h1>
        <p className="mt-5 text-xl text-zinc-500">
          Start building for free, then add a site plan to go live. Account plans unlock
          additional features.
        </p>
        <div className="relative mt-6 flex self-end rounded-lg bg-zinc-100 p-0.5 sm:mt-8">
          <button
            type="button"
            className="relative w-1/2 whitespace-nowrap rounded-md border-zinc-200 bg-white py-2 text-sm font-medium text-zinc-900 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:w-auto sm:px-8">
            Monthly
          </button>
          <button
            type="button"
            className="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-zinc-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:w-auto sm:px-8">
            Yearly
          </button>
        </div>
      </div>
      <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium leading-6">{tier.name}</h2>
              <p className="mt-4 text-sm text-zinc-500">{tier.description}</p>
              <p className="mt-8">
                <span className="font-monospace text-4xl font-bold tracking-tight">
                  ${tier.priceMonthly}
                </span>{" "}
                <span className="text-base font-medium text-zinc-500">/mo</span>
              </p>
              <a
                href={tier.href}
                className="mt-8 block w-full rounded-md border border-zinc-800 bg-sky-800 py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900">
                Buy {tier.name}
              </a>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h3 className="text-sm font-medium">What&apos;s included</h3>
              <ul role="list" className="mt-6 space-y-4">
                {tier.includedFeatures.map((feature) => (
                  <li key={feature} className="flex space-x-3">
                    <FiCheck
                      className="h-5 w-5 flex-shrink-0 text-sky-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-zinc-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
