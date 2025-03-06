import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { TaskFormData } from "types";

type TaskFormProps = {
    register: UseFormRegister<TaskFormData>;
    errors: FieldErrors<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="tasks_name"
                    className="text-sm uppercase font-bold"
                >
                    Nombre de la tarea
                </label>
                <input
                    id="tasks_name"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre de la tarea"
                    {...register("tasks_name", {
                        required: "El Titulo de la tarea es obligatorio",
                    })}
                />

                {errors.tasks_name && (
                    <ErrorMessage>{errors.tasks_name.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label
                    htmlFor="tasks_completed"
                    className="text-sm uppercase font-bold"
                >
                    ¿Deseas marcar esta tarea como completada?
                </label>
                <input
                    id="tasks_completed"
                    className="w-full p-3  border border-gray-200"
                    type="checkbox"
                    {...register("tasks_completed")}
                />

                {errors.tasks_completed && (
                    <ErrorMessage>
                        {errors.tasks_completed.message}
                    </ErrorMessage>
                )}
            </div>
        </>
    );
}
