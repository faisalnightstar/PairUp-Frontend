import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig.js";
import envConfig from "../../../conf/envConfiq.js";

export const fetchUserTripHistory = createAsyncThunk(
    "tripHistory/fetchUserTripHistory",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/me/trips`
            );
            return response.data.data; // Contains the array of trips
        } catch (error) {
            // Return a rejected value with the error message.
            return rejectWithValue(
                error.response?.data?.message ||
                    "Something went wrong while fetching trip history"
            );
        }
    }
);

const tripHistorySlice = createSlice({
    name: "tripHistory",
    initialState: {
        organizedTrips: [],
        participatedTrips: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTripHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserTripHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trips = action.payload;
            })
            .addCase(fetchUserTripHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default tripHistorySlice.reducer;
