import { getCategory } from "../../api/category";
import { getProduct } from "../../api/product";
import { getTag } from "../../api/tag";
import {
  PRODUCT_LOADING_FALSE,
  PRODUCT_LOADING_TRUE,
  SET_CATEGORIES, SET_COUNT, SET_PRODUCT, SET_TAG
} from "./constants";

const fetchProduct = (query) => {
  return async (dispatch, getState) => {
    try {
      const Product = getState().productReducer;
      dispatch({ type: PRODUCT_LOADING_TRUE });
      const url = `/products?limit=${Product.limit}${query ? `&${query}` : ""}`;
      const { data, count } = await getProduct(url);
      dispatch({ type: SET_PRODUCT, payload: data });
      dispatch({ type: SET_COUNT, payload: count });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: PRODUCT_LOADING_FALSE });
  };
};

const fetchCategory = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LOADING_TRUE });
      const { data } = await getCategory("/categories");
      dispatch({ type: SET_CATEGORIES, payload: data });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: PRODUCT_LOADING_FALSE });
  };
};

const fetchTag = (query) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LOADING_TRUE });
      const url = `/tags?${query ? `${query}` : ""}`;
      const { data } = await getTag(url);
      dispatch({ type: SET_TAG, payload: data });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: PRODUCT_LOADING_FALSE });
  };
};

export { fetchProduct, fetchTag, fetchCategory };
