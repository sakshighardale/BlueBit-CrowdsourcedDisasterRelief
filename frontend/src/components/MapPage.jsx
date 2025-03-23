import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";

const API_URL = "http://localhost:5000/api/disasters/all"; // Update with your backend URL

const MapPage = () => {
  const [filter, setFilter] = useState("all"); // State filter
  const [disasterData, setDisasterData] = useState([]); // Store API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Sort disasters based on state name (if needed)
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
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 bg-gray-100 p-4 shadow-md">
        {["all", "Maharashtra", "Telangana", "Rajasthan"].map((state) => (
          <button
            key={state}
            onClick={() => setFilter(state)}
            className={`px-4 py-2 rounded-md ${
              filter === state ? "bg-blue-500 text-white" : "bg-white border"
            }`}
          >
            {state === "all" ? "All India" : state}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left - Map */}
        <div className="w-full md:w-2/3 h-[500px] md:h-screen">
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {disasterData.map((disaster) => (
              <Marker
                key={disaster._id}
                position={[disaster.lat, disaster.lng]}
              >
                <Popup>
                  <strong>{disaster.type}</strong>
                  <p>{disaster.details}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Right - List of Alerts */}
        <div className="w-full md:w-1/3 p-4 bg-gray-100 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Disaster Alerts</h2>

          {/* Loading/Error Messages */}
          {loading ? <p className="text-gray-500">Loading...</p> : null}
          {error ? <p className="text-red-500">{error}</p> : null}

          {/* Display Disaster Alerts */}
          <div className="space-y-4">
            {disasterData.length > 0 ? (
              disasterData.map((disaster) => (
                <div
                  key={disaster._id}
                  className="p-4 rounded-lg shadow bg-white"
                >
                  <h3 className="text-lg font-semibold">{disaster.type}</h3>
                  <p className="text-sm text-gray-600">{disaster.details}</p>
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
