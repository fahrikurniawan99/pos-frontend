import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addQty,
  checkout,
  deleteCartItem,
  removeQty,
} from "../../app/features/cart/actions";
import Loading from "../../components/Loading";
import { useCart } from "../../hooks";

const Cart = () => {
  const Cart = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutHandler = async () => {
    await dispatch(checkout());
    navigate("/payment");
  };

  return (
    <>
      {Cart.item.length ? (
        <div className="container relative mx-auto px-[10px] lg:px-0">
          <div className="sticky top-0 flex items-center justify-between border-b bg-white pt-5 pb-8">
            <h1 className="text-center text-lg font-bold tracking-wide text-gray-900 lg:text-2xl">
              Shopping cart
            </h1>
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-2 font-semibold text-gray-500 hover:text-gray-400 lg:px-8 lg:py-3"
              >
                <ShoppingCartIcon className="mr-1 h-5 w-5" />
                Shop
              </Link>
              <button
                onClick={checkoutHandler}
                className={`inline-flex items-center rounded-lg ${
                  Cart.loading ? "bg-indigo-300 " : "bg-indigo-600"
                } px-3 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 lg:px-10 lg:py-3`}
              >
                {Cart.loading ? (
                  <Loading />
                ) : (
                  <>
                    Checkout
                    <BanknotesIcon className="ml-1 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
          {Cart.item.map((cart, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center border-b py-5 text-center font-semibold md:grid-cols-5"
            >
              <img
                src={cart.image_url}
                alt="product"
                className="mx-auto w-[90px] md:w-[120px]"
              />
              <h2 className="order-1 mt-2 w-full truncate text-lg md:order-none lg:mt-0">
                {cart.name}
              </h2>
              <p>{cart.price}</p>
              <div className="space-x-1 lg:space-x-4">
                <button
                  onClick={() => dispatch(addQty(cart.product))}
                  className="h-8 w-8 rounded bg-indigo-600 text-white lg:h-10 lg:w-10"
                >
                  +
                </button>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded font-normal outline-none  focus:border-indigo-300 lg:h-10 lg:w-10">
                  {cart.qty}
                </span>
                <button
                  onClick={() => dispatch(removeQty(cart.product))}
                  className="h-8 w-8 rounded bg-indigo-600 text-white lg:h-10 lg:w-10"
                >
                  -
                </button>
              </div>
              <button
                onClick={() => dispatch(deleteCartItem(cart.product))}
                className="order-1 mt-auto text-red-500 hover:text-red-400 md:order-none md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center text-indigo-300">
            <ShoppingCartIcon className="mx-auto h-20 w-20" />
            <p>Cart not found</p>
            <Link
              to="/"
              className="mt-5 flex items-center rounded bg-indigo-600 px-10 py-2 text-white transition-all duration-300 hover:scale-105"
            >
              Home
              <HomeIcon className="ml-1 w-5" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
