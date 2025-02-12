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
    async updateTask(taskId: number, task: Partial<Task>): Promise<Task> {
        const response = await api.put<Task>(`/todos/${taskId}`, task);
        return response.data;
    },
    async deleteTask(taskId: number): Promise<void> {
        await api.delete(`/todos/${taskId}`);
    },
};

export type { Task, CreateTaskDTO };
