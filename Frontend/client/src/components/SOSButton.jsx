  // SOSButton.jsx
  import React from 'react';

  function SOSButton({ onSOSPress }) {
    const handleClick = () => {
      if (window.confirm('Are you sure you want to send an SOS alert?')) {
        onSOSPress(); // trigger the parent function (send alert, call API, etc.)
      }
    };

    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '12px 24px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        🚨 SOS
      </button>
    );
  }

  export default SOSButton;
