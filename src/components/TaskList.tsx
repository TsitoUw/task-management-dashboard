import { RootState } from "@/store";
import { useEffect, useMemo } from "react";
import { taskSlice } from "@/store/taskSlice";
import { taskService } from "@/services/taskService";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { toast } from "sonner";

function TaskList() {
    const dispatch = useDispatch();
    const { tasks, loading, error, filter } = useSelector(
        (state: RootState) => state.tasks
    );

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch(taskSlice.actions.setLoading());
            try {
                const tasks = await taskService.getAllTasks();
                dispatch(taskSlice.actions.setTasks(tasks));
            } catch (error) {
                let errorMessage = "An unexpected error occurred";
                toast.error("Error occured while fetching tasks");

                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                dispatch(taskSlice.actions.setError(errorMessage));
            }
        };

        fetchTasks();
    }, [dispatch]);

    const filteredTasks = useMemo(() => {
        if (filter === "completed")
            return tasks.filter((task) => task.completed);
        if (filter === "active") return tasks.filter((task) => !task.completed);
        return tasks;
    }, [tasks, filter]);

    if (loading) return <div className="text-center">Loading tasks...</div>;
    if (error) return <div className="text-red-600">Error: {error}</div>;

    return (
        <div>
            {filteredTasks.map((task) => (
                <Task key={task.id} {...task} />
            ))}
        </div>
    );
}

export default TaskList;
