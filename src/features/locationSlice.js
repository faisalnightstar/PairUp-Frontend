// src/features/location/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lat: null,
    lng: null,
    error: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
            state.error = null;
        },
        setLocationError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLocation, setLocationError } = locationSlice.actions;
export default locationSlice.reducer;
