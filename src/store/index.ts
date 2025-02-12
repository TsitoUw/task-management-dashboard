import { configureStore } from "@reduxjs/toolkit/react";
import { taskSlice } from "./taskSlice";

export const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
