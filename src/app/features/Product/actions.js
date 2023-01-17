import { getProduct } from "../../api/product";
import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  SET_CATEGORY,
} from "./constants";

const getAllProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PRODUCT_START });
      const { count, data } = await getProduct("/products?limit=8");
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: { data, count } });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_ERROR, payload: error });
    }
  };
};

const getProductByTag = (tags = [], category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PRODUCT_START });
      const tagQuery = tags.map((tag) => `&tags=${tag}`).join("");
      const url = `/products?category=${category ? category : ""}${tagQuery}`;
      const { count, data } = await getProduct(url);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: { data, count } });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_ERROR, payload: error });
    }
  };
};

const getProductByCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PRODUCT_START });
      dispatch({ type: SET_CATEGORY, payload: category });
      const url = `/products?category=${category}`;
      const { count, data } = await getProduct(url);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: { data, count } });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_ERROR, payload: error });
    }
  };
};

const getProductByKeyword = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PRODUCT_START });
      const url = `/products?q=${keyword}`;
      const { count, data } = await getProduct(url);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: { count, data } });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_ERROR, payload: error });
    }
  };
};

const paginationProduct = (currentPage) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_START });
    const skip = currentPage * 8;
    const { count, data } = await getProduct(`/products?limit=8&skip=${skip}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: { data, count } });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_ERROR, payload: error });
  }
};

export {
  getAllProduct,
  getProductByTag,
  getProductByCategory,
  getProductByKeyword,
  paginationProduct,
};
