import React, { useState } from "react";
import WorkerNavbar from "../components/WorkerNavbar";
import SOSButton from "../components/SOSButton";
import WorkerMapComponent from "../components/WorkerMapComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, IndianRupee } from 'lucide-react';

const WorkerDashBoard = () => {
  const navigate = useNavigate();
  const [online, setOnline] = useState(false);
  const [jobAccepted, setJobAccepted] = useState(false);
  const loggedIn = useSelector((state) => state.otp.loggedIn);
  const [currentLocation, setCurrentLocation] = useState(null);

  const worker = {
    name: "Sunita Devi",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.9,
    jobsCompleted: 120,
    experience: "3+ years",
    department: "Housekeeping",
    languages: ["Hindi", "English"],
    availableSlots: "Mon–Fri, 10 AM – 5 PM",
    verified: true,
    gender: "Female",
    certifications: ["COVID Safety Certified", "Housekeeping Level 2"],
  };

  const liveJob = {
    id: "JOB78910",
    title: "House Cleaning",
    customerName: "John Doe",
    location: "Sector 62, Noida",
    date: "2025-06-09",
    time: "10:15 AM",
    duration: "2 hours",
    price: 350,
    description: "Regular house cleaning including dusting, mopping, and bathroom cleaning",
    status: "Pending"
  };

  const earnings = {
    today: 1450,
    weekly: 9600,
    walletBalance: 3500,
  };

  const jobLocation = {
    lat: 28.6270, // Replace with actual job coordinates
    lng: 77.1761, // Replace with actual job coordinates
  };

  const handleAccept = () => {
    alert("Job Accepted");
    setJobAccepted(true);
  };

  const handleReject = () => {
    alert("Job Rejected");
    setJobAccepted(false);
  };

  const handleEarningsClick = () => {
    navigate("/earnings");
  };

  const handleLocationUpdate = (location) => {
    setCurrentLocation(location);
    // You can send this to your backend to update worker's location
    console.log('Worker location updated:', location);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      <WorkerNavbar />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION - WORKER PROFILE AND MAP */}
        <div className="flex-1 space-y-6">
          {/* Worker Profile Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800">👩 Worker Profile</h2>
              <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-md shadow-inner">
                <img
                  src={worker.profilePicture}
                  alt={worker.name}
                  className="rounded-full w-20 h-20 object-cover border"
                />
                <div className="text-gray-700 space-y-1">
                  <h3 className="font-semibold text-lg text-gray-800">{worker.name}</h3>
                  <p>⭐ {worker.rating} | {worker.jobsCompleted} jobs done</p>
                  <p>Experience: {worker.experience}</p>
                  <p>Department: {worker.department}</p>
                  <p>Languages: {worker.languages.join(", ")}</p>
                  <p>Available: {worker.availableSlots}</p>
                  <p>Gender: {worker.gender}</p>
                  <p>
                    Certifications:{" "}
                    {worker.certifications.length > 0 ? worker.certifications.join(", ") : "None"}
                  </p>
                  {worker.verified && (
                    <span className="text-green-600 font-medium">✔ Verified</span>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Map Section */}
          {online && (
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">📍 Location Tracking</h2>
              <WorkerMapComponent 
                jobLocation={jobAccepted ? jobLocation : null}
                onLocationUpdate={handleLocationUpdate}
              />
            </div>
          )}

          {/* Earnings Summary Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800">📊 Earnings Summary</h2>
              <div 
                onClick={handleEarningsClick}
                className="bg-gray-50 p-4 rounded-md shadow-inner space-y-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <p><strong>Today:</strong> ₹{earnings.today}</p>
                <p><strong>This Week:</strong> ₹{earnings.weekly}</p>
                <p><strong>Wallet Balance:</strong> ₹{earnings.walletBalance}</p>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT SECTION - LIVE JOB + ONLINE TOGGLE */}
        <div className="w-full lg:w-[35%] bg-white shadow-md rounded-xl p-6 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800">📱 Status</h2>
            <button
              onClick={() => setOnline(!online)}
              className={`w-full py-3 rounded-md text-white font-semibold transition ${
                online ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {online ? "Go Offline" : "Go Online"}
            </button>
            <p className="mt-2 text-center text-gray-600">
              You are currently <strong>{online ? "Online" : "Offline"}</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800">🚩 Live Job Request</h2>
            {online ? (
              <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{liveJob.title}</h3>
                    <p className="text-gray-600">{liveJob.customerName}</p>
                  </div>
                  <span className="text-lg font-semibold text-blue-600 flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {liveJob.price}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{liveJob.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{liveJob.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{liveJob.time} • {liveJob.duration}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{liveJob.description}</p>

                <div className="flex gap-4 mt-4">
                  {!jobAccepted && (
                    <button
                      onClick={handleAccept}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={handleReject}
                    className={`flex-1 py-2 rounded-md ${
                      jobAccepted
                        ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">Go online to receive jobs.</p>
            )}
          </section>
        </div>
      </div>

      {/* SOS Button - Fixed at bottom right, only shown when logged in */}
      {loggedIn && (
        <div className="fixed bottom-8 right-8 z-50">
          <SOSButton />
        </div>
      )}
    </div>
  );
};

export default WorkerDashBoard;
