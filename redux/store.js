import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  adminDeleteProductReducer,
  adminProductReducer,
  adminUserReducer
} from "./reducers/adminReducer";
import { cartReducer } from "./reducers/cartReducer";
import { getOrderReducer, orderCreateReducer ,getMyOrderReducer} from "./reducers/orderReducer";
import {
  newProductReducer,
  getAllProductReducer,
  singleProductReducer,
  reviewProductReducer,
} from "./reducers/productReducers";
import {
  loadReducer,
  loginReducer,
  newUserReducer,
  logoutReducer,
} from "./reducers/userReducers";

const rootReducer = combineReducers({
  newProducts: newProductReducer,
  newUser: newUserReducer,
  loginUser: loginReducer,
  loadUser: loadReducer,
  logoutUser: logoutReducer,
  allProducts: getAllProductReducer,
  singleProduct: singleProductReducer,
  reviewProduct: reviewProductReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  getOrder: getOrderReducer,
  getMyOrder: getMyOrderReducer,
  adminProducts: adminProductReducer,
  adminDeleteProduct: adminDeleteProductReducer,
  adminUsers: adminUserReducer,

  totalAmount: (state = {}, action) => {
    if (action.type === "GET_TOTAL_AMOUNT") {
      return { amount: action.payload };
    } else {
      return state;
    }
  },
});

const middleware = [thunk];

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
