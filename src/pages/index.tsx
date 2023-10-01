import React, { useEffect, useState } from "react";
import Map from "./map";

export default function Homepage() {
  const [locationText, setLocationText] = useState(""); // Initialize state for location text
  const [errMessage, setErrMessage] = useState("")
  const [lat, setLat] = useState(25.033493);
  const [lng, setLng] = useState(121.564101);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setLocationText("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position: GeolocationPosition) {
    setLocationText(
      "Latitude: " +
        position.coords.latitude + "\n" +
      ", Longitude: " +
        position.coords.longitude +
      ", Accuracy: " +
        position.coords.accuracy
    );
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }
  function showError(error: GeolocationPositionError) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setErrMessage("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        setErrMessage("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        setErrMessage("The request to get user location timed out.")
        break;
      default:
        setErrMessage("An unknown error occurred.")
        break;
    }
  }


  return (
    <div className="ml-6 mt-6">
      <h2>JavaScript Geolocation API</h2>
      <p>Click the button to get your coordinates.</p>
      <button type="button" className="btn btn-primary" onClick={getLocation}>
        Try It
      </button>
      <br/><br/>
      <div>{locationText}</div><br/>
      <div>{errMessage}</div>
      <Map lat={lat} lng={lng}/>
    </div>
  );
}

