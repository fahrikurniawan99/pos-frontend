import axios from "axios";
import config from "../../config";


const loginUser = async (data) =>
  await axios.post(`${config.authBaseUrl}/login`, data);

const registerUser = async (data) =>
  await axios.post(`${config.authBaseUrl}/register`, data);

const logoutUser = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios
    .post(`${config.authBaseUrl}/logout`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      localStorage.removeItem("auth");
      return res;
    });
};

export { loginUser, registerUser, logoutUser };
