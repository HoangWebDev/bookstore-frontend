import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "./admin"
import tokenReducer from "./token"

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        token: tokenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch