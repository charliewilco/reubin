import { IconType } from "react-icons";
import {
  FiInbox,
  FiArchive,
  FiUser,
  FiFlag,
  FiSlash,
  FiEdit2,
} from "react-icons/fi";

interface INavItem {
  label: string;
  icon: IconType;
}

const NavItem: React.FC<INavItem> = (props) => {
  return (
    <a
      href="#"
      className="text-white dark:text-gray-400 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
    >
      <span className="sr-only">{props.label}</span>
      <props.icon className="h-6 w-6" />
    </a>
  );
};

export const InboxSidebar = () => {
  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:block md:flex-shrink-0 bg-gray-900 dark:bg-gray-600 md:overflow-y-auto"
    >
      <div className="relative w-20 flex flex-col p-3 space-y-3">
        <NavItem label="Open" icon={FiInbox} />
        <NavItem label="Archive" icon={FiArchive} />
        <NavItem label="Customers" icon={FiUser} />
        <NavItem label="Flagged" icon={FiFlag} />
        <NavItem label="Spam" icon={FiSlash} />
        <NavItem label="Drafts" icon={FiEdit2} />
      </div>
    </nav>
  );
};
