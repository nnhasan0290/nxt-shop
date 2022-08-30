import { LOCALHOST, SAVE_SHIPPING_INFO } from "../constants/cartCons";
export const cartReducer = (state = {cartItems:[],shippingInfo:{}}, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      };
      case LOCALHOST: 
      return{
        ...state,
        allcartItems: action.payload
      }
    default:
      return state;
  }
};
