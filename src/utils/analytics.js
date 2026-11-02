import { track } from "@vercel/analytics";

/**
 * Standardized Analytics Event Names
 */
export const AnalyticsEvents = {
    // Authentication events
    AUTH_LOGIN: "auth_login",
    AUTH_REGISTER: "auth_register",
    AUTH_LOGOUT: "auth_logout",

    // Trip actions
    TRIP_VIEW: "trip_view",
    TRIP_CREATE: "trip_create",
    TRIP_JOIN: "trip_join",
    TRIP_SAVE: "trip_save",

    // Discovery & Search
    LOCATION_SEARCH: "location_search",
    CATEGORY_FILTER: "category_filter",

    // Errors & System
    APP_ERROR: "app_error",
};

/**
 * Dispatches a custom event to Vercel Analytics with optional metadata.
 * Logs events in development mode for easy verification.
 * Gracefully handles offline mode or client-side blockers.
 *
 * @param {string} eventName - Name of the event
 * @param {Record<string, string | number | boolean>} [properties] - Custom event payload
 */
export const trackEvent = (eventName, properties = {}) => {
    try {
        if (import.meta.env.DEV) {
            console.log(`[Vercel Analytics] Track: "${eventName}"`, properties);
        }
        track(eventName, properties);
    } catch (err) {
        if (import.meta.env.DEV) {
            console.warn(`[Vercel Analytics] Failed to track "${eventName}":`, err);
        }
    }
};

export default {
    trackEvent,
    AnalyticsEvents,
};

