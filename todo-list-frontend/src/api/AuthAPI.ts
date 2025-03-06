import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UserLoginForm, UserRegistrationForm, userSchema } from "@/types/index";

export const createAccount = async (formData: UserRegistrationForm) => {
    try {
        const url = "/auth/register";
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const authenticateUser = async (formData: UserLoginForm) => {
    try {
        const url = "/auth/login";
        const { data } = await api.post<string>(url, formData);

        localStorage.setItem("TODO_LIST_AUTH_TOKEN", data);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const getUser = async () => {
    try {
        const url = "/auth/login";
        const { data } = await api.get(url);

        const response = userSchema.safeParse(data.users_id);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
};
