import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Task, TaskState } from "@/types/task";

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    filter: "all",
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        completeAll: (state) => {
            state.tasks = state.tasks.map((task) => ({
                ...task,
                completed: true,
            }));
        },
        setFilter: (state, action: PayloadAction<TaskState["filter"]>) => {
            state.filter = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
    },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
