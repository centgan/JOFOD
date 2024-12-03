"use client";

import React, {useState} from "react";

const PostingComponentTwo = ({formData, handleChange}) => {
  const [rows, setRows] = useState([{ id: 1, value1: '', value2: '' }]); // Initial state with one row

  // Add a new row
  const addRow = () => {
    // const converted = JSON.parse(formData.addition);
    // const newRow = {
    //   id: converted[converted.length - 1].id+1,
    //   value1:
    // }
    const newRow = {
      id: rows[rows.length-1].id+1, // Unique id based on timestamp
      value1: '',
      value2: '',
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  // Delete a specific row
  const deleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const localChange = (e, id) => {
    const {name, value} = e.target;
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === id ? {...row, [name]: value} : row
      );
      handleChange({target: {name:'addition', value: JSON.stringify(updatedRows)}});
      return updatedRows;
    });
    console.log(formData);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Job Posting</h1>

      {/* Dynamically Render Rows */}
      {rows.map((row) => (
        <div key={row.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* First Input Field (Question) */}
          <div>
            <label htmlFor={`value1-${row.id}`} className="block text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              id={`value1-${row.id}`}
              name="value1"
              value={row.value1}
              onChange={(e) => localChange(e, row.id)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter value"
            />
          </div>

          {/* Second Input Field (Input Type) */}
          <div>
            <label htmlFor={`value2-${row.id}`} className="block text-sm font-medium text-gray-700">Input type</label>
            <select
              id={`value2-${row.id}`}
              name="value2"
              value={row.value2}
              onChange={(e) => localChange(e, row.id)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select...</option>
              <option value="string">String</option>
              <option value="number">Number</option>
            </select>
          </div>

          {/* Delete Button for this row */}
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={() => deleteRow(row.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add Row Button */}
      <div className="flex justify-start mt-6">
        <button
          type="button"
          onClick={addRow}
          className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Row
        </button>
      </div>

      {/* Compensation, End Date, Post Type, and Template ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Compensation */}
        <div>
          <label htmlFor="compensation" className="block text-sm font-medium text-gray-700">Compensation</label>
          <input
            type="text"
            id="compensation"
            name="compensation"
            value={formData.compensation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter compensation"
          />
        </div>

        {/* End Date */}
        {formData.postType === "dead" && (
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {/* Post Type */}
        <div>
          <label htmlFor="postType" className="block text-sm font-medium text-gray-700">Post Type</label>
          <select
            id="postType"
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select...</option>
            <option value="roll">Rolling basis</option>
            <option value="dead">Hard Deadline</option>
          </select>
        </div>

        {/*/!* Template ID *!/*/}
        {/*<div>*/}
        {/*  <label htmlFor="templateID" className="block text-sm font-medium text-gray-700">Template ID</label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    id="templateID"*/}
        {/*    name="templateID"*/}
        {/*    value={templateID}*/}
        {/*    onChange={handleGlobalChange}*/}
        {/*    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
        {/*    placeholder="Enter Template ID"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default PostingComponentTwo;
