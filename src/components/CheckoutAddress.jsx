import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { getAddress } from "../app/api/delivery-address";
import { useAuth } from "../hooks";
import Loading from "./Loading";

const CheckoutAddress = ({ addressId }) => {
  const [deliveryAddresses, setDeliveryAddresses] = useState("");
  const [addressSelected, setAddressSelected] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const Auth = useAuth();

  const baseClass = `flex cursor-pointer rounded-md border p-3`;

  useEffect(() => {
    getAddress("/delivery-addresses", Auth.token)
      .then((res) => {
        setDeliveryAddresses(res);
        setAddressSelected(res[0].name);
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (addressSelected) {
      const [{ _id }] = deliveryAddresses.filter(
        (address) => address.name === addressSelected
      );
      addressId(_id);
    }
  }, [addressSelected]);

  return (
    <>
      {!isLoading ? (
        <RadioGroup
          as="div"
          className="my-5 space-y-2 px-2 md:px-5"
          value={addressSelected}
          onChange={(value) => {
            setAddressSelected(value);
          }}
        >
          <RadioGroup.Label as="h1">Delivery Address</RadioGroup.Label>
          {deliveryAddresses.map((address, i) => (
            <RadioGroup.Option key={i} value={address.name}>
              {({ checked }) => (
                <div
                  className={`${
                    checked
                      ? "border-indigo-200 bg-indigo-100 "
                      : "border-gray-200 bg-white "
                  } ${baseClass}`}
                >
                  <div className="flex-grow text-gray-900">
                    <h1 className="md:text-lg font-bold">{address.name}</h1>
                    <p className="text-xs md:text-sm">{`${address.detail} ${address.kelurahan} ${address.kecamatan} ${address.kabupaten} ${address.provinsi}`}</p>
                  </div>
                  <div className="relative flex w-[50px] items-center justify-center">
                    {checked ? (
                      <CheckCircleIcon className="h-6 fill-indigo-600" />
                    ) : (
                      <CheckCircleIconOutline className="h-6" />
                    )}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      ) : (
        <div className="py-10 text-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default CheckoutAddress;
