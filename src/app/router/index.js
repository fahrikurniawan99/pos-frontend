import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Loading from "../../components/Loading";
import { useAuth } from "../../hooks";
import Cart from "../../pages/Cart";
import Dashboard from "../../pages/Dashboard";
import Address from "../../pages/Dashboard/Address";
import Orders from "../../pages/Dashboard/Orders";
import Profile from "../../pages/Dashboard/Profile";
import Home from "../../pages/home";
import Invoice from "../../pages/Invoice";
import Login from "../../pages/Login";
import Page404 from "../../pages/Page404";
import Payment from "../../pages/Payment";
import Register from "../../pages/Register";
import { userAuthentication } from "../features/auth/actions";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const dispatch = useDispatch();
  const Auth = useAuth();

  useEffect(() => {
    dispatch(userAuthentication());
  }, [dispatch]);

  return (
    <Routes>
      {Auth.loading ? (
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">
              <Loading />
            </div>
          }
        />
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="address" element={<Address />} />
            </Route>
            <Route path="/payment" element={<Payment />} />
            <Route path="/invoice/:order_id" element={<Invoice />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
