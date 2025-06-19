import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { format } from "date-fns";

const TripHistoryCard = ({ trip, userId }) => {
    // Determine trip status
    const currentDate = new Date();
    const tripStartDate = new Date(trip?.startDate);
    const tripEndDate = new Date(trip?.endDate);

    let tripStatus = "Ongoing";
    if (tripEndDate < currentDate) {
        tripStatus = "Completed";
    } else if (trip?.isCancelled) {
        tripStatus = "Cancelled";
    }

    // Check if the user is the organizer or a participant
    const userRole =
        trip?.organizer?._id === userId ? "Organized" : "Participated";

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md w-64 transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {trip?.destination}
                    </h3>
                    <p className="text-gray-600 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-custom" />
                        {trip?.location}
                    </p>
                </div>
            </div>
            <img
                src={trip?.coverImage}
                alt={trip?.destination}
                className="w-fit h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                        <FaCalendarAlt className="mr-2 text-custom" />
                        {format(new Date(trip?.startDate), "MMM dd, yyyy")}
                    </span>
                    <span className="text-gray-600 flex items-center">
                        <FaUsers className="mr-2 text-custom" />
                        {trip?.participants?.length} Joined
                    </span>
                </div>

                {/* Status */}
                <p
                    className={`rounded-md text-center text-white p-1 ${
                        tripStatus === "Completed"
                            ? "bg-green-500"
                            : tripStatus === "Ongoing"
                              ? "bg-blue-500"
                              : "bg-red-500"
                    }`}
                >
                    {tripStatus}
                </p>

                {/* Role */}
                <p className="rounded-md bg-gray-200 text-center text-gray-800 p-1">
                    {userRole}
                </p>
            </div>
        </div>
    );
};

export default TripHistoryCard;
