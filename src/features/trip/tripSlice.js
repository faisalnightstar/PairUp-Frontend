import axios from "../../../axiosConfig.js";
import envConfig from "../../../conf/envConfiq.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    trip: [],
    selectedTrip: null,
    tripHistories: [],
    loading: false,
    error: null,
};

export const createTrip = createAsyncThunk(
    "trip/createTrip",
    async (tripData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/trips/post-trip`,
                tripData
            );
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
);

export const allTrips = createAsyncThunk(
    "trip/allTrips",
    async ({ lat, lng, maxDistance }, { rejectWithValue }) => {
        try {
            console.log(
                ` In allTrips thunk lat: ${lat} lng: ${lng} maxDistance: ${maxDistance}`
            );
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/trips/all-trips`,
                {
                    params: { lat, lng, maxDistance },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const singleTrip = createAsyncThunk(
    "trip/singleTrip",
    async (tripId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/trips/view-trip/${tripId}`
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const joinTrip = createAsyncThunk(
    "trip/joinTrip",
    async (tripId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/trips/join-trip/${tripId}`
            );

            return response.data.data;
        } catch (error) {
            console.error("Error in joinTrip thunk:", error);
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const leaveTrip = createAsyncThunk(
    "trip/leaveTrip",
    async (tripId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/trips/leave-trip/${tripId}`
            );
            return response.data.data;
        } catch (error) {
            console.error("Error in leaveTrip thunk:", error);
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const tripsHistory = createAsyncThunk(
    "trip/tripsHistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/trips/trips-history/${tripId}`
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const tripSlice = createSlice({
    name: "trip",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.trip = action.payload;
            })
            .addCase(createTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(allTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.trip = action.payload; // Corrected: Use action.payload (response.data)
            })
            .addCase(allTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(singleTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(singleTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.selectedTrip = action.payload;
            })
            .addCase(singleTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(joinTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.selectedTrip = action.payload;
            })
            .addCase(joinTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(tripsHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tripsHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.tripHistories = action.payload;
            })
            .addCase(tripsHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default tripSlice.reducer;
