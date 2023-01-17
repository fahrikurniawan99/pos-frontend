import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAddress from "../../components/DashboardAddress.jsx";
import DashboardOrders from "../../components/DashboardOrders.jsx";
import DashboardProfile from "../../components/DashboardProfile.jsx";
import CartPage from "../../pages/Cart.jsx";
import CheckoutPage from "../../pages/Checkout";
import DashboardPage from "../../pages/Dashboard.jsx";
import Home from "../../pages/Home";
import InvoicePage from "../../pages/Invoice.jsx";
import LoginPage from "../../pages/Login";
import Page404 from "../../pages/Page404";
import RegisterPage from "../../pages/Register";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardProfile />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="order-history" element={<DashboardOrders />} />
          <Route path="delivery-address" element={<DashboardAddress />} />
        </Route>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice/:order_id" element={<InvoicePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
