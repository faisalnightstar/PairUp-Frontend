import React, { useEffect, useState } from 'react';
import { TripPostCard } from '../../components';

const SavedTrip = () => {
  const [savedTrips, setSavedTrips] = useState([]);
  console.log(savedTrips);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedTripsItems')) || [];
    setSavedTrips(saved);
  }, []);

  return (
    <div className="flex-grow mt-20 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
      <h2 className="text-2xl font-bold mb-6">Saved Trips</h2>
      {savedTrips.length === 0 ? (
        <p className="text-gray-500">No saved trips found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((tripItem) => (
            <TripPostCard
              tripItem={tripItem}
              key={tripItem._id}
            />
          ))

            // <div key={trip._id} className="bg-white rounded-xl shadow p-4 flex flex-col">
            //   <img
            //     src={trip.coverImage || 'https://res.cloudinary.com/pairup-connect/image/upload/f_auto,q_auto/No_image_available_afsl0y'}
            //     alt="cover"
            //     className="w-full h-40 object-cover rounded mb-3"
            //   />
            //   <h3 className="text-lg font-semibold mb-1">{trip.destination}</h3>
            //   <p className="text-xs text-gray-600 mb-2">{trip.description}</p>
            //   <span className="text-sm text-gray-500 mb-1">{trip.startDate} - {trip.endDate}</span>
            //   <span className="text-sm text-gray-500">{trip.participantCount} Joined</span>
            // </div>
          }
        </div>
      )}
    </div>
  );
};

export default SavedTrip;