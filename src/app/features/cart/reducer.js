import {
  ADD_CART_ITEM,
  ADD_SUB_TOTAL,
  CLEAR_CART_ITEM,
  QTY_COUNTER,
  DELETE_CART_ITEM,
  CART_LOADING_TRUE,
  CART_LOADING_FALSE,
} from "./constants";

const initialState = {
  item: JSON.parse(localStorage.getItem("cart_item")) || [],
  subTotal: 0,
  loading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return { ...state, item: [...state.item, action.payload] };
    case ADD_SUB_TOTAL:
      return { ...state, subTotal: action.payload };
    case QTY_COUNTER:
      localStorage.setItem("cart_item", JSON.stringify(action.payload));
      return { ...state, item: action.payload };
    case DELETE_CART_ITEM:
      return { ...state, item: action.payload };
    case CLEAR_CART_ITEM:
      localStorage.removeItem("cart_item");
      return { ...state, item: [] };
    case CART_LOADING_TRUE:
      return { ...state, loading: true };
    case CART_LOADING_FALSE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default cartReducer;
