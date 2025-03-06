import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createTask,
    getTasks,
    updateTask as updateTaskAPI,
    deleteTask as deleteTaskAPI,
} from "@/api/TaskAPI";
import { TaskFormData } from "@/types/index";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const tasks = await getTasks();
            return tasks || [];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createNewTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData: TaskFormData, { rejectWithValue }) => {
        try {
            await createTask(taskData);
            const tasks = await getTasks();
            return tasks || [];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateExistingTask = createAsyncThunk(
    "tasks/updateTask",
    async (
        { formData, id }: { formData: TaskFormData; id: number },
        { rejectWithValue }
    ) => {
        try {
            await updateTaskAPI({ formData, id });
            const tasks = await getTasks();
            return tasks || [];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteTaskAPI(id);
            const tasks = await getTasks();
            return tasks || [];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
