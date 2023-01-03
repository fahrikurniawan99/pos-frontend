import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import {
  CheckCircleIcon as CheckCircleIconOutline,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAddress } from "../../app/api/address";
import { getCart } from "../../app/api/cart";
import { ADD_SUB_TOTAL } from "../../app/features/cart/constants";
import Loading from "../../components/Loading";
import config from "../../config";
import { useCart } from "../../hooks";

const Payment = () => {
  const [address, setAddress] = useState("");
  const [myAddress, setMyAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { subTotal } = useCart();
  const [carts, setCarts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectAddress = (value) => {
    setAddress(value);
  };

  useEffect(() => {
    const urlAddress = "/delivery-addresses";
    getAddress(urlAddress)
      .then((data) => {
        setMyAddress(data);
        setAddress(data[0].name);
        const urlCart = "/carts";
        getCart(urlCart)
          .then(({ data }) => {
            if (data.length) {
              setCarts(data);
              setIsLoading(false);
            } else {
              navigate("/cart");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [navigate]);

  useEffect(() => {
    if (carts.length) {
      let subTotal = 0;
      carts.map((value) => {
        return (subTotal += value.price * value.qty);
      });
      dispatch({ type: ADD_SUB_TOTAL, payload: subTotal });
    }
  }, [carts, dispatch]);

  const createOrder = async () => {
    try {
      setIsLoading(true);
      const addressSelected = myAddress.find(({ name }) => name === address);
      const token = localStorage.getItem("token");
      const body = { delivery_address: addressSelected, delivery_fee: 20000 };
      const { data } = await axios({
        method: "post",
        baseURL: config.BASE_URL,
        url: "/orders",
        data: body,
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/invoice/${data._id}`);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const baseClass =
    "flex font-semibold my-5 w-full items-center border justify-between rounded-lg p-5 text-gray-400 cursor-pointer";

  const activeClass =
    "flex font-semibold my-5 w-full items-center ring ring-indigo-200 justify-between rounded-lg p-5 text-white cursor-pointer bg-indigo-600";

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="container relative mx-auto h-screen justify-between pt-5 lg:flex">
          <RadioGroup
            className="px-[10px] lg:w-5/12 lg:px-0"
            value={address}
            onChange={selectAddress}
          >
            <RadioGroup.Label className="text-2xl font-bold text-gray-800">
              Alamat
            </RadioGroup.Label>
            {myAddress &&
              myAddress.map((value) => {
                return (
                  <RadioGroup.Option key={value._id} value={value.name}>
                    {({ checked }) => (
                      <span className={checked ? activeClass : baseClass}>
                        {value.name}
                        {checked ? (
                          <CheckCircleIcon className="w-5" />
                        ) : (
                          <CheckCircleIconOutline className="w-5" />
                        )}
                      </span>
                    )}
                  </RadioGroup.Option>
                );
              })}
          </RadioGroup>
          <div className="flex flex-col px-[10px] pb-[160px] lg:w-6/12 lg:px-0 lg:pb-0">
            <h2 className="sticky top-0 bg-white pb-5 text-2xl font-bold text-gray-800 lg:static">
              Details
            </h2>
            <div className="h-full lg:overflow-y-auto">
              {carts.length &&
                carts.map((cart) => (
                  <div
                    key={cart._id}
                    className="my-5 grid h-24 grid-cols-4 items-center text-center"
                  >
                    <img
                      width={100}
                      src={cart.image_url}
                      alt=""
                      className="mx-auto"
                    />
                    <h2 className="w-full truncate">{cart.name}</h2>
                    <h3>{cart.price}</h3>
                    <p>{cart.qty}</p>
                  </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 mt-auto flex w-full flex-col border-t bg-white py-5 px-[10px] lg:static lg:px-0">
              <div className="mb-2 flex justify-between text-lg font-semibold text-gray-500">
                <span>Ongkir</span>
                <span className="text-gray-900">Rp. 20000</span>
              </div>
              <div className="mb-5 flex justify-between text-lg font-semibold text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900">{`Rp. ${subTotal}`}</span>
              </div>
              <button
                onClick={createOrder}
                className="ml-auto rounded bg-indigo-600 px-14 py-3 font-medium text-white transition-all duration-300 hover:scale-105"
              >{`Rp. ${subTotal + 20000}`}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
