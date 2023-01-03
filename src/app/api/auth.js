import axios from "axios";

const authPost = (url, data, isAuth) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      baseURL: "http://localhost:4000/auth",
      url,
      data,
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error.response.data.message));
  });
};
const authGet = (url) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      baseURL: "http://localhost:4000/auth",
      url,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error.message));
  });
};

export { authPost, authGet };
