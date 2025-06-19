import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CheckBox, Input } from "../../components";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileDetails } from "../../features/auth/authSlice";

const EditProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    // const { user } = location.state || {}; // Get the user object from the location state

    const { user, isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );

    // Redirect to login if not authenticated.
    useEffect(() => {
        // dispatch(getCurrentLoggedInUser());
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (loading) return <Loader />;
    if (!user) return <p>No user data found.</p>;

    //console.log("edit user: ", user);

    const methods = useForm({
        defaultValues: {
            username: user?.username,
            fullName: user?.fullName,
            email: user?.email,
            phone: user?.phone,
            travelPreference: user?.travelPreference || [],
            languages: user?.languages || [],
            address: user?.address,
        },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const travelPreferenceOptions = [
        { value: "adventure", label: "Adventure" },
        { value: "relaxation", label: "Relaxation" },
        { value: "cultural", label: "Cultural" },
        { value: "nature", label: "Nature" },
    ];

    const languageOptions = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "urdu", label: "Urdu" },
        { value: "bhojpuri", label: "Bhojpuri" },
        { value: "maithili", label: "Maithili" },
        { value: "bengali", label: "Bengali" },
        { value: "marathi", label: "Marathi" },
        { value: "punjabi", label: "Punjabi" },
        { value: "gujarati", label: "Gujarati" },
        { value: "telugu", label: "Telugu" },
        { value: "tamil", label: "Tamil" },
        { value: "kannada", label: "Kannada" },
        { value: "spanish", label: "Spanish" },
        { value: "french", label: "French" },
    ];

    const handleUpdateProfileForm = async (data) => {
        console.log("submitted data", data);
        try {
            const regResult = await dispatch(updateProfileDetails(data));
            console.log("Registration result:", regResult);
            if (
                updateProfileDetails.fulfilled.match(regResult) &&
                regResult.payload.statusCode === 201
            ) {
                navigate("/profile");
            }
        } catch (error) {
            console.log("Error while updating user:", error.message);
            console.log("Error response:", error.response);
            alert("An error occurred during update. Please try again later.");
        }
    };
    return (
        <main>
            <div className="max-w-md mx-auto space-y-12 mt-20 bg-white p-8 rounded-lg shadow-md">
                <div className="flex space-y-3 flex-col items-center">
                    <h1 className="text-2xl font-bold text-center font-poppins">
                        Update Your Details
                    </h1>
                    <p className="text-paragraph-color text-center text-sm font-roboto mt-2">
                        Please fill in the information below to update your
                        profile.
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleUpdateProfileForm)}>
                        <div>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                {...methods.register("fullName", {
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
                                {...methods.register("email", {
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
                                {...methods.register("phone", {
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
                                {...methods.register("username", {
                                    required: "Username is required",
                                })}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <CheckBox
                            label="Travel Preferences:"
                            name="travelPreference"
                            options={travelPreferenceOptions}
                        />

                        <CheckBox
                            label="Languages:"
                            name="languages"
                            options={languageOptions}
                        />

                        <div>
                            <Input
                                label="Address"
                                type="text"
                                autoComplete="username"
                                placeholder="Enter your address"
                                {...methods.register("address")}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        <button
                            className="bg-button-color w-full px-8 py-2 shadow-black shadow-sm rounded-full text-white  text-xl mt-4 hover:cursor-pointer hover:bg-button-color-hover"
                            type="submit"
                        >
                            Update Profile
                        </button>
                    </form>
                </FormProvider>
            </div>
        </main>
    );
};

export default EditProfile;
