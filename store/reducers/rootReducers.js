import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import breadcrumbReducer from "./breadcrumb";

const rootReducer = combineReducers({
  user: userReducer,
  breadcrumb: breadcrumbReducer,
});

export default rootReducer;
