import { InformationCircleIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrder } from "../../app/api/order";
import Loading from "../../components/Loading";

const Orders = () => {
  const [orderHistories, setOrderHistories] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 7;

  useEffect(() => {
    setIsLoading(true);
    const url = `/orders?limit=${LIMIT}`;
    getOrder(url).then(({ data, count }) => {
      setOrderHistories(data);
      setPages(Math.ceil(count / LIMIT));
      setIsLoading(false);
    });
  }, []);

  const ordersPagination = (page) => {
    setIsLoading(true);
    const skip = (page - 1) * LIMIT;
    const query = `limit=${LIMIT}&skip=${skip}`;
    const url = `/orders?${query}`;
    getOrder(url).then(({ data, count }) => {
      setOrderHistories(data);
      setPages(Math.ceil(count / LIMIT));
      setIsLoading(false);
      setCurrentPage(page);
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-full items-center justify-center">
          <Loading />
        </div>
      ) : orderHistories.length ? (
        <div className="mt-5 flex min-h-full flex-col px-[10px] md:px-0 lg:mt-0">
          <div className="space-y-2">
            {orderHistories.map((order, index) => (
              <div
                key={index}
                className="flex w-full flex-wrap justify-between gap-y-4 border py-5 px-5 lg:gap-y-0 lg:px-10 lg:text-center"
              >
                <div className="order-2 w-6/12 text-right text-gray-500 lg:order-none lg:w-2/12 lg:text-center">
                  {moment(order.createdAt).format("MM/DD/YY")}
                </div>
                <div className="order-1 w-6/12 font-medium lg:order-none lg:w-2/12">{`#${order.order_number}`}</div>
                <div className="order-3 lg:order-none lg:w-2/12">{`${order.items_count} item`}</div>
                <div className="order-4 lg:order-none lg:w-4/12">
                  <span className="inline-flex w-full items-center justify-center truncate rounded-full bg-green-200 px-5 text-sm text-green-600 lg:w-6/12">
                    {order.status}
                  </span>
                </div>
                <div className="order-5 lg:order-none lg:w-2/12">
                  <Link
                    to={`/invoice/${order._id}`}
                    className="flex items-center justify-center font-medium text-blue-700 underline"
                  >
                    invoice
                    <InformationCircleIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 mb-5 lg:mt-auto">
            <button
              disabled={currentPage === 1}
              onClick={() => ordersPagination(currentPage - 1)}
              className={`rounded-lg border px-5 py-2 disabled:text-gray-400`}
            >
              Previos
            </button>
            {Array.from({ length: pages }).map((_, index) => (
              <button
              key={index}
                className={`${
                  currentPage === index + 1 && "text-gray-400"
                } rounded-lg border px-5 py-2`}
                onClick={() => {
                  ordersPagination(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === pages}
              onClick={() => ordersPagination(currentPage + 1)}
              className={`rounded-lg border px-5 py-2 disabled:text-gray-400`}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1>Tidak ada histori pesanan</h1>
        </div>
      )}
    </>
  );
};

export default Orders;
