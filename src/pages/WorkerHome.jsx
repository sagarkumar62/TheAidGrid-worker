import React from 'react';
import WorkerNavbar from '../components/WorkerNavbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../Frontend-user/src/components/Home/Footer';
import WorkerFooter from '../components/Footer';

const WorkerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <WorkerNavbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 gap-8 h-auto md:h-[90vh]">
        {/* Left */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-600">The Aid Grid</span> Worker Panel
          </h1>
          <p className="text-lg mb-6">
            Join our trusted platform and start accepting jobs to earn and grow with flexibility.
          </p>
          <button
            onClick={() => navigate('/worker-register')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
          >
            Join Us
          </button>
        </div>

        {/* Right */}
        <div className="flex-1 h-[300px] md:h-[400px] lg:h-[500px]">
          <img
            src="https://i.pinimg.com/736x/36/d1/4b/36d14b455940419fd2d86b44efdaac67.jpg"
            alt="Worker"
            className="rounded-xl shadow-lg w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 px-6 md:px-20 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Upgrade Your Life
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Trusted by professionals across the country.
        </p>

        <div className="flex flex-col md:flex-row justify-around items-center gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">76,867+</h3>
            <p className="text-gray-700 dark:text-gray-300">Monthly Active Professionals</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">4.5 ★</h3>
            <p className="text-gray-700 dark:text-gray-300">Average Rating</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">100K+</h3>
            <p className="text-gray-700 dark:text-gray-300">Users Globally</p>
          </div>
        </div>
      </section>
      <WorkerFooter />
    </div>
  );
};

export default WorkerHome;
