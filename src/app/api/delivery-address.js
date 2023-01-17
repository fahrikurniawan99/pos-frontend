import axios from "axios";
import config from "../../config";

const getAddress = (url, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: config.BASE_URL,
      url,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => reject(error.response.data.message));
  });

const postAddress = async (url, data, token) =>
  await axios({
    method: "post",
    baseURL: config.BASE_URL,
    url,
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
const removeAddress = async (url, token) =>
  await axios({
    method: "delete",
    baseURL: config.BASE_URL,
    url,
    headers: { Authorization: `Bearer ${token}` },
  });

export { getAddress, postAddress, removeAddress };
