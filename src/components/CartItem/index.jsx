import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

const CartItem = ({
  count,
  plusAction,
  minusAction,
  image,
  children,
  deleteAction,
}) => {
  return (
    <div className="grid grid-cols-3 border-b pb-14 py-5 tracking-tight">
      <img src={image} width={160} className="object-cover" />
      <div className="mx-auto grid grid-rows-2 w-full justify-center">
        <div>{children}</div>
        <div className="mt-auto">
          <button onClick={plusAction} className="btn btn-primary">
            +
          </button>
          <span className="btn">{count}</span>
          <button onClick={minusAction} className="btn btn-primary">
            -
          </button>
        </div>
      </div>
      <div className="ml-auto">
        <button onClick={deleteAction} className="btn btn-red center">
          Delete
          <TrashIcon className="ml-1 w-5 inline-block" />
        </button>
      </div>
    </div>
  );
};

const Title = ({ children }) => (
  <h1 className="font-bold text-xl text-gray-900">{children}</h1>
);
const Price = ({ children }) => (
  <h2 className="font-semibold text-lg text-gray-500">{children}</h2>
);

CartItem.Title = Title;
CartItem.Price = Price;

export default CartItem;
