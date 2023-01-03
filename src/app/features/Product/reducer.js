import {
  SET_TAG_FILTER,
  PRODUCT_LOADING_FALSE,
  PRODUCT_LOADING_TRUE,
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_PRODUCT,
  SET_TAG,
  SET_PAGE,
  SET_COUNT,
} from "./constants";

const initialState = {
  products: [],
  tags: [],
  tagSelected: "",
  categories: [],
  category: "",
  count: "",
  skip: "",
  limit: 8,
  page: 0,
  isLoading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return { ...state, products: action.payload };
    case SET_TAG:
      return { ...state, tags: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_TAG_FILTER:
      if (state.tagSelected.includes(action.payload))
        return {
          ...state,
          tagSelected: state.tagSelected.filter(
            (tagSelected) => tagSelected !== action.payload
          ),
        };
      return {
        ...state,
        tagSelected: [...state.tagSelected, action.payload],
      };
    case PRODUCT_LOADING_TRUE:
      return { ...state, loading: true };
    case PRODUCT_LOADING_FALSE:
      return { ...state, loading: false };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_COUNT:
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

export default productReducer;
