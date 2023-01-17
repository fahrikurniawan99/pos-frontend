import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
} from "../app/api/address";
import { postAddress } from "../app/api/delivery-address";
import { useAuth } from "../hooks";
import DashboardAddressCard from "./DashboardAddressCard";

const DashboardAddress = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const Auth = useAuth();
  const [form, setForm] = useState({
    user: Auth.user._id,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const createDeliveryAddress = () => {
    setIsLoading(true);
    postAddress("/delivery-addresses", form, Auth.token)
      .then(({ data }) => {
        console.log(data);
        setIsLoading(false);
        setIsEditMode(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const onChangeHandler = ({ target }) => {
    if (target.value) {
      setForm({ ...form, [target.name]: target.value });
    } else {
      const forms = { ...form };
      delete forms[target.name];
      setForm(forms);
    }
  };

  useEffect(() => {
    getProvinces().then(({ data }) => {
      setProvinsi(
        data.map(({ name, id }) => ({
          label: name,
          value: name,
          id,
        }))
      );
    });
  }, []);

  const provinsiHandler = ({ id, value }) => {
    setForm({ ...form, provinsi: value });
    getRegencies(id).then(({ data }) =>
      setKabupaten(
        data.map(({ name, id }) => ({
          label: name,
          value: name,
          id,
        }))
      )
    );
  };

  const kabupatenHandler = ({ id, value }) => {
    setForm({ ...form, kabupaten: value });
    getDistricts(id).then(({ data }) =>
      setKecamatan(
        data.map(({ name, id }) => ({
          label: name,
          value: name,
          id,
        }))
      )
    );
  };

  const kecamatanHandler = ({ id, value }) => {
    setForm({ ...form, kecamatan: value });
    getVillages(id).then(({ data }) =>
      setKelurahan(
        data.map(({ name, id }) => ({
          label: name,
          value: name,
          id,
        }))
      )
    );
  };

  const kelurahanHandler = ({ value }) => {
    setForm({ ...form, kelurahan: value });
  };

  return (
    <div className="relative min-h-full">
      <div className="sticky top-0 flex">
        <button
          disabled={(Object.keys(form).length < 7 && isEditMode) || isLoading}
          onClick={
            isEditMode ? createDeliveryAddress : () => setIsEditMode(true)
          }
          className="flex items-center rounded bg-indigo-600 px-3 py-2 font-medium text-white hover:bg-indigo-400 disabled:opacity-70 disabled:hover:bg-indigo-600 text-sm"
        >
          {isLoading ? (
            "saving..."
          ) : (
            <>
              {isEditMode ? (
                "save"
              ) : (
                <>
                  create <PlusIcon className="h-5" />
                </>
              )}
            </>
          )}
        </button>
        <button
          onClick={() => setIsEditMode(false)}
          className={`${
            isEditMode ? "" : "hidden"
          } flex items-center rounded bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-400 disabled:opacity-70 ml-2`}
        >
          Cancel
        </button>
      </div>
      {isEditMode ? (
        <div className="mt-10 flex gap-x-5">
          <div className="w-6/12 space-y-4">
            <input
              onChange={onChangeHandler}
              type="text"
              name="name"
              placeholder="address name"
              className="w-full rounded border bg-gray-50 p-3 outline-none"
            />
            <textarea
              onChange={onChangeHandler}
              name="detail"
              rows={5}
              placeholder="address detail"
              className="w-full rounded border bg-gray-50 p-3 outline-none"
            />
          </div>
          <div className="w-6/12 space-y-8">
            <ReactSelect
              onChange={provinsiHandler}
              placeholder="Select location"
              options={provinsi}
            />
            <ReactSelect
              onChange={kabupatenHandler}
              placeholder="Select location"
              options={kabupaten}
            />
            <ReactSelect
              onChange={kecamatanHandler}
              placeholder="Select location"
              options={kecamatan}
            />
            <ReactSelect
              onChange={kelurahanHandler}
              placeholder="Select location"
              options={kelurahan}
            />
          </div>
        </div>
      ) : <DashboardAddressCard />}
    </div>
  );
};

export default DashboardAddress;
