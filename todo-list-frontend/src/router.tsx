import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/DashboardView";
import { CreateProjectView } from "./views/tasks/CreateTaskView";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginView } from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import { UpdateTaskView } from "./views/tasks/UpdateTaskView";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route
                        path="/tasks/create"
                        element={<CreateProjectView />}
                    />
                    <Route
                        path="/tasks/update/:id"
                        element={<UpdateTaskView />}
                    />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
