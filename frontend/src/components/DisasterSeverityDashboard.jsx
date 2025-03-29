import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/disasters/all";

const DisasterSeverityDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDisaster, setCurrentDisaster] = useState(null);
  const [disasterData, setDisasterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Group disasters by severity
  const disasters = {
    high: disasterData.filter((disaster) => disaster.severity === "high"),
    medium: disasterData.filter((disaster) => disaster.severity === "medium"),
    low: disasterData.filter((disaster) => disaster.severity === "low"),
  };

  // Fetch disaster alerts from API
  useEffect(() => {
    const fetchDisasters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Transform severity to lowercase if needed
        const normalizedData = data.map((disaster) => ({
          ...disaster,
          severity: disaster.severity.toLowerCase(),
        }));

        // Sort disasters alphabetically by state
        const sortedData = normalizedData.sort((a, b) =>
          (a.state || "").localeCompare(b.state || "")
        );

        setDisasterData(sortedData);
      } catch (error) {
        console.error("❌ Error fetching disasters:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  const openModal = (disaster) => {
    setCurrentDisaster(disaster);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentDisaster(null);
  };

  const SeverityCard = ({ disaster, severityClass }) => {
    const severityStyles = {
      high: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-500",
        button: "bg-red-600 hover:bg-red-700",
        emoji: "⚠️",
        status: "CRITICAL",
      },
      medium: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-500",
        button: "bg-yellow-600 hover:bg-yellow-700",
        emoji: "❗",
        status: "WARNING",
      },
      low: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-500",
        button: "bg-green-600 hover:bg-green-700",
        emoji: "ℹ️",
        status: "NOTICE",
      },
    };

    const style = severityStyles[disaster.severity] || severityStyles.medium;
    const date = new Date(disaster.createdAt || new Date());
    const formattedDate = date.toLocaleDateString();

    return (
      <div
        className={`severity-card bg-white rounded-xl overflow-hidden shadow-md border border-gray-100`}
      >
        <div className="p-6 pt-8">
          <div className="flex justify-between items-start mb-4">
            <span
              className={`px-3 py-1 ${style.bg} ${style.text} rounded-full text-sm font-semibold`}
            >
              {style.status}
            </span>
            <span className="text-5xl">{style.emoji}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3 capitalize">
            {disaster.type}
          </h3>
          <div className="flex items-center text-gray-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 mr-2 ${style.text}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{disaster.state || "Unknown location"}</span>
          </div>
          <p className="text-gray-700 mb-6">
            {disaster.description || "No description available."}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Reported: {formattedDate}
            </span>
            <button
              onClick={() => openModal(disaster)}
              className={`px-4 py-2 ${style.button} text-white rounded-lg font-medium transition-colors`}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SeveritySection = ({ severity, disasters }) => {
    const sectionStyles = {
      high: {
        bg: "from-red-500 to-red-300",
        title: "text-red-600",
        subtitle: "text-red-400",
        iconBg: "from-red-600 to-red-400",
        iconContainer: "bg-red-100",
      },
      medium: {
        bg: "from-yellow-500 to-yellow-300",
        title: "text-yellow-600",
        subtitle: "text-yellow-400",
        iconBg: "from-yellow-600 to-yellow-400",
        iconContainer: "bg-yellow-100",
      },
      low: {
        bg: "from-green-500 to-green-300",
        title: "text-green-600",
        subtitle: "text-green-400",
        iconBg: "from-green-600 to-green-400",
        iconContainer: "bg-green-100",
      },
    };

    const style = sectionStyles[severity] || sectionStyles.medium;

    // Don't render section if there are no disasters of this severity
    if (disasters.length === 0) return null;

    return (
      <div className="mb-20 relative">
        <div
          className={`absolute -left-8 top-0 h-full w-2 bg-gradient-to-b ${style.bg} rounded-full`}
        ></div>
        <div className="flex items-center mb-8 pl-6">
          <div
            className={`p-2 rounded-full ${style.iconContainer} mr-4 shadow-lg`}
          >
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                style.iconBg
              } flex items-center justify-center text-white font-bold text-2xl shadow-lg ${
                severity === "high" ? "pulse-animation" : ""
              }`}
            >
              {severity === "high" ? "!!!" : severity === "medium" ? "!!" : "!"}
            </div>
          </div>
          <div>
            <h2 className={`text-4xl font-bold ${style.title} capitalize`}>
              {severity} Severity
            </h2>
            <p className={style.subtitle}>
              {severity === "high"
                ? "Life-threatening situations requiring immediate action"
                : severity === "medium"
                ? "Significant impact requiring caution and preparedness"
                : "Minor incidents with localized impact"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-6">
          {disasters.map((disaster, index) => (
            <SeverityCard key={disaster._id || index} disaster={disaster} />
          ))}
        </div>
      </div>
    );
  };

  const DisasterModal = () => {
    if (!currentDisaster) return null;

    const date = new Date(currentDisaster.createdAt || new Date());
    const formattedDate = date.toLocaleString();

    const severityStyles = {
      high: {
        bg: "bg-red-100",
        text: "text-red-800",
      },
      medium: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
      },
      low: {
        bg: "bg-green-100",
        text: "text-green-800",
      },
    };

    const style =
      severityStyles[currentDisaster.severity] || severityStyles.medium;

    return (
      <div
        className={`modal fixed inset-0 z-50 flex items-center justify-center p-4 ${
          modalOpen ? "active" : ""
        }`}
      >
        <div
          className="modal-overlay absolute inset-0 bg-black bg-opacity-50"
          onClick={closeModal}
        ></div>
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 transform transition-all">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2 capitalize">
                    {currentDisaster.type}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${style.bg} ${style.text} capitalize`}
                    >
                      {currentDisaster.severity} severity
                    </span>
                    <span className="text-gray-600 capitalize">
                      {currentDisaster.state}
                    </span>
                  </div>
                </div>
                <span className="text-6xl">
                  {severityStyles[currentDisaster.severity]?.emoji || "⚠️"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
                  <p className="text-gray-900 capitalize">
                    {currentDisaster.state || "Unknown"}
                  </p>
                  {currentDisaster.location && (
                    <p className="text-sm text-gray-500 mt-1">
                      Coordinates: {currentDisaster.location.lat.toFixed(4)},{" "}
                      {currentDisaster.location.lng.toFixed(4)}
                    </p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Date</h3>
                  <p className="text-gray-900">{formattedDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Type</h3>
                  <p className="text-gray-900 capitalize">
                    {currentDisaster.type}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">
                  {currentDisaster.description ||
                    "No detailed description available."}
                </p>
              </div>

              {currentDisaster.imageUrl && (
                <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
                  <img
                    src={currentDisaster.imageUrl}
                    alt={currentDisaster.type}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading disaster data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 relative inline-block">
            <span className="relative z-10">Disaster Severity Dashboard</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200/50 z-0"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time monitoring of disaster incidents with severity
            classification
          </p>
          <div className="mt-6">
            <p className="text-gray-500">
              Showing {disasterData.length} total disasters:
              <span className="text-red-600 font-medium">
                {" "}
                {disasters.high.length} High
              </span>
              ,
              <span className="text-yellow-600 font-medium">
                {" "}
                {disasters.medium.length} Medium
              </span>
              ,
              <span className="text-green-600 font-medium">
                {" "}
                {disasters.low.length} Low
              </span>
            </p>
          </div>
        </div>

        <SeveritySection severity="high" disasters={disasters.high} />
        <SeveritySection severity="medium" disasters={disasters.medium} />
        <SeveritySection severity="low" disasters={disasters.low} />

        {disasterData.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-600 mb-2">
              No Disasters Reported
            </h2>
            <p className="text-gray-500">
              Currently there are no active disaster alerts.
            </p>
          </div>
        )}
      </div>

      <DisasterModal />
    </div>
  );
};

export default DisasterSeverityDashboard;
