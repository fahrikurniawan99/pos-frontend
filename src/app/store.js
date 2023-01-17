import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import productReducer from "./features/Product/reducer";
import authReducer from "./features/Auth/reducer";
import cartReducer from "./features/Cart/reducer";

const rootReducer = combineReducers({
  productReducer,
  authReducer,
  cartReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
