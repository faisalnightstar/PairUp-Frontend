import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import { Loader } from "./components/index.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ErrorFallbackComponent from "./components/ErrorFallbackComponent.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import { LocationProvider } from "./components/LocationProvider2.jsx";
import "./index.css";
import "../axiosConfig.js";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";

// --- Lazy-loaded Route Components ---
const Home = lazy(() => import("./pages/home/Home"));
const TripList = lazy(() => import("./pages/discover/Discover")); // Renamed for clarity
const TripDetails = lazy(
    () => import("./pages/viewDeatails/trip/ViewPostDetails")
);
const NewTripForm = lazy(() => import("./pages/Post/TripForm"));
const UserProfile = lazy(() => import("./pages/users/UserProfile"));
const EditProfile = lazy(() => import("./pages/users/EditProfile"));
const UpdateAvatar = lazy(() => import("./pages/users/UpdateProfilePicture"));
const OtherUserDetails = lazy(
    () => import("./pages/users/ViewOtherUserDetails.jsx")
);
const SavedTrips = lazy(() => import("./pages/savedTrips/SavedTrip.jsx"));
const LoginPage = lazy(() => import("./pages/auth/LoginForm.jsx"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const GetStarted = lazy(() => import("./pages/getStarted/GetStarted.jsx"));
const EmailVerificationNotice = lazy(
    () => import("./pages/auth/EmailVerification.jsx")
);
const EmailVerificationPage = lazy(
    () => import("./pages/auth/EmailVerificationPage.jsx")
);
// New component for email verification
const MessagePage = lazy(() => import("./pages/message/MessagePage.jsx"));

// --- Route Protectors ---
const AuthProtectedRoute = lazy(
    () => import("./components/AuthProtectedRoute.jsx")
);
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        ),
        errorElement: <ErrorFallbackComponent />,
        children: [
            // --- General Routes ---
            { index: true, element: <Home /> }, // Home page
            { path: "/getstarted", element: <GetStarted /> },
            {
                path: "/login",
                element: (
                    // <AuthProtectedRoute>
                    <LoginPage />
                    // </AuthProtectedRoute>
                ),
            },
            {
                path: "/register",
                element: (
                    // <AuthProtectedRoute>
                    <RegisterPage />
                    // </AuthProtectedRoute>
                ),
            },
            {
                path: "/check-email-for-verification",
                element: <EmailVerificationNotice />,
            },
            {
                path: "/verify-email/:token",
                element: <EmailVerificationPage />,
            },

            // --- Trip Routes (RESTful) ---
            { path: "/discover", element: <TripList /> },
            {
                path: "/trips/new",
                element: (
                    // <ProtectedRoute>
                    <NewTripForm />
                    // </ProtectedRoute>
                ),
            },
            { path: "/trips/:tripId", element: <TripDetails /> },

            // --- User & Profile Routes (RESTful) ---
            {
                path: "/profile",
                element: (
                    // <ProtectedRoute>
                    <UserProfile />
                    //  </ProtectedRoute>
                ),
            },
            {
                path: "/profile/edit",
                element: (
                    //   <ProtectedRoute>
                    <EditProfile />
                    // </ProtectedRoute>
                ),
            },
            {
                path: "/profile/avatar",
                element: (
                    // <ProtectedRoute>
                    <UpdateAvatar />
                    // </ProtectedRoute>
                ),
            },
            { path: "/users/:username", element: <OtherUserDetails /> },

            // --- Other Protected Routes ---
            {
                path: "/messages",
                element: (
                    // <ProtectedRoute>
                    <MessagePage />
                    // </ProtectedRoute>
                ),
            },
            {
                path: "/saved-trip",
                element: (
                    // <ProtectedRoute>
                    <SavedTrips />
                    // </ProtectedRoute>
                ),
            },

            // --- Catch-all for 404 Not Found ---
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <LocationProvider>
                    <ErrorBoundary>
                        <Suspense fallback={<Loader />}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </ErrorBoundary>
                </LocationProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
