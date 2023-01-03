import { putCart } from "../../api/cart";
import {
  ADD_CART_ITEM,
  CART_LOADING_FALSE,
  CART_LOADING_TRUE,
  CLEAR_CART_ITEM,
  DELETE_CART_ITEM,
  QTY_COUNTER,
} from "./constants";

const addCartItem = (product) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_CART_ITEM, payload: product });
    const { item } = getState().cartReducer;
    localStorage.setItem("cart_item", JSON.stringify(item));
  };
};

const deleteCartItem = (productId) => {
  return (dispatch, getState) => {
    const { item } = getState().cartReducer;
    const newCartItem = item.filter((value) => value.product !== productId);
    localStorage.setItem("cart_item", JSON.stringify(newCartItem));
    dispatch({ type: DELETE_CART_ITEM, payload: newCartItem });
  };
};

const addQty = (productId) => {
  return (dispatch, getState) => {
    const { item } = getState().cartReducer;
    const cartItemUpdate = item.map((value) => {
      if (value.product === productId && value.qty < 100)
        return { ...value, qty: value.qty + 1 };
      return value;
    });
    dispatch({ type: QTY_COUNTER, payload: cartItemUpdate });
  };
};

const removeQty = (productId) => {
  return (dispatch, getState) => {
    const { item } = getState().cartReducer;
    const cartItemUpdate = item.map((value) => {
      if (value.product === productId && value.qty > 1) {
        return { ...value, qty: value.qty - 1 };
      }
      return value;
    });
    dispatch({ type: QTY_COUNTER, payload: cartItemUpdate });
  };
};

const checkout = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CART_LOADING_TRUE });
      const { item } = getState().cartReducer;
      const url = "/carts";
      await putCart(url, { items: item });
      dispatch({ type: CLEAR_CART_ITEM });
    } catch (error) {
      return console.log(error);
    }
    dispatch({ type: CART_LOADING_FALSE });
  };
};

export { addCartItem, addQty, checkout, removeQty, deleteCartItem };
