import {
  BanknotesIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth, useCart } from "../../hooks";
import Dropdown from "../Dropdown";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const Auth = useAuth();
  const Cart = useCart();

  return (
    <div className="border-b">
      <div className="container mx-auto flex w-11/12 flex-wrap items-center justify-between py-5 lg:py-7">
        <div className="w-4/12">
          <h1 className="text-xl font-bold">POS</h1>
        </div>
        <div className="relative order-1 mt-5 w-full lg:order-none lg:mt-0 lg:w-4/12">
          <SearchBar />
        </div>
        <div className="relative flex w-4/12 items-center justify-end gap-x-3">
          {Auth.loading ? (
            <div className="h-[30px] w-[100px] rounded-lg bg-gray-200"></div>
          ) : Auth.authentication ? (
            <div className="flex items-center">
              <div className="relative">
                <ShoppingCartIcon className="mr-1 w-5" />
                <span className="absolute -top-3 -left-3 inline-flex h-5 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs text-white">
                  {Cart.item.length}
                </span>
              </div>
              <Dropdown>
                <Dropdown.Item to="/cart">
                  <ShoppingCartIcon className="mr-2 w-5" />
                  Shopping Cart
                </Dropdown.Item>
                <Dropdown.Item to="/dashboard/orders">
                  <BanknotesIcon className="mr-2 w-5" />
                  Orders
                </Dropdown.Item>
                <Dropdown.Item to="/dashboard/profile">
                  <UserIcon className="mr-2 w-5" />
                  Profile
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="py-2 px-5 text-gray-900"
              >
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

export default Navbar;
