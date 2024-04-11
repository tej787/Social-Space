import * as UploadApi from "../api/UploadRequest";
import { message } from 'antd'
import { logout } from "./AuthAction";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start ")
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error.response.data);
    message.error(error.response.data.message);
    // if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
    //   dispatch(logout())
    // }
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
      const newPost = await UploadApi.uploadPost(data);
    message.success("New Item Posted");

      dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data.data.newPost });
  } catch (error) {
    console.log(error.response.data);
    message.error(error.response.data.message);
      dispatch({ type: "UPLOAD_FAIL" });
      // if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
      //   dispatch(logout())
      // }
  }
};


export const uploadUserImage = (data) => async (dispatch) => {
  try {
    console.log("User Image upload Action start ")
    await UploadApi.uploadUserImage(data);
  } catch (error) {
    console.log(error.response.data);
    message.error(error.response.data.message);
  }
};
  