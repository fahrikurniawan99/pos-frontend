import {
  AUTH_LOADING_FALSE,
  AUTH_LOADING_TRUE,
  SET_AUTH_TRUE,
  USER_LOGIN,
  USER_LOGOUT,
} from "./constanst";

const initialState = {
  authentication: false,
  loading: false,
  ...(localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : { user: null, token: null }),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case USER_LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};
export default authReducer;
