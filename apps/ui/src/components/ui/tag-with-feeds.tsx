import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface TagWithFeedsProps {
  title: string;
  children?: React.ReactNode;
}

export function TagWithFeeds(props: TagWithFeedsProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between p-2">
            <span className="text-xs font-bold uppercase tracking-wide">{props.title}</span>
            <ChevronDown className={open ? "rotate-180 transform" : ""} />
          </Disclosure.Button>
          <Disclosure.Panel>{props.children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
