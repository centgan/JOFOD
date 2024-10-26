"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import useLocationSearch from "@/hooks/useLocationSearch";
import locations from "@/locations";

export default function EmployerRegistrationPage() {
  const { locationInput, setLocationInput, filteredList, setFilteredList } = useLocationSearch(locations);
  const [isEmpty, setIsEmpty] = useState([false, false, false, false]);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const router = useRouter();
  const [employerData, setEmployerData] = useState({
    first: '',
    last: '',
    company: '',
    department: '',
    email: '',
    password: '',
    location: '',
    user: 'employer',
  });

  const handleChange = (e) => {
    setEmployerData({...employerData, [e.target.name]: e.target.value});
  }

  const handleBack = () => {
    router.back();
  }

  const handleSubmit = async () => {
    const emptyValues = [
      employerData.first === '',
      employerData.last === '',
      employerData.email === '',
      employerData.password === ''
    ]
    setIsEmpty(emptyValues);

    setInvalidEmail(false);
    setEmailExists(false);
    setInternalError(false);
    if (emptyValues.some(value => value)){
      console.log('fix issues');
      return;
    }
    //check if valid email
    const emailCheck = employerData.email.includes('@');
    setInvalidEmail(!emailCheck);
    if (!emailCheck) {
      console.log('fix email issue');
      return;
    }
    setInvalidEmail(false);
    // check if email account already exists is done by the api call
    const response = await fetch('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify({
        first: employerData.first,
        last: employerData.last,
        company: employerData.company,
        department: employerData.department,
        email: employerData.email,
        password: employerData.password,
        location: employerData.location,
        userType: 'employer',
      }),
    });
    if (response?.status === 409) {
      setEmailExists(true);
      console.log('email exists already');
      return;
    } else if (response?.status === 500) {
      setInternalError(true);
      console.log('internal error occurred');
      return;
    } else {
      //redirect
      setEmailExists(false);
      setInternalError(false);
    }
  }

  const handleLocationSelect = (location) => {
    console.log('clicked');
    setFilteredList([]);
    setLocationInput(location);
    setEmployerData({...employerData, location: location});
    console.log(employerData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Employee Registration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first"
              value={employerData.first}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last"
              value={employerData.last}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Company Name</label>
            <input
              type="text"
              name="company"
              value={employerData.company}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Department (optional)</label>
            <input
              type="text"
              name="department"
              value={employerData.department}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={employerData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="text"
              name="password"
              value={employerData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location (optional)</label>
            <input
              type="text"
              name="location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filteredList.length > 0 && (
              <ul
                className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-64 max-h-60 overflow-y-auto shadow-lg"
              >
                {filteredList.map((location, index) => (
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
            onClick={handleBack}
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  )
}
