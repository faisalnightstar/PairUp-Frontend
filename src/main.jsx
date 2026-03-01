import "../axiosConfig.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy, Suspense } from "react";

const Discover = lazy(() => import("./pages/discover/Discover"));
const Home = lazy(() => import("./pages/home/Home"));
const LoginPage = lazy(() => import("./pages/auth/LoginForm.jsx"));
const MessagePage = lazy(() => import("./pages/message/MessagePage.jsx"));
const ProfilesDetails = lazy(() => import("./pages/profile/ProfilesDetails"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const TripForm = lazy(() => import("./pages/Post/TripForm"));
const UserProfile = lazy(() => import("./pages/users/UserProfile"));
const UpdateProfilePicture = lazy(
    () => import("./pages/users/UpdateProfilePicture")
);
const GetStarted = lazy(() => import("./pages/getStarted/GetStarted"));
const EditProfile = lazy(() => import("./pages/users/EditProfile"));
const ViewPostDetails = lazy(
    () => import("./pages/viewDeatails/trip/ViewPostDetails")
);
const ViewOtherUserDetails = lazy(
    () => import("./pages/users/ViewOtherUserDetails.jsx")
);
const SavedTrip = lazy(() => import("./pages/savedTrips/SavedTrip.jsx"));
import ProtectedRoute from "./components/ProtectedRoute.jsx";
//import LocationProvider from "./components/LocationProvider2.jsx";
import { LocationProvider } from "./components/LocationProvider.jsx";
import { meetingPoint } from "./pages/viewDeatails/trip/DetailSection.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Loader } from "./components/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/getstarted",
                element: <GetStarted />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },

            {
                path: "/discover",
                element: <Discover />,
            },
            {
                path: "/post-trip",
                element: (
                    <ProtectedRoute>
                        <TripForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: "view-post-details/:tripId",
                element: <ViewPostDetails />,
            },
            {
                path: "/msg",

                element: (
                    <ProtectedRoute>
                        <MessagePage />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",

                element: (
                    <ProtectedRoute>
                        <UserProfile />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/update-profile-picture",

                element: (
                    <ProtectedRoute>
                        <UpdateProfilePicture />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/edit-profile",

                element: (
                    <ProtectedRoute>
                        <EditProfile />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/user/:username",
                element: <ViewOtherUserDetails />,
            },
            {
                path: "/saved-trip",
                element: <SavedTrip />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <LocationProvider>
                    <Suspense fallback={<Loader />}>
                        <RouterProvider router={router} />
                    </Suspense>
                    <Analytics />
                    <SpeedInsights />
                </LocationProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);
