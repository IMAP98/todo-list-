import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const AppLayout = () => {
    const { data, isError, isLoading } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("TODO_LIST_AUTH_TOKEN");
        queryClient.removeQueries({ queryKey: ["users"] });
        queryClient.removeQueries({ queryKey: ["tasks"] });
        navigate("/auth/login");
    };

    if (isLoading) return <p>Cargando...</p>;

    if (isError) {
        return <Navigate to="/auth/login" />;
    }

    if (data)
        return (
            <>
                <header className="bg-stone-900 py-5">
                    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                        invalidateQueries
                        <div className="w-25">
                            <Logo />
                        </div>
                        <button
                            className="block p-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors"
                            type="button"
                            onClick={logout}
                        >
                            {" "}
                            Cerrar sesión
                        </button>
                    </div>
                </header>
                <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                    <Outlet />
                </section>
                <footer className=" py-5">
                    <p className="text-center text-sm text-stone-600">
                        Todos los derechos reservados ©{" "}
                        {new Date().getFullYear()} Terminal Logistics
                    </p>
                </footer>
                <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
            </>
        );
};
