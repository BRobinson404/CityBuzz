import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  useEffect(() => {
    // Set the component's state to the current value passed via props
    setNumber(currentNOE);
  }, [currentNOE]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    setCurrentNOE(value);
  }

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
}

export default NumberOfEvents;
