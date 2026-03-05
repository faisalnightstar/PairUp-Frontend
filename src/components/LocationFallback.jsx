import AddressAutocomplete from "./googlemaps/AddressAutocomplete";
const LocationFallback = ({
    error,
    showModal,
    setShowModal,
    selectedAddress,
    setSelectedAddress,
}) => (
    <>
        <p className="text-red-500 text-center mt-36">Location not found.</p>
        <div className="bg-gray-50 text-center py-4">
            <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
                Enter Address
            </button>
            {selectedAddress && (
                <p className="mt-4 text-lg text-gray-700">
                    Selected: {selectedAddress}
                </p>
            )}
            <AddressAutocomplete
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSelectAddress={(address) => setSelectedAddress(address)}
            />
        </div>
    </>
);

export default LocationFallback;
