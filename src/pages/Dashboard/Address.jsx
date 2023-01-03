import { ArrowUturnLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAddress, postAddress } from "../../app/api/address";

const Address = () => {
  const [address, setAddress] = useState("");
  const [addMode, setAddMode] = useState("");
  const [loading, setLoading] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [body, setBody] = useState("");

  const optionsProvinsi =
    provinsi &&
    provinsi.map((provinsi) => ({
      value: provinsi.nama,
      label: provinsi.nama,
    }));
  const optionsKabupaten =
    kabupaten &&
    kabupaten.map((kabupaten) => ({
      value: kabupaten.nama,
      label: kabupaten.nama,
    }));
  const optionsKecamatan =
    kecamatan &&
    kecamatan.map((kecamatan) => ({
      value: kecamatan.nama,
      label: kecamatan.nama,
    }));
  const optionsKelurahan =
    kelurahan &&
    kelurahan.map((kelurahan) => ({
      value: kelurahan.nama,
      label: kelurahan.nama,
    }));

  useEffect(() => {
    axios("https://ibnux.github.io/data-indonesia/provinsi.json").then(
      ({ data }) => {
        setProvinsi(data);
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    getAddress("/delivery-addresses").then((data) => {
      setAddress(data);
      setLoading(false);
    });
  }, []);

  const provinsiSelected = (selectedOption) => {
    setBody({ ...body, provinsi: selectedOption.value });
    const relatedProvinsi = provinsi.find(
      (provinsi) => provinsi.nama === selectedOption.value
    );
    const idProvinsi = relatedProvinsi.id;
    axios(
      `https://ibnux.github.io/data-indonesia/kabupaten/${idProvinsi}.json`
    ).then(({ data }) => setKabupaten(data));
  };

  const kabupatenSelected = (selectedOption) => {
    setBody({ ...body, kabupaten: selectedOption.value });
    const relatedKabupaten = kabupaten.find(
      (kabupaten) => kabupaten.nama === selectedOption.value
    );
    const idKabupaten = relatedKabupaten.id;
    axios(
      `https://ibnux.github.io/data-indonesia/kecamatan/${idKabupaten}.json`
    ).then(({ data }) => setKecamatan(data));
  };

  const kecamatanSelected = (selectedOption) => {
    setBody({ ...body, kecamatan: selectedOption.value });
    const relatedKecamatan = kecamatan.find(
      (kecamatan) => kecamatan.nama === selectedOption.value
    );
    const idKecamatan = relatedKecamatan.id;
    axios(
      `https://ibnux.github.io/data-indonesia/kelurahan/${idKecamatan}.json`
    ).then(({ data }) => setKelurahan(data));
  };

  const kelurahanSelected = (selectedOption) => {
    setBody({ ...body, kelurahan: selectedOption.value });
  };

  const addAddress = async (event) => {
    event.preventDefault();
    try {
      await postAddress("/delivery-addresses", body);
      const responseAddress = await getAddress("/delivery-addresses");
      setAddress(responseAddress);
      setLoading(false);
      setAddMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-[10px] pb-5 md:px-0">
      <div
        className={`${
          addMode ? "hidden" : "flex"
        } items-center justify-between`}
      >
        <h1 className="text-xl font-medium text-gray-800">Alamat</h1>
        <button
          onClick={() => setAddMode(true)}
          className="rounded border border-indigo-200 bg-indigo-50 px-3 py-2 font-semibold text-indigo-500"
        >
          Tambah
        </button>
      </div>
      <div className="mt-10 space-y-5">
        {addMode ? (
          <form onSubmit={addAddress}>
            <div className="space-y-8">
              <div>
                <p className="mb-2 font-medium tracking-tight text-gray-700">
                  Provisi
                </p>
                <Select onChange={provinsiSelected} options={optionsProvinsi} />
              </div>
              <div>
                <p className="mb-2 font-medium tracking-tight text-gray-700">
                  Kabupaten
                </p>
                {kabupaten ? (
                  <Select
                    onChange={kabupatenSelected}
                    options={optionsKabupaten}
                  />
                ) : (
                  <Select />
                )}
              </div>
              <div>
                <p className="mb-2 font-medium tracking-tight text-gray-700">
                  Kecamatan
                </p>
                {kabupaten ? (
                  <Select
                    onChange={kecamatanSelected}
                    options={optionsKecamatan}
                  />
                ) : (
                  <Select />
                )}
              </div>
              <div>
                <p className="mb-2 font-medium tracking-tight text-gray-700">
                  Kelurahan
                </p>
                {kelurahan ? (
                  <Select
                    options={optionsKelurahan}
                    onChange={kelurahanSelected}
                  />
                ) : (
                  <Select />
                )}
              </div>
              <input
                className="form-input w-full rounded-md border-gray-300"
                type="text"
                onChange={({ target }) =>
                  setBody({ ...body, name: target.value })
                }
                placeholder="Beri nama alamat ini"
              />
              <input
                className="form-textarea w-full rounded-md border-gray-300"
                type="textarea"
                onChange={({ target }) =>
                  setBody({ ...body, detail: target.value })
                }
                placeholder="Masukan detail alamat"
              />
            </div>
            <div className="mt-10 flex justify-end gap-x-3">
              <button
                type="submit"
                disabled={Object.keys(body).length < 6}
                className="flex h-[38px] w-[100px] items-center justify-center gap-x-1 rounded bg-blue-500 text-sm font-medium text-white disabled:opacity-50"
              >
                <PlusIcon className="h-4 w-4 text-white" /> Tambah
              </button>
              <button
                type="button"
                onClick={() => setAddMode(false)}
                className="flex h-[38px] w-[100px] items-center justify-center gap-x-1 rounded bg-red-500 text-sm font-medium text-white"
              >
                <ArrowUturnLeftIcon className="h-4 w-4 text-white" /> Kembali
              </button>
            </div>
          </form>
        ) : loading ? (
          <p>Loading...</p>
        ) : address.length ? (
          <>
            {address.map((alamat) => {
              return (
                <div
                  key={alamat._id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-gray-600"
                >
                  <h1>{alamat.name}</h1>
                  <p className="mt-2 text-lg font-semibold leading-relaxed tracking-tight text-gray-700">
                    {`${alamat.detail} ${alamat.kelurahan} ${alamat.kecamatan} ${alamat.kabupaten} ${alamat.provinsi}`}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            Anda belum memiliki alamat
          </p>
        )}
      </div>
    </div>
  );
};

export default Address;
