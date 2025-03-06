import api from "@/lib/axios";
import { dashboardTaskSchema, Task, TaskFormData } from "@/types/index";
import { isAxiosError } from "axios";

export const createTask = async (formData: TaskFormData) => {
    try {
        const { data } = await api.post("/tasks", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const getTasks = async () => {
    try {
        const { data } = await api.get("/tasks");

        const response = dashboardTaskSchema.safeParse(data);

        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.error.message);
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const getTaskById = async (id: Task["tasks_id"]) => {
    try {
        const url = `/tasks/${id}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

type UpdateTaskFormData = {
    formData: TaskFormData;
    id: Task["tasks_id"];
};

export const updateTask = async ({ formData, id }: UpdateTaskFormData) => {
    try {
        const url = `/tasks/${id}`;
        console.log(`/tasks/${id}`);
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const deleteTask = async (id: Task["tasks_id"]) => {
    try {
        const url = `/tasks/${id}`;
        const { data } = await api.delete<string>(url);
        console.log(`/tasks/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
