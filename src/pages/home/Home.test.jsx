import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import { LocationContext } from '../../components/LocationProvider2';

// Mock MainHomeComponent (lazy loaded)
vi.mock('./MainHomeComponent', () => ({
    default: () => <div data-testid="main-home-component">MainHomeComponent</div>,
}));

// Mock LocationFallback
vi.mock('../../components/LocationFallback', () => ({
    default: ({ error }) => <div data-testid="location-fallback">LocationFallback {error && `Error: ${error}`}</div>,
}));

// Create a simple auth reducer
const authReducer = (state = { isAuthenticated: false, loading: false, initialized: true }) => state;

const renderWithProviders = (ui, { locationContextValue } = {}) => {
    const store = configureStore({
        reducer: { auth: authReducer },
    });
    return render(
        <Provider store={store}>
            <LocationContext.Provider value={locationContextValue}>
                {ui}
            </LocationContext.Provider>
        </Provider>
    );
};

describe('Home', () => {
    it('renders MainHomeComponent when location is available', () => {
        renderWithProviders(<Home />, {
            locationContextValue: { location: { lat: 1, lng: 2 }, error: null },
        });
        expect(screen.getByTestId('main-home-component')).toBeInTheDocument();
    });

    it('renders LocationFallback when location is not available', () => {
        renderWithProviders(<Home />, {
            locationContextValue: { location: null, error: 'No location' },
        });
        expect(screen.getByTestId('location-fallback')).toBeInTheDocument();
        expect(screen.getByText(/Error: No location/)).toBeInTheDocument();
    });
}); 