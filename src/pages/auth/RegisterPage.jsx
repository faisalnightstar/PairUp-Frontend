import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password", "");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (credentials) => {
        try {
            const resultAction = await dispatch(registerUser(credentials));

            // Check if the registration was successful using the thunk's fulfilled matcher.
            if (registerUser.fulfilled.match(resultAction)) {
                toast.success("Registration successful!");
                // Redirect to a dedicated page informing the user to check their email.
                navigate("/check-email-for-verification");
            } else {
                // If the thunk was rejected, handle the error.
                // The error message is now in `resultAction.payload`.
                const errorMessage =
                    resultAction.payload?.message ||
                    "Registration failed. Please try again.";
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="bg-surface max-w-lg mx-auto my-20 p-8 flex flex-col items-center rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center font-poppins text-text-primary">
                Create Your Account
            </h1>
            <p className="font-poppins text-text-muted text-center">
                Join us to make your life colorful.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full mt-4"
            >
                {/* Form Inputs with validation */}
                <div>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("fullName", {
                            required: "Full Name is required",
                        })}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register("phone", {
                            required: "Phone number is required",
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters long",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-semibold"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
            </form>
            <p className="font-roboto mt-4 text-text-secondary">
                Already have an account?
                <Link to="/login" className="text-primary hover:underline ml-1">
                    Log In
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
