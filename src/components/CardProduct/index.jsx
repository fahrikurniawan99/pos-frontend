import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

const ProductCard = ({
  image,
  title,
  category,
  tags,
  addToCartAction,
  price,
}) => {
  return (
    <div className="relative h-[500px] rounded-lg text-gray-900">
      <div className="absolute bottom-0 -z-50 h-3/4 w-full rounded-lg border"></div>
      <div className="flex h-full flex-col p-5">
        <div className="mb-5 flex h-[200px] items-center justify-center">
          <img
            src={image}
            alt="product"
            className="drop-shadow-2xl"
            width={200}
          />
        </div>
        <ProductCardTitle title={title} />
        <ProductCardCategory category={category} />
        <ProductCardTags tags={tags} />
        <ProductCardFooter addToCartAction={addToCartAction} price={price} />
      </div>
    </div>
  );
};

const ProductCardTitle = ({ title }) => (
  <h1 className="text-xl font-bold">{title}</h1>
);

const ProductCardCategory = ({ category }) => (
  <p className="text-gray-400">{category}</p>
);

const ProductCardTags = ({ tags }) => (
  <div className="mt-5 space-x-2 text-gray-400">
    {tags &&
      tags.map((tag) => (
        <span key={tag._id} className="rounded-full border bg-gray-50 px-3 py-1 text-sm">
          {tag.name}
        </span>
      ))}
  </div>
);

const ProductCardFooter = ({ price, addToCartAction }) => (
  <div className="mt-auto flex items-center justify-between text-lg font-bold text-gray-900">
    <span>{`Rp. ${price}`}</span>
    <button
      onClick={addToCartAction}
      className="rounded-lg bg-indigo-700 p-3 text-white transition-all duration-300 hover:bg-indigo-600 focus:ring focus:ring-indigo-200"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  </div>
);

export default ProductCard;
