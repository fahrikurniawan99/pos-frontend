import { authGet } from "../../api/auth";
import {
  AUTH_LOADING_FALSE,
  AUTH_LOADING_TRUE,
  SET_AUTH_TRUE
} from "./constanst";

const userAuthentication = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING_TRUE });
    if (localStorage.getItem("token")) {
      const url = "/me";
      const { data } = await authGet(url);
      const { role, customer_id, iat, ...user } = data;
      dispatch({ type: SET_AUTH_TRUE, payload: user });
    }
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: AUTH_LOADING_FALSE });
};

export { userAuthentication };
