import React, { useState } from "react";
import Select from "react-select";

const ProductFilter = ({
  categories,
  tags,
  categoriesSelected,
  currentTag,
}) => {
  const [tagSelected, setTagSelected] = useState([]);

  const options = categories && [
    ...categories.map((category) => {
      return { value: category.name, label: category.name };
    }),
    { value: "all", label: "All category" },
  ];

  const selectHandler = ({ value }) => {
    categoriesSelected(value);
  };

  const selectTagHandler = (event) => {
    const { value } = event.target;
    const alreadyExist = tagSelected.includes(value);
    if (alreadyExist) {
      const filter = tagSelected.filter((tag) => tag !== value);
      currentTag(filter);
      setTagSelected(filter);
    } else {
      currentTag([...tagSelected, value]);
      setTagSelected([...tagSelected, value]);
    }
  };

  return (
    <div className="container mx-auto w-11/12 text-gray-900 lg:flex">
      <div className="relative">
        <Select
          className="font-medium text-gray-900"
          options={options}
          defaultValue={categories}
          onChange={selectHandler}
          placeholder="Pilih categori..."
        />
      </div>
      <div className="mt-6 flex w-full flex-wrap items-center gap-x-3 gap-y-4 md:mt-5 lg:ml-auto lg:mt-0 lg:w-fit lg:gap-y-0 ">
        {tags.map((tag) => {
          return (
            <input
              key={tag._id}
              type="button"
              className={`${
                tagSelected.includes(tag.name)
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:text-gray-400"
              } hover: h-full cursor-pointer rounded-lg border border-gray-200 px-5 font-medium `}
              onClick={selectTagHandler}
              value={tag.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
