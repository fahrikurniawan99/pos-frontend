import { CLEAR_CART_ITEM } from "../Cart/constants";
import { USER_LOGIN, USER_LOGOUT } from "./constanst";

const login =
  ({ token, ...user }) =>
  (dispatch) => {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
        token,
      })
    );
    dispatch({ type: USER_LOGIN, payload: { user, token } });
  };

const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CLEAR_CART_ITEM });
};

export { login, logout };
