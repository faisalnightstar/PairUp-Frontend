import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { Button, Input } from "../../components";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (credentials) => {
        try {
            const resultAction = await dispatch(loginUser(credentials));
            if (loginUser.fulfilled.match(resultAction)) {
                toast.success("Login successful!");
                navigate("/");
            } else {
                // Use a generic message for security, but handle specific cases if needed for UX.
                const errorMessage =
                    resultAction.payload?.message ||
                    "Login failed. Please try again.";

                // Avoid telling attackers if an email exists. Use generic error messages.
                if (
                    resultAction.payload?.statusCode === 404 ||
                    resultAction.payload?.statusCode === 401
                ) {
                    setError("root.serverError", {
                        type: "manual",
                        message: "Invalid email or password. Please try again.",
                    });
                } else if (
                    resultAction.payload?.message.includes("verify your email")
                ) {
                    setError("root.serverError", {
                        type: "manual",
                        message:
                            "Your account is not verified. Please check your email.",
                    });
                } else {
                    toast.error(errorMessage);
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="bg-surface max-w-md mx-auto space-y-8 my-20 p-8 rounded-lg shadow-md">
            <div className="flex space-y-3 flex-col items-center">
                <img src="/Logo1.svg" alt="PairUp Logo" className="h-18 w-xs" />
                <h1 className="text-4xl text-center font-bold font-roboto text-text-primary">
                    Welcome back!
                </h1>
                <p className="text-center text-sm font-roboto mt-2 text-text-muted">
                    Please sign in to your account.
                </p>
            </div>
            <form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {errors.root?.serverError && (
                    <p className="text-red-500 text-center text-sm mb-4">
                        {errors.root.serverError.message}
                    </p>
                )}
                <div className="relative">
                    <MdEmail
                        className="absolute left-3 top-3 text-text-muted"
                        size={16}
                    />
                    <Input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <MdLock
                        className="absolute left-3 top-3 text-text-muted"
                        size={16}
                    />
                    <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-text-muted focus:outline-none hover:text-text-secondary"
                    >
                        {showPassword ? (
                            <MdVisibilityOff size={16} />
                        ) : (
                            <MdVisibility size={16} />
                        )}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-text-muted rounded"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-text-secondary"
                        >
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-primary hover:opacity-90"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-semibold"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging In..." : "Log In"}
                </Button>
            </form>
            <p className="text-center mt-2 text-text-secondary">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-roboto hover:underline text-primary"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
