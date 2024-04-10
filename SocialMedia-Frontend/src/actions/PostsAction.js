import * as PostsApi from "../api/PostsRequest";
import { message } from 'antd'
import { logout } from "./AuthAction";

export const getTimelinePosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error.response.data);
    message.error(error.response.data.message);
    dispatch({ type: "RETREIVING_FAIL" });
    if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
      dispatch(logout())
    }
  }
};