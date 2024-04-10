import * as AuthApi from "../api/AuthRequest";
import { message } from 'antd'


export const login = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    console.log(data);
    message.success("Login Successful");
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data);

    dispatch({ type: "AUTH_FAIL" });
  }


}

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    message.success("SignUp Successful");
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data);
    dispatch({ type: "AUTH_FAIL" });
    if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
      dispatch(logout())
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AuthApi.logOut();
    message.success("Logout Successful");
    dispatch({ type: "LOG_OUT" })
  }


  catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data);
    
  }
}

export const forgotPassword = (data) => async (dispatch) => {
  try {
    
    
    await AuthApi.forgotPassword(data);
    message.success("Email Sent Successfully");
    window.location.href =`../sentEmail/${data.email}`
  } catch (error) {
    console.log(error.response.data);
    message.error(error.response.data.message);
    if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
      dispatch(logout())
    }
  }
};
export const resetPassword = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    console.log(data);
    message.success("Login Successful");
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data);

    dispatch({ type: "AUTH_FAIL" });
  }


}