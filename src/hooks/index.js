import { useSelector } from "react-redux";

const useProduct = () => useSelector((state) => state.productReducer);
const useAuth = () => useSelector((state) => state.authReducer);
const useCart = () => useSelector((state) => state.cartReducer);

export { useProduct, useAuth, useCart };
