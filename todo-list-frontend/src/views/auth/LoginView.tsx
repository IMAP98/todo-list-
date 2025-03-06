import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "@/store/authThunks";
import { useAppDispatch } from "@/hooks/useStore";

export const LoginView = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: UserLoginForm = {
        users_email: "",
        users_password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleLogin = async (formData: UserLoginForm) => {
        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate("/");
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Email</label>

                    <input
                        id="users_email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("users_email", {
                            required: "El Email es obligatorio",
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
                    <label className="font-normal text-2xl">Password</label>

                    <input
                        id="users_password"
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("users_password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.users_password && (
                        <ErrorMessage>
                            {errors.users_password.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-teal-500 hover:bg-teal-600 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/register"
                    className=" text-gray-100 font-normal text-center"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    );
};
