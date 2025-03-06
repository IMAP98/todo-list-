import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TaskForm from "@/components/tasks/TaskForm";
import { TaskFormData } from "@/types/index";
import { createTask } from "@/api/TaskAPI";
import { useMutation } from "@tanstack/react-query";

export const CreateProjectView = () => {
    const navigate = useNavigate();
    const initialValues: TaskFormData = {
        tasks_name: "",
        tasks_completed: false,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createTask,
        onSuccess: (data) => {
            toast.success(data);
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleForm = async (formData: TaskFormData) => mutate(formData);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black ">Crear tarea</h1>
                <p className="text-2xl font-light text-stone-600 mt-5">
                    Llena el formulario para crear una nueva tarea.
                </p>

                <nav className="my-5">
                    <Link
                        to="/"
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors"
                    >
                        Volver a mis tareas
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <TaskForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Crear"
                        className="bg-emerald-500 hover:bg-emerald-600 uppercase font-bold text-white p-3 w-full cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
};
