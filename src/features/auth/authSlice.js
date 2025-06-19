import axios from "../../../axiosConfig.js";
import envConfig from "../../../conf/envConfiq";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//axios.defaults.withCredentials = true;

//Registration thunk: credentials { email, username, password }
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/register`,
                credentials
                // {
                //     headers: { "Content-Type": "multipart/form-data" },
                // }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Login thunk: credentials { email, username, password }
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            //sending data in backend
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/login`,
                credentials
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCurrentLoggedInUser = createAsyncThunk(
    "auth/getCurrentLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            // The backend endpoint is something like /api/v1/users/me
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/current-user`
            );

            return response.data.data; // Returns an object like { user: { ... } }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Refresh token thunk: expects the refresh token value
export const refreshAccessToken = createAsyncThunk(
    "auth/refreshAccessToken",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Refreshing aceess token...");
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/refresh-token`,
                {
                    withCredentials: true,
                }
            );
            console.log("Refresh Token Response:", response);
            return response;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Logout thunk: In many cases logout can be just a call to /logout endpoint
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/logout`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update profile picture
export const updateUserAvatar = createAsyncThunk(
    "auth/updateUserAvatar",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${envConfig.BaseUrl}/users/update-avatar`,
                credentials
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update profile details

export const updateProfileDetails = createAsyncThunk(
    "auth/updateProfileDetails",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${envConfig.BaseUrl}/users/update-account`,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    status: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    initialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.user;
        },

        // In addition to logout thunk, you can define a manual logout action
        clearAuthState(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
        },
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- Login User ---
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.isAuthenticated = true;
                // Extracting nested user data from response
                const { user } = action.payload.data;
                state.user = user;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

            // --- Fetch Authenticated User ---
            .addCase(getCurrentLoggedInUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(getCurrentLoggedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.isAuthenticated = true;
                state.initialized = true;
                state.user = action.payload;
            })
            .addCase(getCurrentLoggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.initialized = true;
                state.isAuthenticated = false;

                state.error = action.payload || "Failed to fetch user";
            })

            // --- Register User ---
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                // Optionally, auto-login the user after registration
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })

            // --- Refresh Access Token ---
            .addCase(refreshAccessToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.isAuthenticated = true;
                state.initialized = true;
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload || "Token refresh failed";
            })

            // --- Logout User ---
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.status = false;

                state.loading = false;
                state.error = null;
                state.isAuthenticated = false;
                state.initialized = false;
            })
            .addCase(updateUserAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.user = action.payload;
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    "Something went wrong while updating avatar";
            })
            .addCase(updateProfileDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.user = action.payload;
            })
            .addCase(updateProfileDetails.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    "Something went wrong while updating profile";
            });
    },
});

export const { clearAuthState, login, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
