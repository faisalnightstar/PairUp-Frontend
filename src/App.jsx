import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "./components/index.js";
import { getCurrentLoggedInUser } from "./features/auth/authSlice.js";
import { SplashScreen } from "./pages/index.js";

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const dispatch = useDispatch();

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

        // Fetch authenticated user on app load
        dispatch(getCurrentLoggedInUser());
    }, [dispatch]);

    if (showSplash) {
        return <SplashScreen />; // Render the splash screen component
    }

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
}

export default App;
