import axios from "axios";

export const getProvinces = async () =>
  await axios("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");

export const getRegencies = async (id) =>
  await axios(
    `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`
  );
export const getDistricts = async (id) =>
  await axios(
    `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
  );
export const getVillages = async (id) =>
  await axios(
    `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
  );
