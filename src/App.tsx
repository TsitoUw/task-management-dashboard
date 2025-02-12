import { useDispatch, useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { RootState } from "./store";
import { useEffect } from "react";
import { taskSlice } from "./store/taskSlice";
import { taskService } from "./services/taskService";
import Task from "./components/Task";

function App() {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(
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
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                dispatch(taskSlice.actions.setError(errorMessage));
            }
        };

        fetchTasks();
    }, [dispatch]);

    if (loading) return <div className="text-center">Loading tasks...</div>;
    if (error) return <div className="text-red-600">Error: {error}</div>;

    return (
        <>
            <Navbar />
            <main className="container mx-auto">
                <AddTask />
                <TaskList />
                <div>________________________________</div>
                {tasks.map((task) => (
                    <Task key={task.id} {...task} />
                ))}
            </main>
        </>
    );
}

export default App;
