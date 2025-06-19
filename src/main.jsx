import "../axiosConfig.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
    Discover,
    Home,
    LoginPage,
    MessagePage,
    ProfilesDetails,
    RegisterPage,
    TripForm,
    UserProfile,
    UpdateProfilePicture,
    GetStarted,
    EditProfile,
    ViewPostDetails,
    ViewOtherUserDetails,
} from "./pages/index.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
//import LocationProvider from "./components/LocationProvider2.jsx";
import { LocationProvider } from "./components/LocationProvider.jsx";
import { meetingPoint } from "./pages/viewDeatails/trip/DetailSection.jsx";

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
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <LocationProvider>
                <RouterProvider router={router} />
            </LocationProvider>
            {/* </PersistGate> */}
        </Provider>
    </StrictMode>
);
