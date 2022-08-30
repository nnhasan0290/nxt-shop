import axios from "axios";
import {
  CREATE_USER_REQ,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  LOGIN_USER_REQ,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
} from "../constants/userCons";
export const createUserAction = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQ });
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "http://localhost:3001/api/user/creating",
      myForm,
      config
    );
    dispatch({ type: CREATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILED, payload: error.response.data.error });
  }
};

export const loginUser = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQ });
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_GITPOD_HOST}/api/user/login`,
      myForm,
      config
    );
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: LOGIN_USER_FAILED, payload: error.response.data.error });
    } else {
      dispatch({ tyep: LOGIN_USER_FAILED, payload: error.message });
    }
  }
};

//LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQ });

    const { data } = await axios.get(`http://localhost:3001/api/user/load`, {
      withCredentials: true,
    });

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    
    if(error.response.data){
      dispatch({ type: LOAD_USER_FAILED, payload: error.response.data.error });
    } else{
      console.log(error.message);
      dispatch({type: LOAD_USER_FAILED, payload: error.message})
    }

  }
};

//LOAD USER
export const logoutUser = () => async (dispatch) => {
  try {

    const { data } = await axios.get(`http://localhost:3001/api/user/logout`, {
      withCredentials: true,
    });
    console.log(data);

    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({type: LOGOUT_USER_FAILED, payload: error.response.data.error});
  }
};
