import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

const DisasterForm = ({ location, loadingLocation, error }) => {
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !severity || !state) {
      alert("Please fill all required fields!");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("severity", severity);
    formData.append("state", state);
    formData.append("description", description);
    formData.append("location", JSON.stringify(location));
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/disasters/report",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert("Disaster reported successfully!");
      }
    } catch (error) {
      console.error("Error reporting disaster:", error);
      alert("Failed to report disaster.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Report Disaster</h1>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Location</h3>
          {loadingLocation ? (
            <p>Fetching location...</p>
          ) : location ? (
            <p className="text-sm text-blue-700">
              Latitude: {location.lat.toFixed(4)}, Longitude:{" "}
              {location.lng.toFixed(4)}
            </p>
          ) : (
            <p className="text-red-500">Location services disabled</p>
          )}
        </motion.div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Disaster Type *
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="flood">🌊 Flood</option>
            <option value="earthquake">🌍 Earthquake</option>
            <option value="fire">🔥 Fire</option>
            <option value="storm">⛈️ Storm</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity *
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="">Select Severity</option>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State *
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Delhi">Delhi</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg h-32"
            placeholder="Describe the situation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <div className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-sm text-gray-600">
              {imageFile ? imageFile.name : "Click to upload disaster image"}
            </p>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default DisasterForm;
