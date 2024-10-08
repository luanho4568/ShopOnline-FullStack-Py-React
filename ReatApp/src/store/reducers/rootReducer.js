/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import productReducer from "./productReducer";

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: "user",
    whitelist: ["isLoggedIn", "userInfo", "addressData"],
};
const appPersistConfig = {
    ...persistCommonConfig,
    key: "app",
    whitelist: ["language"],
};
const productPersistConfig = {
    ...persistCommonConfig,
    key: "product",
    whitelist: ["cartItems"],
};
export default (history) =>
    combineReducers({
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer),
        app: persistReducer(appPersistConfig, appReducer),
        admin: adminReducer,
        product: persistReducer(productPersistConfig, productReducer),
    });
