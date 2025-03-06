import { z } from "zod";

const authSchema = z.object({
    users_name: z.string(),
    users_email: z.string().email(),
    users_password: z.string(),
    users_password_confirmation: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "users_email" | "users_password">;
export type UserRegistrationForm = Pick<
    Auth,
    | "users_name"
    | "users_email"
    | "users_password"
    | "users_password_confirmation"
>;

export const userSchema = z.number();

export type User = z.infer<typeof userSchema>;

export const taskSchema = z.object({
    tasks_id: z.number(),
    tasks_name: z.string(),
    tasks_completed: z.boolean(),
});

export const dashboardTaskSchema = z.array(
    taskSchema.pick({
        tasks_id: true,
        tasks_name: true,
        tasks_completed: true,
    })
);

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "tasks_name" | "tasks_completed">;
