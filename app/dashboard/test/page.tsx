"use client";
import {useState} from "react";
import Select, {SingleValue} from "react-select";

interface OptionType {
  value: string
  label: string
}

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const AddEmployer = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null)
  const handleChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected)
  }
  return (
    <div>
      This is employer
      <Select
        value={selectedOption}          // Set the current selected value
        onChange={handleChange}          // Handle the change event
        options={options}                // Pass the options to react-select
        className="mt-2"                 // Optional styling with Tailwind
        placeholder="Select a flavor"    // Placeholder text
      />
    </div>
  )
}

export default AddEmployer;
