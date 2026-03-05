import axios from "../../axiosConfig.js";
import envConfig from "../../conf/envConfiq.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    rating: [],
    loading: false,
    error: null,
};

export const fetchRating = createAsyncThunk(
    "review/fetchRatings",
    async (revieweeId, { rejectWithValue, getState }) => {
        try {
            const response = await axios.get(
                `${envConfig.BaseUrl}/reviews/user/${revieweeId}/ratings`
            );
            return response.data.data;
        } catch (error) {
            //console.error("Error in getRatings thunk:", error);
            const errorMessage = error.response?.data?.message || 
                               error.response?.data || 
                               error.message || 
                               "Failed to fetch ratings";
            return rejectWithValue(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        }
    }
);

const ratingSlice = createSlice({
    name: "ratings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRating.fulfilled, (state, action) => {
                state.loading = false;
                state.userRatings = action.payload; // Store the ratings data
            })
            .addCase(fetchRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ratingSlice.reducer;
