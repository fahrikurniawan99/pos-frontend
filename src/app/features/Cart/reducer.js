import { ADD_CART_ITEM, CLEAR_CART_ITEM, REMOVE_CART_ITEM } from "./constants";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      if (state.find((item) => item.product === action.payload.product)) {
        const cartItem = state.map((item) => ({
          ...item,
          qty:
            item.product === action.payload.product ? item.qty + 1 : item.qty,
        }));
        localStorage.setItem("cart", JSON.stringify(cartItem));
        return cartItem;
      } else {
        const cartItem = [...state, action.payload];
        localStorage.setItem("cart", JSON.stringify(cartItem));
        return cartItem;
      }
    case REMOVE_CART_ITEM:
      const cartItem = state
        .map((item) => ({
          ...item,
          qty:
            item.product === action.payload.product ? item.qty - 1 : item.qty,
        }))
        .filter((item) => item.qty > 0);
      localStorage.setItem("cart", JSON.stringify(cartItem));
      return cartItem;
    case CLEAR_CART_ITEM:
      localStorage.removeItem("cart");
      return [];
    default:
      return state;
  }
};
export default cartReducer;
