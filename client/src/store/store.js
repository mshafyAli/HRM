import { configureStore, combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import candidateReducer from "./candidateSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};


const rootReducer = combineReducers({
  employees: employeeReducer,
  Candidate: candidateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // For PersistGate

export default store;