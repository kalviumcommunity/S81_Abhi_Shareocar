  // RideList.jsx
  import React from 'react';

  function RideList({ rides }) {
    if (rides.length === 0) {
      return <p>No rides available yet.</p>;
    }

    return (
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2>Available Rides</h2>
        {rides.map((ride, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            padding: '16px',
            marginBottom: '12px',
            borderRadius: '8px'
          }}>
            <p><strong>From:</strong> {ride.pickupLocation}</p>
            <p><strong>To:</strong> {ride.dropoffLocation}</p>
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Time:</strong> {ride.time}</p>
            <p><strong>Seats Available:</strong> {ride.seatsAvailable}</p>
            <p><strong>Price per Seat:</strong> ${ride.pricePerSeat}</p>
          </div>
        ))}
      </div>
    );
  }

  export default RideList;
