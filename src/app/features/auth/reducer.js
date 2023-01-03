import {
  AUTH_LOADING_FALSE,
  AUTH_LOADING_TRUE,
  SET_AUTH_TRUE,
  USER_LOGOUT,
} from "./constanst";

const initialState = {
  authentication: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TRUE:
      return { ...state, authentication: true, ...action.payload };
    case USER_LOGOUT:
      return { loading: state.loading, isLogin: false };
    case AUTH_LOADING_TRUE:
      return { ...state, loading: true };
    case AUTH_LOADING_FALSE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default authReducer;
