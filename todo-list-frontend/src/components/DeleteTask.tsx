import { deleteTask } from "@/api/TaskAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Task } from "../types";
import { useNavigate } from "react-router-dom";

type DeleteTaskProps = {
    id: Task["tasks_id"];
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDelete = (tasks_id: number) => {
        mutate(tasks_id);
    };

    return (
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors"
            type="button"
            onClick={() => handleDelete(id)}
        >
            Eliminar tarea
        </button>
    );
};
