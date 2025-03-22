import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";

// Dummy disaster data
const disasterData = [
    { id: 1, type: "Lightning", state: "Maharashtra", lat: 19.7515, lng: 75.7139, severity: "high", details: "Lightning & gusty winds in Chandrapur" },
    { id: 2, type: "Hailstorm", state: "Telangana", lat: 17.385, lng: 78.4867, severity: "medium", details: "Hailstorm & strong winds in Hyderabad" },
    { id: 3, type: "Pre-Fire Alert", state: "Rajasthan", lat: 26.8467, lng: 80.9462, severity: "high", details: "Pre-Fire alert in Rajasthan" },
];

const MapPage = () => {
    const [filter, setFilter] = useState("all"); // State for filter

    // Filter disaster alerts
    const filteredDisasters = filter === "all" ? disasterData : disasterData.filter(d => d.state === filter);

    return (
        <>
            {/* Top Filters */}
            <div className="flex justify-center gap-4 bg-gray-100 p-4 shadow-md">
                <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-white border"}`}>All India</button>
                <button onClick={() => setFilter("Maharashtra")} className={`px-4 py-2 rounded-md ${filter === "Maharashtra" ? "bg-blue-500 text-white" : "bg-white border"}`}>Maharashtra</button>
                <button onClick={() => setFilter("Telangana")} className={`px-4 py-2 rounded-md ${filter === "Telangana" ? "bg-blue-500 text-white" : "bg-white border"}`}>Telangana</button>
                <button onClick={() => setFilter("Rajasthan")} className={`px-4 py-2 rounded-md ${filter === "Rajasthan" ? "bg-blue-500 text-white" : "bg-white border"}`}>Rajasthan</button>
            </div>

            {/* Main Container */}
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left Side - Map */}
                <div className="w-full md:w-2/3 h-[500px] md:h-screen">
                    <MapContainer center={[22.9734, 78.6569]} zoom={5} className="h-full w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {filteredDisasters.map(disaster => (
                            <Marker key={disaster.id} position={[disaster.lat, disaster.lng]}>
                                <Popup>
                                    <strong>{disaster.type}</strong>
                                    <p>{disaster.details}</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* Right Side - Disaster Info List */}
                <div className="w-full md:w-1/3 p-4 bg-gray-100 overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Disaster Alerts</h2>
                    <div className="space-y-4">
                        {filteredDisasters.length > 0 ? (
                            filteredDisasters.map(disaster => (
                                <div key={disaster.id} className="p-4 rounded-lg shadow bg-white">
                                    <h3 className="text-lg font-semibold">{disaster.type}</h3>
                                    <p className="text-sm text-gray-600">{disaster.details}</p>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${disaster.severity === "high" ? "bg-red-500 text-white" : "bg-yellow-500 text-black"}`}>
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
