import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        users_name: "",
        users_email: "",
        users_password: "",
        users_password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const password = watch("users_password");

    const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {""}
                <span className=" text-teal-500 font-bold">
                    {" "}
                    crear tu cuenta
                </span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("users_email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.users_email && (
                        <ErrorMessage>
                            {errors.users_email.message}
                        </ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("users_name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.users_name && (
                        <ErrorMessage>{errors.users_name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("users_password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message:
                                    "El Password debe ser mínimo de 8 caracteres",
                            },
                        })}
                    />
                    {errors.users_password && (
                        <ErrorMessage>
                            {errors.users_password.message}
                        </ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Repetir Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("users_password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: (value) =>
                                value === password ||
                                "Los Passwords no son iguales",
                        })}
                    />

                    {errors.users_password_confirmation && (
                        <ErrorMessage>
                            {errors.users_password_confirmation.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Registrarme"
                    className="bg-teal-500 hover:bg-teal-600 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/login"
                    className=" text-gray-100 font-normal text-center"
                >
                    ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>
            </nav>
        </>
    );
}
