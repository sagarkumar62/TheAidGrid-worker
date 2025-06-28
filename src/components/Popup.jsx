import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPhone,
  setEnteredOtp,
  reset,
  setLoggedIn,
  setGeneratedOtp,
} from '../store/reducers/otpSlice';
import Button from './Button';
import { toast } from 'react-toastify';

const Popup = ({ step, setStep, setShowPopup }) => {
  const dispatch = useDispatch();

  const phone = useSelector((state) => state.otp.phone);
  const generatedOtp = useSelector((state) => state.otp.generatedOtp);
  const enteredOtp = useSelector((state) => state.otp.enteredOtp);

  const handlePhoneSubmit = () => {
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    const otpGenerated = Math.floor(1000 + Math.random() * 9000).toString();
    dispatch(setGeneratedOtp(otpGenerated));
    setStep(2);
    toast.success(`OTP sent successfully! Check your phone for the code: ${otpGenerated}`, {
      position: "top-center",
      autoClose: 5000
    });
  };

  const handleOtpSubmit = () => {
    if (enteredOtp.length !== 4) {
      toast.error('Please enter a 4-digit OTP');
      return;
    }
    if (enteredOtp !== generatedOtp) {
      toast.error('Invalid OTP. Please try again.');
      return;
    }
    toast.success('Login successful! Welcome back!');
    dispatch(setLoggedIn(true));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('justLoggedIn', 'true');
    dispatch(reset());
    setShowPopup(false);
    setStep(1);
  };

  const handleCancel = () => {
    dispatch(reset());
    setShowPopup(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
        {step === 1 ? (
          <>
            <h2 className="text-lg font-semibold text-[#081F5C]">Enter Phone Number</h2>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                dispatch(setPhone(e.target.value.replace(/\D/g, '')))
              }
              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#081F5C]"
              maxLength={10}
            />
            <div className="flex justify-end space-x-3">
              <Button onClick={handleCancel} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Cancel</Button>
              <Button onClick={handlePhoneSubmit}>Send OTP</Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 border-t pt-3">
              Don't have an account?{' '}
              <a href="/worker-register" className="text-blue-600 hover:underline">Create a new account</a>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-[#081F5C]">Enter OTP</h2>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) =>
                dispatch(setEnteredOtp(e.target.value.replace(/\D/g, '')))
              }
              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#081F5C]"
              maxLength={4}
            />
            <div className="flex justify-end space-x-3">
              <Button onClick={handleCancel} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Cancel</Button>
              <Button onClick={handleOtpSubmit}>Submit</Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 border-t pt-3">
              Don't have an account?{' '}
              <a href="/worker-register" className="text-blue-600 hover:underline">Create a new account</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
