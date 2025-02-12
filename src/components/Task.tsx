import { memo, useCallback } from "react";
import { taskService, type Task } from "@/services/taskService";
import { useDispatch } from "react-redux";
import { taskSlice } from "@/store/taskSlice";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const Task = memo(({ id, completed, title }: Task) => {
    const dispatch = useDispatch();
    const handleToggle = useCallback(async () => {
        dispatch(taskSlice.actions.toggleTask(id));
        // try {
        //     dispatch(taskSlice.actions.toggleTask(id));
        //     await taskService.updateTask(id, {
        //         completed: !completed,
        //     });
        // } catch (error) {
        //     // change back the layout change on error,
        //     // this simulate optimistic render
        //     dispatch(taskSlice.actions.toggleTask(id));
        //     console.error(error);
        //     toast.error(
        //         "Updating the task failed! (since API is mock the UI have changed)"
        //     );
        // }
    }, [dispatch, id]);
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
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={"pp-" + id}
                    onCheckedChange={() => {
                        handleToggle();
                    }}
                    checked={completed}
                />
                <label
                    htmlFor={"pp-" + id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        completed ? "line-through text-gray-500" : ""
                    }`}
                >
                    {title}
                </label>
            </div>
            <Button onClick={handleDelete} variant="destructive">
                Delete
            </Button>
        </div>
    );
});

export default Task;
