// Signup.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../features/auth/authSlice";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Watch password for confirm password validation
    const password = watch("password", "");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (credentials) => {
        console.log("Signup data:", credentials);

        try {
            // Dispatch the registration thunk
            const regResult = await dispatch(registerUser(credentials));
            console.log("Registration result:", regResult);
            if (
                registerUser.fulfilled.match(regResult) &&
                regResult.payload.statusCode === 201
            ) {
                //navigate("/login");
                // If registration was successful, dispatch login using the same credentials.
                alert("Registration successful.");
                const loginResult = await dispatch(
                    loginUser({
                        // Use the same credentials or a subset required for login
                        email: credentials.email,
                        password: credentials.password,
                    })
                );
                console.log("Login result:", loginResult);

                if (loginUser.fulfilled.match(loginResult)) {
                    // If login was successful, navigate to the home page
                    navigate("/");
                } else {
                    // Handle login failure if needed
                    console.error("Login failed after registration");
                }
            }

            // Handle registration failure if needed
            else if (regResult.payload.status === 401) {
                alert(
                    "User already registered using this email, username or phone."
                );
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto my-20 bg-white p-8 flex flex-col items-center rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center font-poppins">
                Create Your Account
            </h1>
            <p className="font-poppins text-paragraph-color text-center">
                Join us to make colorful your life.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full"
            >
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
                        autoComplete="email"
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
                        autoComplete="tel"
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
                        autoComplete="username"
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
                        autoComplete="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
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
                        autoComplete="password"
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

                <button
                    type="submit"
                    className="bg-button-color w-full px-8 py-2 shadow-black shadow-sm rounded-full text-white  text-xl mt-4 hover:cursor-pointer hover:bg-button-color-hover"
                >
                    Sign Up
                </button>
            </form>
            <p className="font-roboto mt-4">
                Already have account?
                <Link
                    to="/login"
                    className="text-button-color font-roboto hover:text-button-color-hover"
                >
                    {" "}
                    Log In
                </Link>
            </p>
            <div className="flex flex-row items-center space-x-8 mt-2 ">
                <div className="flex flex-row items-center space-x-2 ">
                    <img src="SecureConnection.svg" alt="" />
                    <p>Secure Connection</p>
                </div>
                <div className="flex flex-row items-center space-x-2 ">
                    <img src="SSLEncrypted.svg" alt="" />
                    <p>SSL Encrypted</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
