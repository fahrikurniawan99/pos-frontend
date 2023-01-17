import axios from "axios";
import config from "../../config";

const saveCart = async (data, token) =>
  await axios.put(
    `${config.apiBaseUrl}/carts`,
    { items: data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const getCartItems = async (token) =>
  await axios.get(`${config.apiBaseUrl}/carts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export { saveCart, getCartItems };
