import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage"; // defaults to localStorage for web

import { thunk } from "redux-thunk";

// Import custom components
import rootReducer from "./reducers/rootReducers";

const middleware = [thunk];

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({ reducer: persistedReducer, middleware });

let persistor = persistStore(store);

export { store, persistor };
