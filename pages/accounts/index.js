import React from "react";
import { SideBar } from "../../compo/SideBar";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Jobs", href: "#", current: false },
  { name: "Applicants", href: "#", current: false },
  { name: "Company", href: "#", current: false },
];
const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: true },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
  { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Account() {
  return (
    <div>
      <SideBar />
      <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <aside className="py-6 lg:col-span-3">
          <nav className="space-y-1">
            {subNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                    : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                  "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-teal-500 group-hover:text-teal-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
