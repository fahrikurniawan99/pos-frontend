import axios from "axios";
import config from "../../config";

const getOrder = (url) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      baseURL: config.BASE_URL,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error.message));
  });

export { getOrder };
