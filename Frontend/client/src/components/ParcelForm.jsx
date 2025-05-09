  // ParcelForm.jsx
  import React, { useState } from 'react';

  function ParcelForm({ onSubmit }) {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [weight, setWeight] = useState('');

    
    const handleSubmit = (e) => {
      e.preventDefault();
      const parcelData = {
        sender,
        receiver,
        pickupLocation,
        dropoffLocation,
        weight
      };
      onSubmit(parcelData); // Send data to parent component
      // Clear the form after submit
      setSender('');
      setReceiver('');
      setPickupLocation('');
      setDropoffLocation('');
      setWeight('');
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Send a Parcel</h2>
        <div>
          <label>Sender Name:</label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Receiver Name:</label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Pickup Location:</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Drop-off Location:</label>
          <input
            type="text"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Send Parcel</button>
      </form>
    );
  }

  export default ParcelForm;
