import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainHomeComponent from './MainHomeComponent';
import { LocationContext } from '../../components/LocationProvider2';

// Mocks
vi.mock('../../components/Loader', () => ({ default: () => <div data-testid="loader">Loader</div> }));
vi.mock('../../components/Categories', () => ({ default: () => <div data-testid="categories">Categories</div> }));
vi.mock('../../components/googlemaps/AddressAutocomplete', () => ({
    default: ({ isOpen, onClose, onSelectAddress }) =>
        isOpen ? (
            <div data-testid="address-autocomplete">
                AddressAutocomplete
                <button onClick={() => { onSelectAddress('Test Address'); onClose(); }}>Select Address</button>
            </div>
        ) : null,
}));
vi.mock('../../components/categories/TripsCategories', () => ({ default: () => <div data-testid="trips-categories">TripsCategories</div> }));
vi.mock('../../components/TripPostCard', () => ({
    default: ({ tripItem }) => <div data-testid="trip-post-card">Trip: {tripItem._id}</div>,
}));

// Create simple reducers
const authReducer = (state = { isAuthenticated: false, loading: false, initialized: true }) => state;
const tripReducer = (state = {
    trip: [{ _id: '1' }, { _id: '2' }],
    loading: false,
    errorResponse: {},
    error: null,
}) => state;

const renderWithProviders = (ui, { reduxState, locationContextValue } = {}) => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
            trip: tripReducer
        },
        preloadedState: reduxState,
    });
    return render(
        <Provider store={store}>
            <LocationContext.Provider value={locationContextValue}>
                {ui}
            </LocationContext.Provider>
        </Provider>
    );
};

describe('MainHomeComponent', () => {
    it('shows loader when loading', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: { trip: [], loading: true, errorResponse: {}, error: null },
            },
            locationContextValue: { address: 'Test Address' },
        });
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('shows error message when error is present', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: { trip: [], loading: false, errorResponse: {}, error: 'Some error' },
            },
            locationContextValue: { address: 'Test Address' },
        });
        expect(screen.getByText(/Error: Some error/)).toBeInTheDocument();
    });

    it('shows 404 message and address UI when errorResponse is 404', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: { trip: [], loading: false, errorResponse: { status: 404 }, error: null },
            },
            locationContextValue: { address: 'Test Address' },
        });
        expect(screen.getByText(/No trips found near your location/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Trip Near:/ })).toBeInTheDocument();
    });

    it('shows no trips found message when trip is empty', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: { trip: [], loading: false, errorResponse: {}, error: null },
            },
            locationContextValue: { address: 'Test Address' },
        });
        expect(screen.getByText(/No trips found near your location/)).toBeInTheDocument();
    });

    it('renders trips and TripPostCard when trip data is present', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: {
                    trip: [{ _id: '1' }, { _id: '2' }],
                    loading: false,
                    errorResponse: {},
                    error: null,
                },
            },
            locationContextValue: { address: 'Test Address' },
        });
        expect(screen.getAllByTestId('trip-post-card')).toHaveLength(2);
    });

    it('renders Categories and TripsCategories', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: {
                    trip: [{ _id: '1' }],
                    loading: false,
                    errorResponse: {},
                    error: null,
                },
            },
            locationContextValue: { address: 'Test Address' },
        });
        expect(screen.getByTestId('categories')).toBeInTheDocument();
        expect(screen.getByTestId('trips-categories')).toBeInTheDocument();
    });

    it('opens AddressAutocomplete modal and selects address', () => {
        renderWithProviders(<MainHomeComponent location={{ latitude: 0, longitude: 0 }} />, {
            reduxState: {
                trip: { trip: [], loading: false, errorResponse: { status: 404 }, error: null },
            },
            locationContextValue: { address: 'Test Address' },
        });
        const button = screen.getByRole('button', { name: /Trip Near:/ });
        fireEvent.click(button);
        expect(screen.getByTestId('address-autocomplete')).toBeInTheDocument();
        // Simulate selecting address
        fireEvent.click(screen.getByText('Select Address'));
        expect(screen.queryByTestId('address-autocomplete')).not.toBeInTheDocument();
    });
}); 