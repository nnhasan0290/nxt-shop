import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_GET_REQ,
  ORDER_GET_SUCCESS,
  MY_ORDER_GET_FAIL,
  MY_ORDER_GET_REQ,
  MY_ORDER_GET_SUCCESS,
} from "../constants/orderCons";
import axios from "axios";

export const createOrder = (info) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQ });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/order/create`,
      info,
      config
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.error });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_GET_REQ });
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/order/get`
    );

    dispatch({ type: ORDER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_GET_FAIL, payload: error.response.data.error });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_GET_REQ });
    const config = {
      withCredentials: true,
    }
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/order/myorder`,config
    );

    dispatch({ type: MY_ORDER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_GET_FAIL, payload: error.response.data.error });
  }
};

