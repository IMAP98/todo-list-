import { getTaskById } from "@/api/TaskAPI";
import { UpdateTaskForm } from "@/components/tasks/UpdateTaskForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export const UpdateTaskView = () => {
    const params = useParams();
    const id = Number.parseInt(params.id!);

    let { data, isLoading, isError } = useQuery({
        queryKey: ["updateTask", id],
        queryFn: () => getTaskById(id),
        retry: false,
    });

    if (isLoading) return <p>Cargando...</p>;

    if (isError) return <Navigate to="/" />;

    if (data) return <UpdateTaskForm data={data} id={id} />;
};
