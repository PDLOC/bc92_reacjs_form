import { configureStore } from "@reduxjs/toolkit"
import reactFormReducer from "./../slice"

const store = configureStore({
    reducer: {
        reactFormReducer,
    }
});

export default store;