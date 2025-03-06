import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/TaskAPI";
import { useNavigate } from "react-router-dom";

export const DashboardView = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const navigate = useNavigate();

    if (isLoading) return <p>Cargando...</p>;

    if (isError) return <Navigate to="/auth/login" />;

    if (data)
        return (
            <>
                <h1 className="text-5xl font-black ">Mis tareas por hacer</h1>
                <p className="text-2xl font-light text-stone-600 mt-5">
                    Maneja tus tareas de manera rápida y eficiente.
                </p>

                <nav className="my-5">
                    <Link
                        to="/tasks/create"
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors"
                    >
                        Añadir tarea
                    </Link>
                </nav>
                {data.length ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                        {data
                            .filter((task) => task.tasks_completed === false)
                            .map((task) => (
                                <button
                                    key={task.tasks_id}
                                    className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-3 cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `/tasks/update/${task.tasks_id}`
                                        )
                                    }
                                >
                                    <h2 className="text-xl font-bold">
                                        {task.tasks_name}
                                    </h2>
                                </button>
                            ))}
                    </ul>
                ) : (
                    <p className="text-center py-20">
                        Aún hay tareas por hacer
                        <Link
                            className="text-teal-600"
                            to={"/tasks/create"}
                        ></Link>
                    </p>
                )}
                <h1 className="text-5xl font-black mt-10">
                    Mis tareas realizadas
                </h1>
                {data.length ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                        {data
                            .filter((task) => task.tasks_completed === true)
                            .map((task) => (
                                <button
                                    key={task.tasks_id}
                                    className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-3 cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `/tasks/update/${task.tasks_id}`
                                        )
                                    }
                                >
                                    <h2 className="text-xl font-bold">
                                        {task.tasks_name}
                                    </h2>
                                </button>
                            ))}
                    </ul>
                ) : (
                    <p className="text-center py-20">
                        Aún hay tareas por hacer
                        <Link
                            className="text-teal-600"
                            to={"/tasks/create"}
                        ></Link>
                    </p>
                )}
            </>
        );
};

export default DashboardView;
