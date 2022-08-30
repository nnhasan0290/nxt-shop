import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQ,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQ,
  SINGLE_PRODUCT_REQ,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  REVIEW_PRODUCT_REQ,
  REVIEW_PRODUCT_SUCCESS,
  REVIEW_PRODUCT_FAIL,
} from "../constants/productCons";
export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };
      break;
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        data: action.payload.product,
        success: action.payload.success,
      };
      break;
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export const getAllProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        success: action.payload.success,
        total: action.payload.total_products,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state = { state: "single" }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: action.payload.success,
      };
    case SINGLE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const reviewProductReducer = (state = { state: "review" }, action) => {
  switch (action.type) {
    case REVIEW_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: action.payload.success,
      };
    case REVIEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
