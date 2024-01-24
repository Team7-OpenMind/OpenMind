import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  // 여러 reducer를 하나로 합쳐주는 역할
  user: userSlice.reducer,
});

const persistedConfig = {
  key: "root", // reducer key
  storage, // local storage에 저장
  whitelist: ["user"], // user reducer만 local storage에 저장
};

const persistedReducer = persistReducer(persistedConfig, reducers); // reducer를 반환시키는 API

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
