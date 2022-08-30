import { LOCALHOST, SAVE_SHIPPING_INFO } from "../constants/cartCons";
import axios from "axios";

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
};

export const localHostState = (data) => (dispatch) => {
  dispatch({type:LOCALHOST, payload: data});
}

