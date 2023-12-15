import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import dataReducer from "./data";

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

export default rootReducer;
