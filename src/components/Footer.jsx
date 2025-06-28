import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from 'lucide-react';

const WorkerFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">

        {/* Worker Platform Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">The Aid Grid Workers</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Join our worker community to find flexible, high-paying jobs that suit your schedule and skills.
          </p>
        </div>

        {/* Useful Links for Workers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Worker Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/worker-dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/worker-jobs" className="hover:text-blue-400 transition-colors">
                Job Listings
              </Link>
            </li>
            <li>
              <Link to="/worker-support" className="hover:text-blue-400 transition-colors">
                Help & Support
              </Link>
            </li>
            <li>
              <Link to="/worker-profile" className="hover:text-blue-400 transition-colors">
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-6 w-6 hover:text-blue-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6 hover:text-sky-400 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 hover:text-pink-500 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 hover:text-blue-300 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} <span className="text-white">The Aid Grid Workers</span>. All rights reserved.</p>
        <Link
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-200 transition mt-2"
          onClick={() => {
    window.location.href = "https://theaidgrid.netlify.app/"; // change to your desired host
  }}
        >
          The Aid Grid <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </footer>
  );
};

export default WorkerFooter;
