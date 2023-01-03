import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../../app/api/order";
import Loading from "../../components/Loading";
import config from "../../config";

const Invoice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState("");
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      baseURL: config.BASE_URL,
      url: `/invoices/${params.order_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setInvoice(data);
      getOrder("/orders?limit=0").then(({ data: orders }) => {
        const order = orders.find((order) => order._id === data.order._id);
        setProducts(order.order_items);
        setIsLoading(false);
      });
    });
  }, [params.order_id]);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="container relative mx-auto mt-5 px-[10px] md:px-0 lg:pt-10">
          <div className="stick top-0 flex justify-end">
            <Link
              to="/dashboard/orders"
              className="px-8 py-1 font-medium text-gray-500"
            >
              back
            </Link>
            <Link
              to="/"
              className="rounded bg-indigo-600 px-8 py-1 font-medium text-white"
            >
              Shop
            </Link>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Invoice</h1>
            <h2 className="text-lg text-gray-400">
              Date:{" "}
              <span className="font-semibold text-gray-900">12/22/2022</span>
            </h2>
          </div>
          <span className="mt-5 inline-block rounded-lg border border-green-200 bg-green-50 px-8 py-2 text-sm font-medium text-green-500">
            {invoice.payment_status}
          </span>
          <div className="mt-5 flex justify-between text-gray-900 lg:mt-10">
            <div className="w-5/12 lg:w-6/12">
              <h3 className="text-lg text-gray-600">Billed to</h3>
              <div className="lg:ml-5">
                <p className="w-full truncate text-xl font-semibold">
                  {invoice.user.full_name}
                </p>
                <p className="w-full truncate">{invoice.user.email}</p>
                <p>{`${invoice.delivery_address.detail} ${invoice.delivery_address.kelurahan} ${invoice.delivery_address.kecamatan}`}</p>
                <p>{`${invoice.delivery_address.kabupaten} ${invoice.delivery_address.provinsi}`}</p>
              </div>
            </div>
            <div className="w-6/12">
              <h3 className="text-lg text-gray-600">Payment to</h3>
              <div className="lg:ml-5">
                <p className="text-xl font-semibold">eduwork</p>
                <p>eduwork@gmail.com</p>
                <p>Bank dummy</p>
                <p>xxxx-212719</p>
              </div>
            </div>
          </div>
          <div className="justify-between pt-10 lg:flex">
            <div className="lg:w-7/12">
              <div className="grid grid-cols-3 bg-indigo-200 p-3 font-semibold">
                <span>name</span>
                <span>price</span>
                <span>qty</span>
              </div>
              {products.map((product, index) => (
                <div key={index} className="grid grid-cols-3 p-3">
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                  <span>{product.qty}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 text-xl font-semibold text-gray-700 lg:mt-0 lg:w-4/12">
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Subtotal</span>
                <span>{invoice.sub_total}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Delivery fee</span>
                <span>{invoice.delivery_fee}</span>
              </div>
              <div className="mt-5 flex justify-between border-t pt-5 pb-5 text-2xl">
                <span className="font-medium text-gray-400">Total</span>
                <span>{invoice.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
