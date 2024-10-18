const EmployerStep = ({ formData, handleChange, nextStep, prevStep, handleKeyPress }) => {
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
            <label className="block text-sm font-medium">Located</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default EmployerStep;
