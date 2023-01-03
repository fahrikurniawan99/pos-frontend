import axios from "axios";
import config from "../../config";

const getAddress = (url) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
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

const postAddress = (url, data) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      baseURL: config.BASE_URL,
      url,
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => reject(error.response.data.message));
  });

export { getAddress, postAddress };
