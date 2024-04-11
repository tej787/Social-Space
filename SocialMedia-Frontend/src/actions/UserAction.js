
import * as UserApi from "../api/UserRquest";
import { message } from 'antd'
import { logout } from "./AuthAction";

export const updateUser = (formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(formData);
        message.success("User Updated Successfully");

        console.log("Updated User: ", data.user)
        dispatch({ type: "UPDATING_SUCCESS", data: data })
    }
    catch (error) {
        console.log(error.response.data);
        message.error(error.response.data.message);
        dispatch({ type: "UPDATING_FAIL" })
        if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
            dispatch(logout())
          }

    }

}


export const updateUserPassword = ( formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = await UserApi.updateUserPassword( formData);
        message.success("User Password Updated Successfully");
        console.log("Updated User: ", data.user)
        dispatch({ type: "AUTH_SUCCESS", data: data });

        
    }
    catch (error) {
        console.log(error.response.data);
        message.error(error.response.data.message);
        dispatch({ type: "UPDATING_FAIL" })
        if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
            dispatch(logout())
          }

    }

}

export const followUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: "FOLLOW_USER", data: id })
        message.success("User Followed");

        UserApi.followUser(id)
    }
    catch (error) {
        console.log(error.response.data);
        message.error(error.response.data.message);
        if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
            dispatch(logout())
          }
    }
}

export const unfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: "UNFOLLOW_USER", data: id })
        message.success("User Unfollowed");

        UserApi.unfollowUser(id)
    }
    catch (error) {
        console.log(error.response.data);
        message.error(error.response.data.message);
    }
}

export const deactivateAccount = () => async (dispatch) => {
    try {
        
        UserApi.deactivateAccount()
        message.success("Account Deactivated");
        dispatch(logout())
    }
    catch (error) {
        console.log(error.response.data);
        message.error(error.response.data.message);
    }
}
