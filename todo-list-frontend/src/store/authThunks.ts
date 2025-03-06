import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginForm, UserRegistrationForm } from "@/types/index";
import { authenticateUser, createAccount, getUser } from "@/api/AuthAPI";
import { setCredentials, logout } from "./slices/authSlice";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData: UserRegistrationForm, { rejectWithValue }) => {
        try {
            const response = await createAccount(userData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: UserLoginForm, { dispatch, rejectWithValue }) => {
        try {
            const token = await authenticateUser(credentials);

            if (!token) {
                throw new Error("Authentication failed: No token received");
            }

            const user = await getUser();

            if (!user) {
                throw new Error("Authentication failed: User not found");
            }

            dispatch(
                setCredentials({
                    user,
                    token: token,
                })
            );

            return user;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
        dispatch(logout());
        return null;
    }
);
