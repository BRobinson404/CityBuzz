import { useCallback, useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';


import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("")
  const [warningAlert, setWarningAlert] = useState("")

  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert(""); // Clear the warning alert when online
    } else {
      setWarningAlert("Offline Mode"); // Set a message when offline
    }
    fetchData();
  }, [currentCity, currentNOE, fetchData]);
  

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/>: null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/>: null}
        
      </div>
      <div>
      <CitySearch 
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        setWarningAlert={setWarningAlert} />
      </div>
      <div>
        <NumberOfEvents 
        currentNOE={currentNOE} 
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} />
      </div>
      <div>
        <EventList events={events} />
      </div>
    </div>
  );
}

export default App;
