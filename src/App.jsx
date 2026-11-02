import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Loader, Navbar } from "./components/index.js";
import { getCurrentLoggedInUser, refreshAccessToken } from "./features/auth/authSlice.js";
const SplashScreen = lazy(() => import("./pages/getStarted/SplashScreen"));
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
    const [showSplash, setShowSplash] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, initialized } = useSelector((state) => state.auth);

    useEffect(() => {
        const splashShown = localStorage.getItem("splashScreenShown");

        if (splashShown) {
            setShowSplash(false);
        } else {
            setTimeout(() => {
                setShowSplash(false);
                localStorage.setItem("splashScreenShown", "true");
            }, 3000); // 3 seconds (adjust as needed)
        }

        // Initialize authentication on app load
        const initAuth = async () => {
            try {
                // First try to get current user (this will work if cookies are valid)
                await dispatch(getCurrentLoggedInUser()).unwrap();
            } catch (error) {
                // If getCurrentLoggedInUser fails, try to refresh the token
                try {
                    await dispatch(refreshAccessToken()).unwrap();
                    // If refresh succeeds, try to get user again
                    await dispatch(getCurrentLoggedInUser()).unwrap();
                } catch (refreshError) {
                    // Both failed, user is not authenticated
                    console.log("User not authenticated on app load");
                }
            }
        };

        // Only initialize auth if not already initialized (prevents duplicate calls)
        if (!initialized) {
            initAuth();
        }
    }, [dispatch, initialized]);

    return (
        <>
            {showSplash ? (
                <Suspense fallback={<Loader />}>
                    <SplashScreen />
                </Suspense>
            ) : (
                <div>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Navbar />
                    <Toaster />
                </div>
            )}
            <Analytics debug={import.meta.env.DEV} />
            <SpeedInsights route={location.pathname} />
        </>
    );
};

export default App;
