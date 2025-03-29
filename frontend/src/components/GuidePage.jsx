import React, { useState } from 'react';
import EarthquakeGuide from './guidelines/EarthquakeGuide';
import FloodGuide from './guidelines/FloodGuide';
import FireGuide from './guidelines/FireGuide';
import StormGuide from './guidelines/StormGuide';

const GuidePage = () => {
    const [selectedDisaster, setSelectedDisaster] = useState('earthquake');

    const renderDisasterGuide = () => {
        switch (selectedDisaster) {
            case 'earthquake':
                return <EarthquakeGuide />;
            case 'flood':
                return <FloodGuide />;
            case 'fire':
                return <FireGuide />;
            case 'storm':
                return <StormGuide />;
            default:
                return <EarthquakeGuide />;
        }
    };

    return (
        <div className="w-full">
            {/* Sticky Disaster Selection Navbar */}
            <div className="sticky top-0 z-10 bg-[#1995AD] shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto py-4 space-x-4 hide-scrollbar">
                        {[
                            { id: 'earthquake', name: 'Earthquake', color: 'red' },
                        
                        
                        
                        
                            { id: 'flood', name: 'Flood', color: 'blue' },
                            { id: 'fire', name: 'Fire', color: 'orange' },
                            { id: 'storm', name: 'Storm', color: 'yellow' },
                        ].map((disaster) => (
                            <button
                                key={disaster.id}
                                onClick={() => setSelectedDisaster(disaster.id)}
                                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                                    selectedDisaster === disaster.id
                                    ? `bg-${disaster.color}-500 text-white shadow-lg`
                                    : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                                }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {/* Icons remain the same */}
                                    {disaster.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Disaster Guide */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderDisasterGuide()}
            </div>

            <style jsx>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default GuidePage;