import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems } from "../app/api/cart";
import { createOrder } from "../app/api/order";
import RupiahFormat from "../app/RupiahFormat";
import CheckoutAddress from "../components/CheckoutAddress";
import { useAuth } from "../hooks";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const Auth = useAuth();
  const navigate = useNavigate();

  const deliveryFee = 20000;

  useEffect(() => {
    getCartItems(Auth.token)
      .then(({ data }) => {
        if(!data.data.length) return navigate("/")
         setCartItems(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let sum = 0;
    cartItems.map((item) => {
      sum += item.price * item.qty;
    });
    setSubTotal(sum);
  }, [cartItems]);

  const orderHandler = async () => {
    try {
      setIsLoading(true);
      const dataOrder = {
        delivery_fee: deliveryFee,
        delivery_address: addressId,
      };
      const result = await createOrder("/orders", dataOrder, Auth.token);
      setIsLoading(false);
      navigate(`/invoice/${result.data._id}`);
    } catch (err) {
      console.log(err.response);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen flex-col md:w-11/12 lg:w-8/12">
      <h1 className="py-5 text-center text-2xl font-bold text-gray-800">
        Checkout
      </h1>
      <div className="relative mb-5 flex flex-grow flex-col overflow-y-auto rounded-md border bg-white">
        <div className="sticky top-0 z-10 flex justify-between gap-y-3 border-b bg-white py-5 px-2 md:items-center md:gap-y-0">
          <div className="order-1 text-right text-sm font-bold text-gray-600 md:order-none md:text-lg">
            <h2>{`Sub Total ${RupiahFormat(subTotal).split(",")[0]}`}</h2>
            <h2>{`Delivery Fee ${RupiahFormat(deliveryFee).split(",")[0]}`}</h2>
          </div>
          <button
            disabled={!cartItems.length || isLoading}
            onClick={orderHandler}
            className="flex items-center justify-center gap-x-2 rounded bg-green-600 px-5 py-2 text-sm  font-semibold text-white shadow-lg hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 md:px-8 md:text-base"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {RupiahFormat(subTotal + deliveryFee).split(",")[0]}
                <ShieldCheckIcon className="h-5 stroke-2" />
              </>
            )}
          </button>
        </div>
        <CheckoutAddress addressId={(id) => setAddressId(id)} />
        {cartItems.length ? (
          <>
            <h2 className="ml-5">Order detail</h2>
            {cartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex h-[100px] items-center border-b py-5"
                >
                  <div className="basis-3/12">
                    <img
                      src={item.image_url}
                      className="mx-auto w-[60px] md:w-[100px]"
                    />
                  </div>
                  <div className="basis-3/12 text-center text-base font-bold text-gray-800 md:text-lg">
                    {item.name}
                  </div>
                  <div className="basis-3/12 text-center">
                    {RupiahFormat(item.price).split(",")[0]}
                  </div>
                  <div className="flex basis-3/12 justify-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutPage;
