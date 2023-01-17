import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardOrdersCard = ({
  orderNumber,
  total,
  status,
  id,
  orderItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`z-50 grid h-16 grid-cols-12 items-center border-t text-sm`}
      >
        <div>
          <ChevronRightIcon
            onClick={() => setIsOpen(!isOpen)}
            className={`h-5 cursor-pointer hover:opacity-50 ${
              isOpen ? "rotate-90" : ""
            } transition-all duration-300 ease-in-out`}
          />
        </div>
        <div className="col-start-2 col-end-2 lg:col-start-2 lg:col-end-3">
          {orderNumber}
        </div>
        <div className="col-start-3 col-end-4 lg:col-start-4 lg:col-end-5">
          {total}
        </div>
        <div className="col-start-6 col-end-9 lg:col-start-7 lg:col-end-9">
          {status}
        </div>
        <div className="col-start-11 col-end-12">
          <Link
            className="bg-indigo-600 px-2 py-2 text-white lg:px-5"
            to={`/invoice/${id}`}
          >
            Invoice
          </Link>
        </div>
      </div>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div
          className={`grid h-16 grid-cols-3 items-center border-t text-center font-bold`}
        >
          <div>Product</div>
          <div>Total</div>
          <div>Total price</div>
        </div>
        {orderItems.map((item, i) => (
          <div key={i} className="grid h-16 grid-cols-3 items-center border-t text-center">
            <div>{item.name}</div>
            <div>{item.qty}</div>
            <div>{item.price * item.qty}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardOrdersCard;
