import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import dataReducer from "./data";
import breadcrumbReducer from "./breadcrumb";

const rootReducer = combineReducers({
  user: userReducer,
  breadcrumb: breadcrumbReducer,
  data: dataReducer,
});

export default rootReducer;
