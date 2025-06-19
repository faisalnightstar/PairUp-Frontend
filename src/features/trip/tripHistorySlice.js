import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig.js";
import envConfig from "../../../conf/envConfiq.js";

// export const fetchUserTripHistory = createAsyncThunk(
//     "tripHistory/fetchUserTripHistory",
//     async ({ userId, page = 1, limit = 5, filters }, { rejectWithValue }) => {
//         try {
//             let query = `${envConfig.BaseUrl}/users/trips/trips-history/${userId}?page=${page}&limit=${limit}`;
//             if (filters?.category) query += `&category=${filters.category}`;
//             if (filters?.minBudget) query += `&minBudget=${filters.minBudget}`;
//             if (filters?.maxBudget) query += `&maxBudget=${filters.maxBudget}`;
//             if (filters?.startDate) query += `&startDate=${filters.startDate}`;
//             if (filters?.endDate) query += `&endDate=${filters.endDate}`;

//             const { data } = await axios.get(query);
//             return data.data;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response.data.message || "Something went wrong"
//             );
//         }
//     }
// );

export const fetchUserTripHistory = createAsyncThunk(
    "tripHistory/fetchUserTripHistory",
    async ({ userId }, { rejectWithValue }) => {
        try {
            // Make a GET request to the API endpoint.
            // Your API route should match: GET /api/trips/history/:userId
            const response = await axios.get(
                `${envConfig.BaseUrl}/users/trips/trips-history/${userId}`
            );

            // Assuming your API response is structured as: { status, data, message }
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
        // ... other state fields if needed
    },
    reducers: {
        // your synchronous reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTripHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserTripHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                // Here you might either combine organized and participated trips
                // or if your API already returns an array with trip objects having role & status, you can store them directly.
                // For example, store them all in one array:
                state.trips = action.payload;
            })
            .addCase(fetchUserTripHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default tripHistorySlice.reducer;

// const initialState = {
//     organizedTrips: [],
//     participatedTrips: [],
//     totalOrganized: 0,
//     totalParticipated: 0,
//     filters: {},
//     isLoading: false,
//     error: null,
//     currentPage: 1,
// };

// const tripHistorySlice = createSlice({
//     name: "tripHistory",
//     initialState,
//     reducers: {
//         setPage: (state, action) => {
//             state.currentPage = action.payload;
//         },
//         setFilters: (state, action) => {
//             state.filters = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserTripHistory.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUserTripHistory.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.organizedTrips = action.payload.organizedTrips;
//                 state.participatedTrips = action.payload.participatedTrips;
//                 state.totalOrganized = action.payload.totalOrganized;
//                 state.totalParticipated = action.payload.totalParticipated;
//             })
//             .addCase(fetchUserTripHistory.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { setPage, setFilters } = tripHistorySlice.actions;
// export default tripHistorySlice.reducer;
