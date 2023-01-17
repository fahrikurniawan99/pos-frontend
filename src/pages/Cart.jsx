import { ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveCart } from "../app/api/cart";
import {
  ADD_CART_ITEM,
  CLEAR_CART_ITEM,
  REMOVE_CART_ITEM,
} from "../app/features/Cart/constants";
import RupiahFormat from "../app/RupiahFormat";
import { useAuth, useCart } from "../hooks";

const CartPage = () => {
  const Cart = useCart();
  const Auth = useAuth();
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setIsLoading(true);
    saveCart(Cart, Auth.token)
      .then((res) => {
        dispatch({ type: CLEAR_CART_ITEM });
        navigate("/checkout");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    let sum = 0;
    Cart.map((item) => {
      sum += item.price * item.qty;
    });
    setSubTotal(sum);
  }, [Cart]);

  return (
    <div className="mx-auto flex h-screen flex-col md:w-10/12 lg:w-8/12">
      <h1 className="py-5 text-center text-2xl font-bold text-gray-800">
        Shopping Cart
      </h1>
      <div className="relative mb-5 flex flex-grow flex-col overflow-y-auto rounded-md border-t bg-white">
        <div className="sticky top-0 mt-4 flex items-center justify-between bg-white p-2 md:mt-0 md:p-5">
          <h2 className="font-bold text-gray-800  md:text-2xl">{`Sub Total ${
            RupiahFormat(subTotal).split(",")[0]
          }`}</h2>
          <div className="flex items-center justify-end md:justify-start">
            <Link
              to="/"
              className="flex items-center justify-center px-3 text-sm font-semibold text-gray-800 md:px-6 md:text-base"
            >
              Home
            </Link>
            <button
              onClick={checkoutHandler}
              disabled={!Cart.length || isLoading}
              className="flex items-center justify-center gap-x-2 rounded bg-indigo-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 md:px-5 md:text-base"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Checkout <ArrowUturnRightIcon className="h-4 md:h-5" />
                </>
              )}
            </button>
          </div>
        </div>
        {Cart.length ? (
          Cart.map((item) => {
            return (
              <div
                key={item.product}
                className="flex h-[150px] max-h-fit flex-wrap items-center border-b py-7"
              >
                <div className="basis-3/12">
                  <img
                    src={item.image_url}
                    className="mx-auto w-[60px] md:w-[100px]"
                  />
                </div>
                <div className="basis-3/12 truncate text-center text-lg font-bold text-gray-800">
                  {item.name}
                </div>
                <div className="basis-3/12 text-center">
                  {RupiahFormat(item.price).split(",")[0]}
                </div>
                <div className="flex basis-3/12 justify-center">
                  <button
                    onClick={() =>
                      dispatch({ type: ADD_CART_ITEM, payload: item })
                    }
                    className="h-8 w-8 border border-transparent bg-slate-900 text-white md:h-10 md:w-10"
                  >
                    +
                  </button>
                  <span className="inline-flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
                    {item.qty}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: REMOVE_CART_ITEM, payload: item })
                    }
                    className="h-8 w-8 border border-gray-300 bg-gray-100 text-gray-800 md:h-10 md:w-10"
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center text-lg text-gray-300">
            no product found in cart
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
