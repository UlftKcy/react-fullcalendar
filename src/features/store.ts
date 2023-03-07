import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./events/eventSlice";

const store = configureStore({
    reducer: {
        eventReducer: eventSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;