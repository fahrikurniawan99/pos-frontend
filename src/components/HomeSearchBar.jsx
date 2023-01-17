import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

const HomeSearchBar = ({ keyword }) => {
  return (
    <>
      <form>
        <input
          onChange={(e) => keyword(e.target.value)}
          type="text"
          className="form-input w-full rounded border-gray-300 bg-gray-50 pl-9 placeholder:text-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="cari disini..."
        />
        <MagnifyingGlassIcon className="absolute top-1/2 left-2 h-5 -translate-y-1/2 text-gray-400 " />
      </form>
    </>
  );
};

export default HomeSearchBar;
