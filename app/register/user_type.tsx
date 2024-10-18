const UserTypeForm = ({ setUsertype }) => {

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Step 1: Choose an option</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => setUsertype('Employee')}
          className={`w-48 h-16 rounded-lg text-lg font-semibold transition duration-200 hover:bg-blue-400 hover:text-white`}
        >
          Employee
        </button>
        <button
          onClick={() => setUsertype('Employer')}
          className={`w-48 h-16 rounded-lg text-lg font-semibold transition duration-200 hover:bg-blue-400 hover:text-white`}
        >
          Employer
        </button>
      </div>
    </div>
  );
};

export default UserTypeForm;
