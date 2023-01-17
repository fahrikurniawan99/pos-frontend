import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrder } from "../app/api/order";
import { useAuth } from "../hooks";
import DashboardOrdersCard from "./DashboardOrdersCard";

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  const sumSubtotal = (items) => {
    let sum = 0;
    items.map((item) => {
      sum += item.price * item.qty;
    });
    return sum;
  };

  useEffect(() => {
    getOrder("/orders", token)
      .then(({ data }) => {
        const result = data.data;
        const order = result.map((order) => ({
          ...order,
          total: sumSubtotal(order.order_items) + order.delivery_fee,
        }));
        setOrders(order);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white">
        <h1 className="mb-10 text-xl font-bold text-gray-900">Order history</h1>
        <div className="grid grid-cols-12 text-sm">
          <div className="col-span-2 col-start-1 font-medium lg:col-start-2">
            Order ID
          </div>
          <div className="col-start-3 font-medium lg:col-start-4">Total</div>
          <div className="col-start-6 font-medium lg:col-start-7">Status</div>
          <div className="col-start-11 font-medium">Invoice</div>
        </div>
      </div>
      <div className="mt-5 flex-grow overflow-y-auto">
        {orders.length
          ? orders.map((item, i) => (
              <DashboardOrdersCard
                key={i}
                id={item._id}
                orderNumber={item.order_number}
                status={item.status}
                total={item.total}
                orderItems={item.order_items}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default DashboardOrders;
