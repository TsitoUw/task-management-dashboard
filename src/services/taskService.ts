import axios from "axios";

interface Task {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

interface CreateTaskDTO {
    title: string;
    completed: boolean;
    userId: number;
}

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
});

export const taskService = {
    async getAllTasks(): Promise<Task[]> {
        const response = await api.get<Task[]>("/todos");
        return response.data;
    },
};

export type { Task, CreateTaskDTO };
