import { HomeIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center text-indigo-300">
        <RocketLaunchIcon className="mx-auto h-20 w-20" />
        <p>Page not found</p>
        <Link to="/" className="mt-5 flex items-center rounded bg-indigo-600 px-10 py-2 text-white transition-all duration-300 hover:scale-105">
          Home
          <HomeIcon className="ml-1 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Page404;
