import {
  CREATE_USER_FAILED,
  CREATE_USER_REQ,
  CREATE_USER_SUCCESS,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQ,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
} from "../constants/userCons";

export const newUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQ:
      return {
        ...state,
        loading: true,
      };
      break;
    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload.user,
        success: action.payload.success,
      };
      break;
    case CREATE_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
      break;
    case "CLEAR_ERROR":
    return{
      ...state,
      error:null
    }

    default:
      return state;
      break;
  }
};
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQ:
      return {
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload.user,
        success: action.payload.success,
      };
    case LOGIN_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
//LOAD USER
export const loadReducer = (state = { state: "working" }, action) => {
  switch (action.type) {
    case LOAD_USER_REQ:
      return {
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        success: action.payload.success,
        isAuthenticated: true
      };
    case LOAD_USER_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const logoutReducer = (state = { state: "working" }, action) => {
  switch (action.type) {
    case LOGOUT_USER_SUCCESS:
      return {
        success: action.payload.success,
        message: action.payload.message
      };
    case LOGOUT_USER_FAILED:
      return {
        error: action.payload,
      };
      case "CLEAR_LOGGED_MESSAGE":
      return{
        success:false,
        message: null,
      }
    default:
      return state;
  }
};
