import { FiGlobe, FiActivity, FiMail } from "react-icons/fi";

const features = [
  {
    name: "Competitive rates",
    description:
      "Consequuntur omnis dicta cumque, inventore atque ab dolores aspernatur tempora ab doloremque.",
    icon: FiGlobe,
  },

  {
    name: "Instant transfers",
    description:
      "Omnis, illo delectus? Libero, possimus nulla nemo tenetur adipisci repellat dolore eligendi velit doloribus mollitia.",
    icon: FiActivity,
  },
  {
    name: "Reminder emails",
    description:
      "Veniam necessitatibus reiciendis fugit explicabo dolorem nihil et omnis assumenda odit? Quisquam unde accusantium.",
    icon: FiMail,
  },
];

export const FeatureList = () => (
  <section>
    <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
      <div className="col-span-1">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Take doom out of your evening scroll.
        </h2>
      </div>
      <dl className="col-span-2 mt-10 grid grid-cols-2  gap-x-8 gap-y-10 sm:mt-0">
        {features.map((feature) => (
          <div key={feature.name}>
            <dt>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sky-400 text-zinc-900">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-5 text-lg font-medium leading-6 text-zinc-800 dark:text-zinc-200">
                {feature.name}
              </p>
            </dt>
            <dd className="mt-2 text-base text-zinc-500">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
