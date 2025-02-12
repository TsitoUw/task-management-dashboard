import { memo, useCallback } from "react";
import { taskService, type Task } from "@/services/taskService";
import { useDispatch } from "react-redux";
import { taskSlice } from "@/store/taskSlice";
import { toast } from "sonner";

const Task = memo(({ id, completed, title }: Task) => {
    const dispatch = useDispatch();
    const handleToggle = useCallback(async () => {
        try {
            await taskService.updateTask(id, {
                completed: !completed,
            });
            dispatch(taskSlice.actions.toggleTask(id));
        } catch (error) {
            console.error(error);
            toast.error(
                "Updating the task failed! (since API is mock the UI have changed)"
            );
        }
    }, [dispatch, id, completed]);
    const handleDelete = useCallback(async () => {
        try {
            await taskService.deleteTask(id);
            toast.success(`Task with id: ${id} have been deleted`);
            dispatch(taskSlice.actions.removeTask(id));
        } catch (error) {
            console.error(error);
            toast.error(
                "Deleting the task failed! (since API is mock the UI have changed)"
            );
        }
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
