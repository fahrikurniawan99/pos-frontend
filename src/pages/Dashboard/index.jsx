import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  Bars3BottomLeftIcon,
  IdentificationIcon,
  UserIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { USER_LOGOUT } from "../../app/features/auth/constanst";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const logout = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await axios({
        method: "post",
        baseURL: "https://eduworkbe.vercel.app/auth",
        url: "/logout",
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      dispatch({ type: USER_LOGOUT });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`container relative mx-auto h-screen justify-between overflow-x-hidden lg:flex ${
        isOpen ? "overflow-y-hidden" : "overflow-y-auto"
      }`}
    >
      <div
        className={` ${
          isOpen ? "translate-x-0" : "-translate-x-[500px] lg:translate-x-0"
        } absolute top-0 left-0 z-50 flex h-screen flex-col border-r bg-gray-50 pt-10 pr-28 transition-all duration-300 lg:sticky lg:w-3/12`}
      >
        <Link
          to="/"
          className="mb-10 ml-8 block text-2xl font-bold text-gray-900"
        >
          POS
        </Link>
        <Navigation onClick={() => setIsOpen(false)} to="/dashboard/profile">
          <UserIcon className="w-4 stroke-2" />
          Profile
        </Navigation>
        <Navigation onClick={() => setIsOpen(false)} to="/dashboard/orders">
          <ArrowPathIcon className="w-4 stroke-2" />
          Order History
        </Navigation>
        <Navigation onClick={() => setIsOpen(false)} to="/dashboard/address">
          <IdentificationIcon className="w-4 stroke-2" />
          Address
        </Navigation>
        <button
          disabled={isLoading}
          onClick={logout}
          className="mt-auto mr-auto mb-5 ml-8 flex w-28 items-center justify-center gap-x-1 rounded-lg bg-red-500 py-2 font-medium text-white hover:bg-red-400 disabled:bg-red-200"
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ArrowLeftOnRectangleIcon className="w-5" /> Logout
            </>
          )}
        </button>
      </div>
      <div className="sticky top-0 flex justify-end bg-white p-5 lg:hidden">
        {isOpen ? (
          <XMarkIcon onClick={() => setIsOpen(false)} className="h-10" />
        ) : (
          <Bars3BottomLeftIcon
            onClick={() => setIsOpen(true)}
            className="h-10"
          />
        )}
      </div>
      <div className="lg:w-9/12 lg:pl-28 lg:pt-10">
        <Outlet />
      </div>
    </div>
  );
};

const Navigation = ({ children, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      isActive
        ? "my-3 flex items-center gap-x-2 rounded-lg bg-gray-100 py-2 pl-8 font-medium text-gray-900"
        : "my-3 flex items-center gap-x-2 rounded-lg py-2 pl-8 font-medium text-gray-400"
    }
  >
    {children}
  </NavLink>
);

export default Dashboard;
