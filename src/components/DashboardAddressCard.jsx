import React, { useCallback, useEffect, useState } from "react";
import { getAddress, removeAddress } from "../app/api/delivery-address";
import { useAuth } from "../hooks";
import Loading from "./Loading";

const DashboardAddressCard = () => {
  const { token } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllDeliveryAddress = useCallback(() => {
    setIsLoading(true);
    getAddress("/delivery-addresses", token)
      .then((res) => {
        setIsLoading(false);
        setDeliveryAddress(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const removeAddressHandler = (id) => {
    setIsLoading(true);
    removeAddress(`/delivery-addresses/${id}`, token)
      .then(() => {
        getAllDeliveryAddress();
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllDeliveryAddress();
  }, []);

  return (
    <div className="mt-10">
      {!isLoading ? (
        deliveryAddress.length ? (
          <>
            <div className="grid grid-cols-12 py-5 font-semibold">
              <span>No.</span>
              <span className="col-start-2">Name</span>
              <span className="col-start-4">Detail</span>
            </div>
            {deliveryAddress.map((address, i) => (
              <div
                key={i}
                className="grid grid-cols-12 items-start border-t py-5 text-sm first-letter:uppercase"
              >
                <span className="font-semibold">{`${i + 1}.`}</span>
                <span className="col-start-2">{address.name}</span>
                <span className="col-start-4 col-span-6">{`${address.detail} ${address.kelurahan} ${address.kecamatan} ${address.kabupaten} ${address.provinsi}`}</span>
                <div className="col-start-11">
                  <button
                    onClick={() => removeAddressHandler(address._id)}
                    className="rounded bg-red-600 text-xs px-3 py-2 font-medium text-white hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}{" "}
          </>
        ) : (
          <div className="text-center">No result</div>
        )
      ) : (
        <div className="-translate-x-1/12 absolute top-1/2 right-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default DashboardAddressCard;
