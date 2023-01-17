import {
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  SET_CATEGORY,
} from "./constants";

const initialState = {
  data: [],
  currentPage: 1,
  totalItems: -1,
  perPage: 8,
  keyword: "",
  category: "",
  tags: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_START:
      return { ...state, data: [], errors: "" };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        errors: "",
        totalItems: action.payload.count,
      };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export default productReducer;
