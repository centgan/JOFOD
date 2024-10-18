"use client";

import { useState, useEffect } from 'react';
import UserTypeForm from "@/app/register/user_type";
import EmployerStep from "@/app/register/employer";
import EmployeeStep from "@/app/register/employee";

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [usertype, setUsertype] = useState('');
  const [employerData, setEmployerData] = useState({
    name: '',
    email: '',
  });
  const [employeeData, setEmployeeData] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    keywords: '',
    location: '',
    terms: '',
    pitch: '',
    long_pitch: '',
    uni: '',
    degree_type: '',
    degree_name: '',
    study_year: '',
    grad_date: '',
  })

  const handleEmployeeChange = (e) => {
    setEmployeeData({...employeeData, [e.target.name]: e.target.value});
  };
  const handleEmployerChange = (e) => {
    setEmployerData({...employerData, [e.target.name]: e.target.value});
  }

  const nextStep = () => {
    if (step === 0 && usertype === 'Employee') {
      setStep(2);
    } else {
      // console.log((prev) => Math.min(prev + 1, steps.length -1));
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setUsertype('');
    if (step === 2) {
      setStep(0);
    } else {
      setStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (step === steps.length - 1) {
        handleSubmit();
      } else {
        nextStep();
      }
    }
  };

  useEffect(() => {
    if (usertype) {
      nextStep();
    }
  }, [usertype]);

  const handleSubmit = () => {
    console.log('Form submitted:', employerData);
  };

  const steps = [
    <UserTypeForm key="1" setUsertype={setUsertype} nextStep={nextStep} />,
    <EmployerStep key="2" formData={employerData} handleChange={handleEmployerChange} nextStep={nextStep} prevStep={prevStep} handleKeyPress={handleKeyPress} />,
    <EmployeeStep key="3" formData={employeeData} handleChange={handleEmployeeChange} nextStep={nextStep} prevStep={prevStep} handleKeyPress={handleKeyPress} />,
    // <Step4 key="2" formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} handleKeyPress={handleKeyPress} />,
    // <Step2 key="3" formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} handleKeyPress={handleKeyPress} />,
    // <Step3 key="4" formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} handleKeyPress={handleKeyPress} />,
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      {steps[step]}
    </div>
  );
}
