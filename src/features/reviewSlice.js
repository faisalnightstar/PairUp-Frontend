import axios from "../../axiosConfig.js";
import envConfig from "../../conf/envConfiq.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    review: [],
    loading: false,
    error: null,
};

export const createReview = createAsyncThunk(
    "review/createReview",
    async ({ reviewData, revieweeId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${envConfig.BaseUrl}/users/post-review/${revieweeId}`,
                reviewData
            );
            return response.data.data;
        } catch (error) {
            console.error("Error in createReview thunk:", error);
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data); // Return API error
            } else {
                return rejectWithValue({
                    message:
                        error.message ||
                        "Network error: Failed to create review",
                }); // Return network error
            }
        }
    }
);

export const fetchReviews = createAsyncThunk(
    "review/fetchedReviews",
    async (revieweeId, { rejectWithValue }) => {
        try {
            let url;
            if (revieweeId) {
                url = `${envConfig.BaseUrl}/users/all-reviews/${revieweeId}`;
            } else {
                url = `${envConfig.BaseUrl}/users/all-reviews`;
            }
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            //console.error("Error in getReviews thunk:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.review = action.payload;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.fetchedReviews = action.payload; // Store the ratings data
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;
