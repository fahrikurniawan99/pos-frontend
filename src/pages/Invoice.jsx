import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../config";
import { useAuth } from "../hooks";

const InvoicePage = () => {
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const { token } = useAuth();
  const params = useParams();

  useEffect(() => {
    axios({
      method: "get",
      baseURL: config.BASE_URL,
      url: `/invoices/${params.order_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setInvoiceDetail([
          { label: "Status", value: data.payment_status },
          { label: "Order Id", value: `#${data.order.order_number}` },
          { label: "Total Amount", value: data.total },
          {
            label: "Billed to",
            value: `${data.user.full_name} ${data.user.email} ${data.delivery_address.provinsi} ${data.delivery_address.kabupaten}`,
          },
          {
            label: "Payment to",
            value: (
              <>
                Eduwork <br /> eduwork@gmail.com <br /> BANK <br />{" "}
                xxxx-xxxx-12129
              </>
            ),
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-auto flex h-screen flex-col md:w-11/12 lg:w-8/12">
      <h1 className="py-5 text-center text-2xl font-bold text-gray-800">
        Invoice
      </h1>
      <div className="relative mb-5 flex flex-grow flex-col overflow-y-auto rounded-md bg-white p-2 md:p-10">
        {invoiceDetail.length
          ? invoiceDetail.map(({ label, value }, i) => (
              <div key={i} className="flex justify-between border-t py-3">
                <span className="font-medium">{label}</span>
                <span className="inline-block w-6/12">{value}</span>
              </div>
            ))
          : null}
        <div className="mt-auto flex justify-end space-x-2 font-semibold text-gray-700">
          <Link
            to="/"
            className="rounded-md border border-gray-300 bg-gray-50 py-2 px-5"
          >
            home
          </Link>
          <Link
            to="/dashboard/order-history"
            className="rounded-md border border-gray-300 bg-gray-50 py-2 px-5"
          >
            order history
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
