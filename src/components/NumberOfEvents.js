import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  useEffect(() => {
    setNumber(currentNOE);
  }, [currentNOE]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
  
    // Check if the input is a valid positive number
    const isValidInput = !isNaN(value) && Number(value) > 0;
  
    // If the input is valid, update the component's state
    if (isValidInput) {
      setNumber(value);
      setCurrentNOE(value);
      setErrorAlert(""); // Reset the error alert
    } else {
      // If the input is not valid, clear the App component's state for the number of events
      setCurrentNOE("");
      setErrorAlert("This field must contain a positive number"); // Set the error alert message
    }
  };
  

  // We also need to update the component's state if the prop value changes.
  // Otherwise, the component won't update when the prop changes from outside.
  useEffect(() => {
    setNumber(currentNOE);
  }, [currentNOE]);

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
