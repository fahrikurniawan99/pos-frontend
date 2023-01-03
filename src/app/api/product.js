import axios from "axios";
import config from "../../config";

const getProduct = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: config.BASE_URL,
      url,
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export { getProduct };
