import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { courseReducer } from "./slices/courseSlice";
import loginReducer from "./slices/loginSlice";
import { userReducer } from "./slices/userSlice";

const persistConfig = {
    key : "root",
    storage,
    whitelist : ["login"]
};

const rootReducer = combineReducers({
    login : loginReducer,
    course:courseReducer,
    users :userReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=>useDispatch<AppDispatch>();