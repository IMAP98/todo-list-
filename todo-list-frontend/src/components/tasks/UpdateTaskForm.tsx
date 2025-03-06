import { Link, useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { Task, TaskFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { DeleteTask } from "../DeleteTask";

type UpdateTaskFormProps = {
    data: TaskFormData;
    id: Task["tasks_id"];
};

export const UpdateTaskForm = ({ data, id }: UpdateTaskFormProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tasks_name: data.tasks_name,
            tasks_completed: data.tasks_completed,
        },
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({
                queryKey: ["updateTask", id],
            });
            toast.success(data);
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleForm = (formData: TaskFormData) => {
        const data = {
            formData,
            id,
        };
        mutate(data);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black ">Editar tarea</h1>
                <p className="text-2xl font-light text-stone-600 mt-5">
                    Llena el formulario para editar una nueva tarea.
                </p>

                <nav className="my-5 flex justify-between">
                    <Link
                        to="/"
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors"
                    >
                        Volver a mis tareas
                    </Link>
                    <DeleteTask id={id} />
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <TaskForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Guardar cambios"
                        className="bg-emerald-500 hover:bg-emerald-600 uppercase font-bold text-white p-3 w-full cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
};
