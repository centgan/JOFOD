"use client";

import {useEffect, useRef, useState} from "react";
import locations from "@/locations";

const EmployeeStep = ({ formData, handleChange, nextStep, prevStep, handleKeyPress }) => {
  const [filtered, setFiltered] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFiltered([]); // Hide dropdown
    }
  };

  // const handleClickOn = (e) => {
  //   if ()
  // }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    if (value) {
      const filtered = locations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filtered);
    } else {
      setFiltered([]);
    }
  };

  // useEffect(() => {
  //   if (locationInput) {
  //     const filtered = locations.filter(locationInput =>
  //       locationInput.toLowerCase().includes(formData.locationInput.toLowerCase())
  //     );
  //     setFiltered(filtered);
  //   } else {
  //     setFiltered([]);
  //   }
  // }, [locationInput])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    // document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    setLocationInput(location);
    setFiltered([]);
    const syntheticEvent = {
      target: {
        name: 'location', // The property name you want to set
        value: location,  // The selected locationInput
      },
    };
    handleChange(syntheticEvent);
    setFiltered([]); // Clear suggestions
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">User Registration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first"
              value={formData.first}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last"
              value={formData.last}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Keywords (optional)</label>
            <textarea
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter keywords (comma separated)"
              rows="3"
            />
          </div>
          <div ref={dropdownRef}>
            <label className="block text-sm font-medium mb-2">Location (optional)</label>
            <input
              type="text"
              name="location"
              value={locationInput}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filtered.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-64 max-h-60 overflow-y-auto shadow-lg"
              >
                {filtered.map((location, index) => (
                  <li
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            onKeyDown={handleKeyPress}
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStep;
