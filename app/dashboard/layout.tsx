import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="hover:bg-blue-700 p-2 rounded">Account</button>
          <button className="hover:bg-blue-700 p-2 rounded">Messages</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
