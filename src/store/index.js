import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import subjectSlice from "./subjectSlice";

const reducers = combineReducers({
  // 여러 reducer를 하나로 합쳐주는 역할
  subject: subjectSlice.reducer,
});

const persistedConfig = {
  key: "root", // reducer key
  storage, // local storage에 저장
  whitelist: ["question", "subject"], // user reducer만 local storage에 저장
};

const persistedReducer = persistReducer(persistedConfig, reducers); // persistReducer를 이용하여 reducer에 대한 정보를 저장, reducer를 반환시키는 API

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
