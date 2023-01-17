import { Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DashboardNavigation from "../components/DashboardNavigation";

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="fixed top-4 right-10 z-50 flex items-center gap-x-3">
        <Link to="/">
          <HomeIcon className="h-8 text-indigo-600 hover:text-indigo-400" />
        </Link>
        <Bars3Icon
          onClick={() => setIsOpen(!isOpen)}
          className={`h-10 ${isOpen ? "hidden" : ""} md:hidden`}
        />
      </div>
      <div
        className={`relative mx-auto flex h-screen w-11/12 ${
          isOpen ? "overflow-hidden" : ""
        }`}
      >
        <DashboardNavigation
          isOpen={isOpen}
          toggleOpen={(value) => setIsOpen(value)}
        />
        <div className="w-full py-5 md:pl-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
