"use client";
import {useEffect, useRef, useState} from "react";
import locations from "@/locations";
import {useRouter} from "next/navigation";
import useLocationSearch from "@/hooks/useLocationSearch";

export default function EmployeeRegistrationPage() {
  const { locationInput, setLocationInput, filteredList, setFilteredList } = useLocationSearch(locations);
  const dropdownRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState([false, false, false, false]);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    location: '',
  })

  const router = useRouter();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredList([]);
      setLocationInput('');
    }
  };

  const handleChange = (e) => {
    setEmployeeData({...employeeData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBack = () => {
    router.back();
  }

  const handleLocationSelect = (location) => {
    setFilteredList([]);
    setLocationInput(location);
    setEmployeeData({...employeeData, location: location});
  };

  const handleSubmit = async () => {
    // check if any values are empty
    const emptyValues = [
      employeeData.first === '',
      employeeData.last === '',
      employeeData.email === '',
      employeeData.password === ''
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
    const emailCheck = employeeData.email.includes('@');
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
        email: employeeData.email,
        password: employeeData.password,
        first: employeeData.first,
        last: employeeData.last,
        location: employeeData.location,
        userType: 'employee',
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Employee Registration</h2>
        {internalError && (
          <div>
            {/*maybe also include a hyperlink to send a error report maybe only for beta testing have this*/}
            <p>An internal error has occurred please try again later</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first"
              value={employeeData.first}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isEmpty[0] && (
            <div>
              <p>first name field is mandatory</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last"
              value={employeeData.last}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isEmpty[1] && (
            <div>
              <p>last name field is mandatory</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isEmpty[2] && (
            <div>
              <p>email field is mandatory</p>
            </div>
          )}
          {invalidEmail && (
            <div>
              <p>email is not valid</p>
            </div>
          )}
          {emailExists && (
            <div>
              {/*want to also add hyperlink to the login route*/}
              <p>email is already in use login instead</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="text"
              name="password"
              value={employeeData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isEmpty[3] && (
            <div>
              <p>Password field is mandatory</p>
            </div>
          )}
          <div ref={dropdownRef}>
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
