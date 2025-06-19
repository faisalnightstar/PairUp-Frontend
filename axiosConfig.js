// axiosConfig.js
import axios from "axios";
import store from "./src/store/store.js";
import {
    refreshAccessToken,
    clearAuthState,
} from "./src/features/auth/authSlice.js";

axios.defaults.withCredentials = true;

// Ensure cookies are sent with every request
const axiosInstance = axios.create({
    withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        console.error("Error while fetching data", error);
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            console.log("Refreshing access token...");

            try {
                // Dispatch the refreshAccessToken thunk
                const resultAction = await store.dispatch(refreshAccessToken());

                if (refreshAccessToken.fulfilled.match(resultAction)) {
                    console.log("Access token refreshed successfully");
                    return axiosInstance(originalRequest); // Retry the original request
                }
            } catch (err) {
                console.error("Failed to refresh access token", err);
                //       store.dispatch(clearAuthState()); // Log out user if refresh fails
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
