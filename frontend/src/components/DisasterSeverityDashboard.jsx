import React, { useState } from 'react';

const DisasterSeverityDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDisaster, setCurrentDisaster] = useState(null);

  const disasters = {
 
  };

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
      High: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-500",
        button: "bg-red-600 hover:bg-red-700",
        gradientFrom: "from-red-500",
        gradientTo: "to-red-300"
      },
      Medium: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-500",
        button: "bg-yellow-600 hover:bg-yellow-700",
        gradientFrom: "from-yellow-500",
        gradientTo: "to-yellow-300"
      },
      Low: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-500",
        button: "bg-green-600 hover:bg-green-700",
        gradientFrom: "from-green-500",
        gradientTo: "to-green-300"
      }
    };

    const style = severityStyles[disaster.severity];

    return (
      <div 
        className={`relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl ${
          disaster.floating ? 'animate-[floating_3s_ease-in-out_infinite]' : ''
        }`}
      >
        {/* Gradient top border */}
        <div 
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
            severityClass === 'high' ? 'from-red-500 to-yellow-500' :
            severityClass === 'medium' ? 'from-yellow-500 to-green-500' :
            'from-green-500 to-blue-500'
          }`}
        ></div>
        
        <div className="p-6 pt-8">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 ${style.bg} ${style.text} rounded-full text-sm font-semibold`}>
              {disaster.severity === 'High' ? 'CRITICAL' : disaster.severity === 'Medium' ? 'WARNING' : 'NOTICE'}
            </span>
            <span className="text-5xl">{disaster.emoji}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">{disaster.title}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${
              severityClass === 'high' ? 'text-red-500' :
              severityClass === 'medium' ? 'text-yellow-500' :
              'text-green-500'
            }`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{disaster.location}</span>
          </div>
          <p className="text-gray-700 mb-6">
            {disaster.severity === 'High' && disaster.type === 'Flood' 
              ? "Widespread flooding in low-lying areas, evacuation orders issued for several neighborhoods."
              : disaster.severity === 'High' && disaster.type === 'Volcano'
              ? "Major volcanic eruption with lava flows threatening residential areas. Immediate evacuation required."
              : disaster.severity === 'Medium'
              ? "Heavy thunderstorms with potential for flash flooding in low-lying areas."
              : "Localized flooding in some streets due to heavy rainfall. Avoid waterlogged areas."}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Reported: {disaster.reported}</span>
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
      High: {
        title: "text-red-600",
        subtitle: "text-red-400",
        iconBg: "from-red-600 to-red-400",
        iconContainer: "bg-red-100",
        borderGradient: "from-red-500 to-red-300",
        pulse: true
      },
      Medium: {
        title: "text-yellow-600",
        subtitle: "text-yellow-400",
        iconBg: "from-yellow-600 to-yellow-400",
        iconContainer: "bg-yellow-100",
        borderGradient: "from-yellow-500 to-yellow-300",
        pulse: false
      },
      Low: {
        title: "text-green-600",
        subtitle: "text-green-400",
        iconBg: "from-green-600 to-green-400",
        iconContainer: "bg-green-100",
        borderGradient: "from-green-500 to-green-300",
        pulse: false
      }
    };

    const style = sectionStyles[severity];
    const severityClass = severity.toLowerCase();

    return (
      <div className="mb-20 relative">
        <div className={`absolute -left-8 top-0 h-full w-2 bg-gradient-to-b ${style.borderGradient} rounded-full`}></div>
        <div className="flex items-center mb-8 pl-6">
          <div className={`p-2 rounded-full ${style.iconContainer} mr-4 shadow-lg`}>
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${style.iconBg} flex items-center justify-center text-white font-bold text-2xl shadow-lg ${
              style.pulse ? 'animate-[pulse_2s_infinite]' : ''
            }`}>
              {severity === 'High' ? '!!!' : severity === 'Medium' ? '!!' : '!'}
            </div>
          </div>
          <div>
            <h2 className={`text-4xl font-bold ${style.title}`}>{severity} Severity</h2>
            <p className={style.subtitle}>
              {severity === 'High' 
                ? "Life-threatening situations requiring immediate action" 
                : severity === 'Medium' 
                ? "Significant impact requiring caution and preparedness" 
                : "Minor incidents with localized impact"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-6">
          {disasters.map((disaster, index) => (
            <SeverityCard 
              key={index} 
              disaster={disaster} 
              severityClass={severityClass}
            />
          ))}
        </div>
      </div>
    );
  };

  const DisasterModal = () => {
    if (!currentDisaster) return null;

    const date = new Date(currentDisaster.timestamp);
    const formattedDate = date.toLocaleString();

    const severityStyles = {
      High: {
        bg: "bg-red-100",
        text: "text-red-800"
      },
      Medium: {
        bg: "bg-yellow-100",
        text: "text-yellow-800"
      },
      Low: {
        bg: "bg-green-100",
        text: "text-green-800"
      }
    };

    const style = severityStyles[currentDisaster.severity];

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        modalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
          onClick={closeModal}
        ></div>
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
          <button 
            onClick={closeModal} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{currentDisaster.title}</h2>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${style.bg} ${style.text}`}>
                      {currentDisaster.severity} Severity
                    </span>
                    <span className="text-gray-600">{currentDisaster.type}</span>
                  </div>
                </div>
                <span className="text-6xl">{currentDisaster.emoji}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
                  <p className="text-gray-900">{currentDisaster.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Coordinates: {currentDisaster.coordinates.lat}, {currentDisaster.coordinates.lng}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                  <p className="text-gray-900">{currentDisaster.status}</p>
                  <p className="text-sm text-gray-500 mt-1">Reported: {formattedDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Casualties</h3>
                  <p className="text-gray-900">{currentDisaster.casualties}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Description</h3>
                <p className="text-gray-700">{currentDisaster.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Recommended Actions</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {currentDisaster.actions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Emergency Contact</h3>
                  <p className="text-gray-700">{currentDisaster.contact}</p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Call Emergency Services
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  Interactive Map (requires API key)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 relative inline-block">
            <span className="relative z-10">Disaster Severity Dashboard</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200/50 z-0"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time monitoring of disaster incidents with severity classification and detailed information
          </p>
        </div>
        
        <SeveritySection severity="High" disasters={disasters.high} />
        <SeveritySection severity="Medium" disasters={disasters.medium} />
        <SeveritySection severity="Low" disasters={disasters.low} />
      </div>

      <DisasterModal />
    </div>
  );
};

export default DisasterSeverityDashboard;