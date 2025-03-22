import React from 'react';
import Footer from '../components/Footer';

const AboutUs = () => {
    return (
        <>
        <div className="font-roboto bg-gradient-to-r from-gray-200 to-white text-gray-900">
            <div className="max-w-6xl mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
                {/* What is Setu */}
                <div className="my-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-blue-600 text-center md:text-left">What is Helping Bridge</h1>
                            <div className="w-24 h-1 bg-blue-600 my-4 mx-auto md:mx-0"></div>
                            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                                Welcome to Helping Bridge, a web-based application designed to connect people, organizations, and government bodies on a single platform for emergency assistance. 
                                Whether you need help or want to offer support during crises, Helping Bridge facilitates efficient and timely aid.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed text-justify mt-4">
                                Users can post emergency requests, offer resources, and coordinate efforts in real-time. Join Helping Bridge to be part of a proactive network dedicated to providing help during difficult times. Together, we can make a difference.
                            </p>
                            <h1 className="text-2xl font-semibold text-blue-600 mt-6 text-center">We HOPE, You never have to Use this Site...</h1>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <img 
                                src="https://i.ibb.co/Th9H2cY/Grey-Light-Blue-Minimalist-Family-Insurance-Logo.png" 
                                alt="Setu Logo" 
                                className="w-96 h-auto rounded-lg shadow-lg"
                                />
                        </div>
                    </div>
                </div>

                {/* Why Setu */}
                <div className="my-16">
                    <h1 className="text-4xl font-bold text-blue-600 text-center">Why Us?</h1>
                    <div className="w-24 h-1 bg-blue-600 my-4 mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {[
                            { title: "Safety Network", text: "Helping Bridge establishes a safety network where individuals facing emergencies can quickly connect with others who can provide assistance." },
                            { title: "Efficient Assistance", text: "By centralizing emergency requests and offers for help, Helping Bridge streamlines the process of seeking and providing assistance." },
                            { title: "Community Support", text: "Helping Bridge fosters a sense of community support by enabling individuals, organizations, and government bodies to come together in times of need." },
                            { title: "Verified Resources", text: "With a focus on verified users and resources, Helping Bridge ensures the credibility and reliability of assistance provided through the platform." }
                        ].map((item, index) => (
                            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-blue-600">{item.title}</h3>
                                <p className="text-gray-700 mt-2">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documents Section */}
                <div className="my-16 text-center">
                    <h1 className="text-4xl font-bold text-blue-600">Documents</h1>
                    <div className="w-24 h-1 bg-blue-600 my-4 mx-auto"></div>
                    <p className="text-lg text-gray-700">Coming Soon...</p>
                </div>
            </div>
            <Footer />
        </div>
                        </>
    );
};

export default AboutUs;
