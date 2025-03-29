import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";
import Button from "./Button";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/disasters/all"; // Update backend URL

const MapPage = () => {
  const [filter, setFilter] = useState("all"); // Default filter
  const [disasterData, setDisasterData] = useState([]); // Store API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of Indian states
  const states = [
    "Maharashtra",
    "Telangana",
    "Uttar Pradesh",
    "Delhi",
    "Gujarat",
    "Goa",
    "Odisha",
    "Rajasthan",
    "Madhya Pradesh",
    "Bihar",
    "Assam",
    "Tamil Nadu",
    "Chhattisgarh",
    "Kerala",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Punjab",
    "Sikkim",
    "Tripura",
    "Uttarakhand",
    "West Bengal",
  ];

  // Fetch disaster alerts from API
  useEffect(() => {
    const fetchDisasters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        // Filter disasters based on selected state
        const filteredDisasters =
          filter === "all"
            ? data
            : data.filter((disaster) => disaster.state === filter);

        // Sort disasters alphabetically by state
        filteredDisasters.sort((a, b) => a.state.localeCompare(b.state));

        setDisasterData(filteredDisasters);
      } catch (error) {
        console.error("❌ Error fetching disasters:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDisasters();
  }, [filter]); // Runs when filter changes

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-gray-100 p-4 shadow-md flex gap-4 overflow-x-auto whitespace-nowrap">
        {/* Fixed "All India" Button */}
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md flex-shrink-0 ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-white border"
          }`}
        >
          All India
        </button>

        {/* Scrollable state buttons */}
        <div className="flex gap-4">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setFilter(state)}
              className={`px-4 py-2 rounded-md flex-shrink-0 ${
                filter === state ? "bg-blue-500 text-white" : "bg-white border"
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left - Map */}
        <div className="w-full md:w-2/3 h-[500px] md:h-screen">
          <MapContainer
            center={[22.9734, 78.6569]} // Centered at India
            zoom={5}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {disasterData
              .filter(
                (disaster) =>
                  disaster.location &&
                  typeof disaster.location.lat === "number" &&
                  typeof disaster.location.lng === "number"
              )
              .map((disaster) => (
                <Marker
                  key={disaster._id}
                  position={[disaster.location.lat, disaster.location.lng]}
                >
                  <Popup>
                    <strong>{disaster.type}</strong>
                    <p>{disaster.description || "No description available"}</p>
                    <p
                      className={`text-${
                        disaster.severity === "high" ? "red" : "yellow"
                      }-500 font-bold`}
                    >
                      {disaster.severity.toUpperCase()}
                    </p>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>

        {/* Right - List of Alerts */}

        <div className="w-full md:w-1/3 p-4 bg-gray-100 overflow-auto">
          {/* link to report disaster */}
          <Link
            className="flex items-center gap-2"
            rel="noopener noreferrer" // open in new tab or window
            to="/report"
          >
            <Button text="Report" className=" text-white  w-20px" />
            <Button
              text="Donate" //donate button not working properly
              className="  text-white  w-20px"
            />
          </Link>
          <h2 className="text-xl font-bold mb-4">Disaster Alerts</h2>

          {/* Loading/Error Messages */}
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display Disaster Alerts */}
          <div className="space-y-4">
            {disasterData.length > 0 ? (
              disasterData.map((disaster) => (
                <div
                  key={disaster._id}
                  className="p-4 rounded-lg shadow bg-white"
                >
                  <h3 className="text-lg font-semibold">{disaster.type}</h3>
                  <p className="text-sm text-gray-600">
                    {disaster.description || "No details provided"}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      disaster.severity === "high"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {disaster.severity.toUpperCase()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No alerts available</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default MapPage;
