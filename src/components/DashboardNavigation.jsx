import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../app/api/auth";
import { logout } from "../app/features/Auth/actions";
import config from "../config";
import { useAuth } from "../hooks";

const DashboardNavigation = ({ toggleOpen, isOpen }) => {
  const baseClassName = "px-5 py-3 rounded-md font-semibold";
  const { token } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logoutUser()
      .then(({ data }) => {
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav
      className={`absolute top-0 z-50 flex h-screen ${
        isOpen ? "translate-x-0" : "-translate-x-96"
      } w-full flex-col gap-y-3 overflow-hidden border-r bg-white pt-5 pl-1 pr-10 transition-all duration-100 ease-in-out md:sticky md:w-5/12 md:translate-x-0 lg:w-3/12`}
    >
      <div className={`flex justify-end ${isOpen ? "" : "hidden"}`}>
        <XMarkIcon className="h-8" onClick={() => toggleOpen(!isOpen)} />
      </div>
      <NavLink
        onClick={() => toggleOpen(false)}
        to="/dashboard/profile"
        className={({ isActive }) =>
          `${
            isActive ? "bg-indigo-100 text-indigo-600" : "text-gray-600"
          } ${baseClassName}`
        }
      >
        Profile
      </NavLink>
      <NavLink
        onClick={() => toggleOpen(false)}
        to="/dashboard/order-history"
        className={({ isActive }) =>
          `${
            isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600"
          } ${baseClassName}`
        }
      >
        History
      </NavLink>
      <NavLink
        onClick={() => toggleOpen(false)}
        to="/dashboard/delivery-address"
        className={({ isActive }) =>
          `${
            isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600"
          } ${baseClassName}`
        }
      >
        Delivery Address
      </NavLink>
      <div className="mt-auto mb-5">
        <button
          onClick={logoutHandler}
          className="bg-red-600 px-5 py-2 font-medium text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavigation;
