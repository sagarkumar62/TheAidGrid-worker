import React, { useState } from 'react';
import WorkerNavbar from '../components/WorkerNavbar';
import Button from '../components/Button';
import { Calendar, Clock, MapPin, IndianRupee } from 'lucide-react';

const WorkerJobs = () => {
  // Sample data - replace with actual API calls
  const [requestedJobs] = useState([
    {
      id: 1,
      title: 'House Cleaning',
      location: 'Sector 62, Noida',
      date: '2025-06-10',
      time: '10:00 AM',
      duration: '3 hours',
      price: 600,
      description: 'Regular house cleaning including dusting, mopping, and bathroom cleaning',
      clientName: 'Rahul Sharma'
    },
    {
      id: 2,
      title: 'Deep Kitchen Cleaning',
      location: 'Sector 18, Noida',
      date: '2025-06-11',
      time: '2:00 PM',
      duration: '4 hours',
      price: 800,
      description: 'Deep cleaning of kitchen including appliances and cabinets',
      clientName: 'Priya Patel'
    }
  ]);

  const [acceptedJobs] = useState([
    {
      id: 3,
      title: 'Office Cleaning',
      location: 'Sector 127, Noida',
      date: '2025-06-09',
      time: '7:00 AM',
      duration: '5 hours',
      price: 1000,
      description: 'Complete office cleaning including workstations and meeting rooms',
      clientName: 'TechSpace Solutions',
      status: 'In Progress'
    }
  ]);

  const JobCard = ({ job, isAccepted }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-gray-600">{job.clientName}</p>
        </div>
        <span className="text-lg font-semibold text-blue-600 flex items-center">
          <IndianRupee className="w-4 h-4 mr-1" />
          {job.price}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{job.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{job.time} • {job.duration}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{job.description}</p>

      {isAccepted ? (
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {job.status}
          </span>
          <Button className="bg-blue-600 hover:bg-blue-700">
            View Details
          </Button>
        </div>
      ) : (
        <div className="flex space-x-3">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            Accept
          </Button>
          <Button className="flex-1 bg-gray-600 hover:bg-gray-700">
            Decline
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <WorkerNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Requested Jobs Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Requested Jobs ({requestedJobs.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requestedJobs.map(job => (
              <JobCard key={job.id} job={job} isAccepted={false} />
            ))}
          </div>
        </section>

        {/* Accepted Jobs Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Accepted Jobs ({acceptedJobs.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedJobs.map(job => (
              <JobCard key={job.id} job={job} isAccepted={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkerJobs;