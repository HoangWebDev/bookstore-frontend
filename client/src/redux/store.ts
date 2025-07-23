import { combineReducers, configureStore } from "@reduxjs/toolkit"
import customerReducer from "./customer"
import cartReducer from "./cart"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { customerEncryptTransform } from "~/utils/encryptTransform";

const cartPersistConfig = {
    key: "cart",
    storage,
};

const customerPersistConfig = {
    key: "customer",
    storage,
    transforms: [customerEncryptTransform],
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartReducer),
    customer: persistReducer(customerPersistConfig, customerReducer), // Đúng vị trí
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
