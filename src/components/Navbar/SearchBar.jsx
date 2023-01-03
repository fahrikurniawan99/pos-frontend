import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchProduct, fetchTag } from "../../app/features/Product/actions";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    const value = event.target.value;
    if (!value.length) {
      dispatch(fetchProduct());
      dispatch(fetchTag());
    }
    const query = `q=${value}`;
    dispatch(fetchProduct(query));
  };
  return (
    <>
      <form>
        <input
          onChange={handleOnChange}
          type="text"
          className="form-input w-full rounded border-gray-300 bg-gray-50 pl-9 placeholder:text-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Kamu cari apa?"
        />
        <MagnifyingGlassIcon className="absolute top-1/2 left-2 h-5 -translate-y-1/2 text-gray-400 " />
      </form>
    </>
  );
};

export default SearchBar;
