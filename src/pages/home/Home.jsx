import React, { useContext, useState, lazy, useEffect, Suspense } from "react";
import { Loader } from "../../components";
import { LocationContext } from "../../components/LocationProvider2";
import LocationFallback from "../../components/LocationFallback";
const MainHomeComponent = lazy(() => import("./MainHomeComponent"));

const ErrorBoundary = ({ children }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

const Home = () => {
    const { location, error } = useContext(LocationContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    useEffect(() => {
        const handleStorageChange = () => {
            const storedLocation = JSON.parse(
                localStorage.getItem("user_location")
            );
            if (storedLocation) {
                // trigger state update
                setLocationFromStorage(storedLocation);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    if (!location) {
        return (
            <LocationFallback
                error={error}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
            />
        );
    }

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
                <MainHomeComponent
                    location={location}
                    selectedAddress={selectedAddress}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setSelectedAddress={setSelectedAddress}
                />
            </Suspense>
        </ErrorBoundary>
    );
};

export default Home;
