import {
  CREATE_PRODUCT_REQ,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  ALL_PRODUCT_REQ,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQ,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  REVIEW_PRODUCT_REQ,
  REVIEW_PRODUCT_SUCCESS,
  REVIEW_PRODUCT_FAIL,
} from "../constants/productCons.js";
import axios from "axios";

export const creatingProduct = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQ });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "https://3001-nnhasan0290-nextecommer-oyfekk44ino.ws-us62.gitpod.io/api/product/create",
      myForm,
      config
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getAllProducts =
  (keyword = "", price = [0, 1000], page = 1, sort = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQ });
      let link = `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/products?keyword=${keyword}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&page=${page}&sort=${sort}`;
      if (category && category !== "All") {
        link = `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/products?keyword=${keyword}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&page=${page}&sort=${sort}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.error });
    }
  };

//single product ====================================
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQ });
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/product/singleproduct?id=${id}`
    );
    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

//review action ======================================

export const reviewProduct = (myform) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_PRODUCT_REQ });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/product/newreview`,
      myform,
      config
    );
    dispatch({ type: REVIEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REVIEW_PRODUCT_FAIL, payload: error.response.data.error });
  }
};
