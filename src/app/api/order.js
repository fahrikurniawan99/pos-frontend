import axios from "axios";
import config from "../../config";

const getOrder = async (url, token) =>
  await axios({
    method: "get",
    baseURL: config.BASE_URL,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const createOrder = async (url, { delivery_fee, delivery_address }, token) => {
  return await axios({
    method: "post",
    baseURL: config.BASE_URL,
    url,
    data: { delivery_fee, delivery_address },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getOrder, createOrder };
