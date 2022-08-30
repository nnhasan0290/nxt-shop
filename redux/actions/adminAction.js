import {
  DELETE_ADMIN_PRODUCT,
  DELETE_ADMIN_PRODUCT_FAIL,
  DELETE_ADMIN_PRODUCT_REQ,
  GET_ALL_PRODUCT_ADMIN_FAIL,
  GET_ALL_PRODUCT_ADMIN_REQ,
  GET_ALL_PRODUCT_ADMIN_SUCCESS,
  ADMIN_USER_REQ,
  ADMIN_USER_SUCCESS,
  ADMIN_USER_FAIL
} from "../constants/adminCons";
import axios from "axios";

export const adminAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_ADMIN_REQ });
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/admin/products`
    );
    dispatch({ type: GET_ALL_PRODUCT_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_ADMIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADMIN_PRODUCT_REQ });
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/admin/product/delete/${id}`
    );
    dispatch({ type: DELETE_ADMIN_PRODUCT, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const adminAllUsers = () => async (dispatch) => {
  try {
    dispatch({type:ADMIN_USER_REQ});
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/admin/users`);
    dispatch({type: ADMIN_USER_SUCCESS,payload: data});
  } catch(error){
    dispatch({type: ADMIN_USER_FAIL, payload: error.response.data.error});
  }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};