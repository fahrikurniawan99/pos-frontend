import axios from "axios";
import config from "../../config";

const putCart = (url, data) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      baseURL: config.BASE_URL,
      url,
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error.message));
  });
};
const getCart = (url) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      baseURL: config.BASE_URL,
      url,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error.message));
  });
};

export { putCart, getCart };
