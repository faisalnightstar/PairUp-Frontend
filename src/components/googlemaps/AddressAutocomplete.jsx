import React, { useContext, useEffect, useRef, useState } from "react";
import { LocationContext } from "../LocationProvider2";
const AddressAutocomplete = ({ isOpen, onClose, onSelectAddress }) => {
    const modalRef = useRef();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { setLocation } = useContext(LocationContext);

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    // Fetch suggestions from Photon
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(
                    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
                );
                const data = await res.json();
                const results = data.features.map((f) => ({
                    name: f.properties.name,
                    street: f.properties.street || "",
                    city: f.properties.city || f.properties.county || "",
                    state: f.properties.state || "",
                    postcode: f.properties.postcode || "",
                    country: f.properties.country || "",
                    full: `${f.properties.name || ""}, ${f.properties.city || f.properties.county || ""}, ${f.properties.state || ""}, ${f.properties.postcode || ""}, ${f.properties.country || ""}`,
                    coordinates: f.geometry.coordinates,
                }));
                setSuggestions(results);
            } catch (err) {
                console.error("Error fetching address suggestions:", err);
                setSuggestions([]);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleSelect = (place) => {
        const fullAddress = place.full;
        const [lng, lat] = place.coordinates;

        // Save to localStorage and update context
        setLocation({ latitude: lat, longitude: lng });
        localStorage.setItem("userAddress", fullAddress);
        localStorage.setItem(
            "userLocation",
            JSON.stringify({ latitude: lat, longitude: lng })
        );

        // Callback
        onSelectAddress(fullAddress);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute text-2xl md:text-5xl top-1 right-2 text-gray-400 hover:text-red-500"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    Enter Your Address
                </h2>

                <input
                    type="text"
                    placeholder="Search origin..."
                    className="w-full px-4 py-2 border border-gray-300  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="mt-4 max-h-60 overflow-y-auto">
                    {suggestions.length === 0 && query.length >= 3 ? (
                        <p className="text-gray-500 text-sm">
                            No suggestions found.
                        </p>
                    ) : (
                        suggestions.map((s, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelect(s)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                            >
                                {s.full}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressAutocomplete;
