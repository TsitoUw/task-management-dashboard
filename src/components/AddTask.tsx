import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { taskActions } from "../store/taskSlice";
import { RootState } from "@/store";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Zod schema for task validation
const taskSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters")
        .refine(
            (value) => !value.toLowerCase().includes("test"),
            'Title cannot contain the word "test"'
        ),
});

type TaskValidation = z.infer<typeof taskSchema>;

// Form State and Action types
interface FormState {
    title: string;
    isSubmitting: boolean;
    errors: {
        title?: string[];
        submit?: string;
    };
    isDirty: boolean;
}

type FormAction =
    | { type: "SET_TITLE"; payload: string }
    | { type: "SET_SUBMITTING"; payload: boolean }
    | { type: "SET_ERRORS"; payload: { title?: string[] } }
    | { type: "SET_SUBMIT_ERROR"; payload: string }
    | { type: "CLEAR_ERRORS" }
    | { type: "RESET_FORM" }
    | { type: "SET_DIRTY" };

const initialState: FormState = {
    title: "",
    isSubmitting: false,
    errors: {},
    isDirty: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,
                title: action.payload,
            };
        case "SET_SUBMITTING":
            return {
                ...state,
                isSubmitting: action.payload,
            };
        case "SET_ERRORS":
            return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.payload,
                },
            };
        case "SET_SUBMIT_ERROR":
            return {
                ...state,
                errors: {
                    ...state.errors,
                    submit: action.payload,
                },
                isSubmitting: false,
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                errors: {},
            };
        case "SET_DIRTY":
            return {
                ...state,
                isDirty: true,
            };
        case "RESET_FORM":
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

export default function AddTask() {
    const reduxDispatch = useDispatch();
    const [formState, dispatch] = useReducer(formReducer, initialState);
    const { tasks } = useSelector((state: RootState) => state.tasks);
    const validateForm = (data: Partial<TaskValidation>) => {
        try {
            taskSchema.parse(data);
            dispatch({ type: "CLEAR_ERRORS" });
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.flatten().fieldErrors;
                dispatch({
                    type: "SET_ERRORS",
                    payload: errors as { title?: string[] },
                });
            }
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch({ type: "SET_TITLE", payload: value });
        dispatch({ type: "SET_DIRTY" });

        // Validate on change if the form is dirty
        if (formState.isDirty) {
            validateForm({ title: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm({ title: formState.title });
        if (!isValid) return;

        dispatch({ type: "SET_SUBMITTING", payload: true });

        const newTask = {
            title: formState.title.trim(),
            completed: false,
            userId: 1,
            id: tasks.length + 1,
        };

        reduxDispatch(taskActions.addTask(newTask));
        dispatch({ type: "RESET_FORM" });
        toast.success("Task added successfully, yay!");
    };

    const hasErrors = Object.keys(formState.errors).length > 0;

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        value={formState.title}
                        onChange={handleChange}
                        placeholder="Add new task..."
                        className={` flex-1
                                ${
                                    formState.errors.title
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }
                                `}
                    />

                    {formState.errors.title && (
                        <div className="mt-1 text-sm text-red-500">
                            {formState.errors.title[0]}
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={formState.isSubmitting || hasErrors}
                    >
                        {formState.isSubmitting ? "Adding..." : "Add Task"}
                    </Button>
                </div>
                {formState.errors.submit && (
                    <p className="text-red-500 text-sm">
                        {formState.errors.submit}
                    </p>
                )}
            </div>
        </form>
    );
}
