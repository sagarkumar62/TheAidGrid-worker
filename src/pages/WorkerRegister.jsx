import React, { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const WorkerRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    const stepFields = {
      1: ['fullName', 'dob', 'gender', 'contact', 'address'],
      2: ['aadhaar', 'pan'],
      3: ['services', 'experience', 'availability', 'languages'],
      4: ['expectedCharges', 'pricingFlexibility'],
      5: ['certifications', 'references'],
      6: ['smartphone', 'assistant']
    };

    const missing = stepFields[step].filter((field) => !formData[field]);
    if (missing.length > 0) {
      alert(`Please fill all required fields: ${missing.join(', ')}`);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const requiredFields = [
      'fullName', 'dob', 'gender', 'contact', 'address',
      'aadhaar', 'pan',
      'services', 'experience', 'availability', 'languages',
      'expectedCharges', 'pricingFlexibility',
      'certifications', 'references',
      'smartphone', 'assistant',
    ];

    const missing = requiredFields.filter(field => !formData[field]);

    if (missing.length > 0) {
      alert(`Please fill all required fields: ${missing.join(', ')}`);
      return;
    }

    alert('Submitted Successfully');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Worker Registration</h2>

      {step === 1 && (
        <div className="space-y-4">
          <input type="text" name="fullName" onChange={handleChange} required placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
          <input type="date" name="dob" onChange={handleChange} required placeholder="Date of Birth" className="w-full border px-3 py-2 rounded" />
          <select name="gender" onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="text" name="contact" onChange={handleChange} required placeholder="Contact Number" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="address" onChange={handleChange} required placeholder="Address & Area" className="w-full border px-3 py-2 rounded" />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <input type="text" name="aadhaar" onChange={handleChange} required placeholder="Aadhaar Number" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="pan" onChange={handleChange} required placeholder="PAN or Voter ID" className="w-full border px-3 py-2 rounded" />
          <input type="file" name="policeVerification" required className="w-full border px-3 py-2 rounded" />
          <input type="file" name="photo" required className="w-full border px-3 py-2 rounded" />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <input type="text" name="services" onChange={handleChange} required placeholder="Type of Services (comma-separated)" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="experience" onChange={handleChange} required placeholder="Years of Experience" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="availability" onChange={handleChange} required placeholder="Availability (e.g., Mon–Fri, 9AM–6PM)" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="languages" onChange={handleChange} required placeholder="Languages Spoken" className="w-full border px-3 py-2 rounded" />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <input type="text" name="expectedCharges" onChange={handleChange} required placeholder="Expected Charges" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="pricingFlexibility" onChange={handleChange} required placeholder="Pricing Flexibility (Yes/No)" className="w-full border px-3 py-2 rounded" />
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <input type="text" name="certifications" onChange={handleChange} required placeholder="Certifications or Trainings (Optional)" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="references" onChange={handleChange} required placeholder="References (Name & Contact)" className="w-full border px-3 py-2 rounded" />
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
          <select name="smartphone" onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Do you use a smartphone?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <textarea name="assistant" onChange={handleChange} required placeholder="If not, who helps you?" className="w-full border px-3 py-2 rounded"></textarea>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <Button onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-black">Previous</Button>
        )}
        {step < 6 ? (
          <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">Submit</Button>
        )}
      </div>
    </div>
  );
};

export default WorkerRegister;
