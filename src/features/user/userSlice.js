import axios from "../../../axiosConfig.js";
import envConfig from "../../../conf/envConfiq.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    user: null,
    loading: false,
    error: null,
    initialized: false,
};

export const otherUser = createAsyncThunk(
    "user/otherUser",
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/find/find-user/${username}`
            );
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(otherUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(otherUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.initialized = true;
            })
            .addCase(otherUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
