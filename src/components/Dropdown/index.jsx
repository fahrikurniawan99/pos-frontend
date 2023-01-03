import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

const Dropdown = ({ children }) => {
  const Auth = useAuth();
  return (
    <Menu>
      <Menu.Button className="flex cursor-pointer items-center gap-x-1 whitespace-nowrap text-xs font-semibold text-gray-900 lg:text-base">
        {Auth.full_name}
        <ChevronDownIcon className="h-4 w-4 stroke-gray-900 stroke-1" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-full right-0 w-56 rounded-lg border bg-white p-1 z-50">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const DropdownItem = ({ to, children }) => (
  <Menu.Item>
    {({ active }) => (
      <Link
        to={to}
        className={`${
          active ? "bg-indigo-700 text-white" : "text-gray-900"
        } group flex w-full items-center rounded-md p-3 text-sm`}
      >
        {children}
      </Link>
    )}
  </Menu.Item>
);

Dropdown.Item = DropdownItem;

export default Dropdown;
