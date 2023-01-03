import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { fetchProduct, fetchTag } from "../../../app/features/Product/actions";
import { useProduct } from "../../../hooks";

const Filter = () => {
  const { tags, categories, category } = useProduct();
  const [tagsFilter, setTagsFilter] = useState("");
  const dispatch = useDispatch();

  const options = categories && [
    ...categories.map((category) => {
      return { value: category.name, label: category.name };
    }),
    { value: "all", label: "All category" },
  ];

  const handleSelectOption = ({ value }) => {
    if (value === "all") {
      dispatch(fetchTag());
      return dispatch(fetchProduct());
    }
    const query = `category=${value}`;
    dispatch(fetchProduct(query));
    dispatch(fetchTag(query));
  };

  useEffect(() => {
    if (!tagsFilter.length && typeof tagsFilter === "object") {
      dispatch(fetchProduct());
    }
    if (tagsFilter.length > 0) {
      let query = "";
      tagsFilter.map((value, index) => {
        if (index === 0) {
          return (query += `tags=${value}`);
        } else {
          return (query += `&tags=${value}`);
        }
      });
      dispatch(fetchProduct(query));
    }
  }, [tagsFilter, dispatch]);

  const productByTag = (event) => {
    const { value } = event.target;
    if (tagsFilter.includes(value)) {
      const filterAlreadyExist = tagsFilter.filter((tag) => tag !== value);
      setTagsFilter(filterAlreadyExist);
    } else {
      setTagsFilter([...tagsFilter, value]);
    }
  };

  return (
    <div className="container mx-auto w-11/12 text-gray-900 lg:flex ">
      <div className="relative">
        <Select
          className="font-medium text-gray-900"
          options={options}
          defaultValue={category}
          onChange={handleSelectOption}
          placeholder="Pilih categori..."
        />
      </div>
      <div className="mt-6 flex w-full flex-wrap items-center gap-x-3 gap-y-4 md:mt-5 lg:ml-auto lg:mt-0 lg:w-fit lg:gap-y-0 ">
        {tags.length ? (
          tags.map((tag) => {
            return (
              <input
                key={tag._id}
                type="button"
                className={`${
                  tagsFilter.includes(tag.name)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:text-gray-400"
                } hover: h-full cursor-pointer rounded-lg border border-gray-200 px-5 font-medium `}
                onClick={productByTag}
                value={tag.name}
              />
            );
          })
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type="button"
                className="h-full w-[80px] animate-pulse rounded-lg bg-gray-200 px-5"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
