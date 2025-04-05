import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import "./LocationSelector.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async () => {
    try {
      let response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      console.log("Response", response);
      const formatted = response.data.map((name) => ({
        key: name,
        value: name,
        label: name,
      }));
      setCountries(formatted);
    } catch (error) {
      console.log("Error Fetching Data : ", error);
    }
  };

  const fetchStates = async (selectedCountry) => {
    try {
      let response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      console.log("Response", response);
      const formatted = response.data.map((name) => ({
        key: name,
        value: name,
        label: name,
      }));

      setStates(formatted);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    } catch (error) {
      console.log("Error Fetching Data : ", error);
    }
  };
  const fetchCities = async (selectedCountry, selectedState) => {
    try {
      let response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      console.log("Response", response);
      const formatted = response.data.map((name) => ({
        key: name,
        value: name,
        label: name,
      }));

      setCities(formatted);
      setSelectedCity("");
    } catch (error) {
      console.log("Error Fetching Data : ", error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState);
    }
  }, [selectedState]);

  return (
    <div className="location-container">
      <h2>Select Location</h2>

      <div className="dropdown-row">
        <Dropdown
          items={countries}
          value={selectedCountry}
          placeholder="Select Country"
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="location-select"
        />
        <Dropdown
          items={states}
          value={selectedState}
          placeholder="Select State"
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          className="location-select"
        />
        <Dropdown
          items={cities}
          value={selectedCity}
          placeholder="Select City"
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          className="location-select"
        />
      </div>

      {selectedCity && (
        <p className="location-result">
          You selected <strong>{selectedCity}</strong>,{" "}
          <strong>{selectedState}</strong>, <strong>{selectedCountry}</strong>
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
