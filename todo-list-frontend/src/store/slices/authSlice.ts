import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/index";

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("TODO_LIST_AUTH_TOKEN") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;
            localStorage.setItem("TODO_LIST_AUTH_TOKEN", token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("TODO_LIST_AUTH_TOKEN");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
