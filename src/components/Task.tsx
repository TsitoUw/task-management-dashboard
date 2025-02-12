import { memo, useCallback } from "react";
import type { Task } from "@/services/taskService";
import { useDispatch } from "react-redux";
import { taskSlice } from "@/store/taskSlice";

const Task = memo(({ id, completed, title }: Task) => {
    const dispatch = useDispatch();
    const handleToggle = useCallback(async () => {
        dispatch(taskSlice.actions.toggleTask(id));
    }, [dispatch, id]);
    const handleDelete = useCallback(() => {
        dispatch(taskSlice.actions.removeTask(id));
    }, [dispatch, id]);
    return (
        <div
            className={`flex items-center justify-between p-4 mb-2 border rounded ${
                completed ? "bg-green-50" : "bg-white"
            }`}
        >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleToggle}
                    className="mr-4"
                />
                <span className={completed ? "line-through text-gray-500" : ""}>
                    {title}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
                Delete
            </button>
        </div>
    );
});

export default Task;
