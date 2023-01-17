import {
  BanknotesIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductByKeyword } from "../app/features/Product/actions";
import { useAuth, useCart } from "../hooks";
import HomeDropdown from "./HomeDropdown";
import HomeSearchBar from "./HomeSearchBar";

const HomeNavigation = () => {
  const Auth = useAuth();
  const Cart = useCart();
  const dispatch = useDispatch();

  const searchProduct = (keyword) => {
    dispatch(getProductByKeyword(keyword));
  };

  return (
    <div className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex w-11/12 flex-wrap items-center justify-between py-5 lg:py-7">
        <div className="w-4/12">
          <h1 className="text-xl font-bold">POS</h1>
        </div>
        <div className="relative order-1 mt-5 w-full lg:order-none lg:mt-0 lg:w-4/12">
          <HomeSearchBar keyword={(value) => searchProduct(value)} />
        </div>
        <div className="relative flex w-4/12 items-center justify-end gap-x-3">
          {Auth.token ? (
            <div className="flex items-center">
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="mr-1 w-5" />
                <span className="absolute -top-3 -left-3 inline-flex h-5 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs text-white">
                  {Cart.length}
                </span>
              </Link>
              <HomeDropdown>
                <HomeDropdown.Item to="/cart">
                  <ShoppingCartIcon className="mr-2 w-5" />
                  Shopping Cart
                </HomeDropdown.Item>
                <HomeDropdown.Item to="/dashboard/order-history">
                  <BanknotesIcon className="mr-2 w-5" />
                  Orders
                </HomeDropdown.Item>
                <HomeDropdown.Item to="/dashboard/profile">
                  <UserIcon className="mr-2 w-5" />
                  Profile
                </HomeDropdown.Item>
              </HomeDropdown>
            </div>
          ) : (
            <>
              <Link to="/register" className="py-2 px-5 text-gray-900">
                Register
              </Link>
              <Link
                to="/login"
                className="rounded bg-indigo-600 py-2 px-8 text-white"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeNavigation;
