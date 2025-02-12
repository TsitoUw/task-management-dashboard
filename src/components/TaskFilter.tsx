import { RootState } from "@/store";
import { taskSlice } from "@/store/taskSlice";
import { TaskState } from "@/types/task";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function TaskFilter() {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state: RootState) => state.tasks.filter);
    const handleCompleteAll = useCallback(() => {
        dispatch(taskSlice.actions.completeAll());
    }, [dispatch]);
    return (
        <div className="mb-6 flex items-center">
            <select
                value={currentFilter}
                onChange={(e) =>
                    dispatch(
                        taskSlice.actions.setFilter(
                            e.target.value as TaskState["filter"]
                        )
                    )
                }
                className="p-2 border rounded"
            >
                <option value="all">All Tasks</option>
                <option value="active">Active Tasks</option>
                <option value="completed">Completed Tasks</option>
            </select>
            <button
                type="button"
                className="ml-auto"
                onClick={handleCompleteAll}
            >
                Complete all
            </button>
        </div>
    );
}

export default TaskFilter;
