import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import chatReducer from "./chatUserReducer";

export const reducers = combineReducers({authReducer,postReducer, chatReducer})