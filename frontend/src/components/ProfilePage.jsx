import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandHoldingHeart,
  FaPhone,
  FaEdit,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaSave,
  FaDonate,
  FaHandsHelping,
  FaShareAlt,
} from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

const ProfilePage = () => {
  // State for profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "@johndoe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    address: "123 Street, City, Country",
    donations: 15,
    socialMedia: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    profilePic: null, // Add profile picture to the profile state
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle social media input changes
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      socialMedia: {
        ...prevProfile.socialMedia,
        [name]: value,
      },
    }));
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: reader.result, // Save the image as a base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes and exit edit mode
  const handleSave = () => {
    setIsEditing(false);
    // Here you can add logic to save the updated profile to a backend or local storage
    console.log("Profile updated:", profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-6">
      <div className="w-full text-black max-w-3xl bg-white shadow-2xl rounded-3xl overflow-hidden p-8 border border-gray-700 transition-all duration-300">
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full flex justify-center items-center text-white text-4xl overflow-hidden">
            {profile.profilePic ? (
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser />
            )}
            {isEditing && (
              <label
                htmlFor="profile-pic"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black opacity-0 hover:opacity-100 cursor-pointer transition-opacity duration-300"
              >
                <FaEdit className="text-xl" />
                <input
                  type="file"
                  id="profile-pic"
                  className="hidden"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                />
              </label>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="text-3xl font-semibold text-black bg-transparent border-b border-gray-600 focus:outline-none"
              />
            ) : (
              <h2 className="text-3xl font-semibold text-black">
                {profile.name}
              </h2>
            )}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="text-gray-500 dark:text-gray-400 bg-transparent border-b border-gray-600 focus:outline-none"
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">{profile.username}</p>
            )}
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300"
          >
            {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 grid grid-cols-2 gap-6">
          <div className="flex items-center text-gray-800">
            <FaEnvelope className="text-blue-500 mr-3" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="bg-transparent border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="flex items-center text-gray-800 ">
            <FaPhone className="text-blue-500 mr-3" />
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="bg-transparent border-b border-gray-600 focus:outline-none"
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          <div className="flex items-center text-gray-800">
            <FaMapMarkerAlt className="text-blue-500 mr-3" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                className="bg-transparent border-b border-gray-600 focus:outline-none"
              />
            ) : (
              <span>{profile.address}</span>
            )}
          </div>
          <div className="flex items-center text-gray-800 ">
            <FaHandHoldingHeart className="text-blue-500 mr-3" />
            <span>Donations: {profile.donations}</span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800  mb-3">Donation Progress</h3>
          <ProgressBar now={60} label={`${60}%`} className="h-3" variant="success" />
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Social Media</h3>
          <div className="flex space-x-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="twitter"
                  value={profile.socialMedia.twitter}
                  onChange={handleSocialMediaChange}
                  className="bg-transparent border-b border-gray-600 focus:outline-none"
                />
                <input
                  type="text"
                  name="linkedin"
                  value={profile.socialMedia.linkedin}
                  onChange={handleSocialMediaChange}
                  className="bg-transparent border-b border-gray-800 focus:outline-none"
                />
                <input
                  type="text"
                  name="github"
                  value={profile.socialMedia.github}
                  onChange={handleSocialMediaChange}
                  className="bg-transparent border-b border-gray-800 focus:outline-none"
                />
              </>
            ) : (
              <>
                <a
                  href={profile.socialMedia.twitter}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href={profile.socialMedia.linkedin}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href={profile.socialMedia.github}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  <FaGithub className="text-2xl" />
                </a>
              </>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-white hover:shadow-lg transition-shadow duration-300 flex items-center">
              <FaDonate className="text-2xl mr-3" />
              <div>
                <p className="font-semibold">Donated $50 to Cyclone affected rescue mission</p>
                <p className="text-sm opacity-80">2 days ago</p>
              </div>
            </li>
            <li className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-lg text-white hover:shadow-lg transition-shadow duration-300 flex items-center">
              <FaHandsHelping className="text-2xl mr-3" />
              <div>
                <p className="font-semibold">Volunteered at Earchquake</p>
                <p className="text-sm opacity-80">5 days ago</p>
              </div>
            </li>
            <li className="bg-gradient-to-r from-green-500 to-lime-500 p-4 rounded-lg text-white hover:shadow-lg transition-shadow duration-300 flex items-center">
              <FaShareAlt className="text-2xl mr-3" />
              <div>
                <p className="font-semibold">Shared Campaign C</p>
                <p className="text-sm opacity-80">1 week ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;