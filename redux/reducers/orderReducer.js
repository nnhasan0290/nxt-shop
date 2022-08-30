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

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQ:
      return {
        ...state,
        loading: true,
        success:false
        
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: action.payload.success,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

      case "CLEAR_ERROR":
      return{
        ...state,
        error:null
      }
    default:
      return state;
  }
};



export const getOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_GET_REQ:
      return {
        ...state,
        loading: true,
        
      };
    case ORDER_GET_SUCCESS:
      return {
        loading: false,
        order: action.payload.order,
        success: action.payload.success,
      };
    case ORDER_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getMyOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_ORDER_GET_REQ:
      return {
        ...state,
        loading: true,
        
      };
    case MY_ORDER_GET_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        success: action.payload.success,
      };
    case MY_ORDER_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

