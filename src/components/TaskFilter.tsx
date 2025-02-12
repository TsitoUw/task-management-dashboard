import { RootState } from "@/store";
import { taskSlice } from "@/store/taskSlice";
import { TaskState } from "@/types/task";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

function TaskFilter() {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state: RootState) => state.tasks.filter);
    const handleCompleteAll = useCallback(() => {
        dispatch(taskSlice.actions.completeAll());
    }, [dispatch]);
    return (
        <div className="mb-6 flex items-center">
            <Select
                value={currentFilter}
                onValueChange={(value) =>
                    dispatch(
                        taskSlice.actions.setFilter(
                            value as TaskState["filter"]
                        )
                    )
                }
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionnez un filtre" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sélectionnez un filtre</SelectLabel>

                        <SelectItem value="all">Tout les tâches</SelectItem>
                        <SelectItem value="active">
                            Tâches non terminées
                        </SelectItem>
                        <SelectItem value="completed">
                            Tâches terminées
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button
                variant="destructive"
                type="button"
                className="ml-auto"
                onClick={handleCompleteAll}
            >
                Tout compléter
            </Button>
        </div>
    );
}

export default TaskFilter;
