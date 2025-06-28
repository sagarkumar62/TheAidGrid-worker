import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../store/reducers/otpSlice";
import logo from "../assets/aid.jpg";
import Button from "./Button";
import Popup from "./Popup";
import { Menu, X, MapPin, Wifi, WifiOff } from "lucide-react";
import { toast } from "react-toastify";
import WorkerMapComponent from "./WorkerMapComponent";

const WorkerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(null);
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);

  const loggedIn = useSelector((state) => state.otp.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationHook = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("loggedIn");
    if (stored === "true") {
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);
  useEffect(() => {
    // Only navigate to dashboard on initial login or if on home page and logged in
    const justLoggedIn = localStorage.getItem("justLoggedIn");
    if (loggedIn && justLoggedIn) {
      localStorage.removeItem("justLoggedIn");
      navigate("/dashboard");
    } else if (loggedIn && locationHook.pathname === "/") {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate, locationHook]);

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    localStorage.removeItem("loggedIn");
    navigate("/");
  };
  const handleNavigation = (path) => {
    const protectedRoutes = ["/dashboard", "/jobs", "/earnings", "/profile"];
    if (!loggedIn && protectedRoutes.includes(path)) {
      toast.warn("Please login to access this section.");
      setShowPopup(true);
      setMenuOpen(false);
      return;
    }

    navigate(path);
    setMenuOpen(false);
  };

  const NavLink = ({ to, icon, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <span>{icon}</span> {label}
    </button>
  );

  // Handle location updates
  const handleLocationUpdate = (newLocation) => {
    setLocation(newLocation);
  };

  // Toggle location tracking
  const toggleLocation = () => {
    if (!isLocationActive) {
      setIsLocationActive(true);
      toast.success("Location tracking enabled");
    } else {
      setIsLocationActive(false);
      toast.info("Location tracking disabled");
    }
  };

  // Toggle mini map
  const toggleMiniMap = () => {
    setShowMiniMap(!showMiniMap);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="The Aid Grid Logo"
              className="h-10 w-auto mr-2 rounded-full"
            />
            <span className="text-xl font-bold text-gray-800">
              The Aid Grid Worker
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            {loggedIn && (
              <>
                <NavLink to="/dashboard" icon="🏠" label="Dashboard" />
                <NavLink to="/jobs" icon="📋" label="My Jobs" />
                <NavLink to="/earnings" icon="💵" label="Earnings" />

                {/* Location Status */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLocation}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      isLocationActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isLocationActive ? (
                      <Wifi className="w-4 h-4" />
                    ) : (
                      <WifiOff className="w-4 h-4" />
                    )}
                    <span>{isLocationActive ? "Online" : "Offline"}</span>
                  </button>
                  <button
                    onClick={toggleMiniMap}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </>
            )}
            {loggedIn ? (
              <>
                <Button onClick={() => handleNavigation("/profile")}>
                  Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setShowPopup(true);
                  setMenuOpen(false);
                }}
              >
                Login
              </Button>
            )}
          </div>

          {/* Hamburger menu */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mini Map Popup */}
        {showMiniMap && loggedIn && (
          <div className="absolute top-16 right-4 w-64 h-64 bg-white rounded-lg shadow-lg p-2 z-50">
            <WorkerMapComponent
              onLocationUpdate={handleLocationUpdate}
              isTracking={isLocationActive}
            />
          </div>
        )}

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-3 flex flex-col space-y-4 bg-white shadow-lg px-4 py-4 rounded-lg animate-slide-down text-gray-700">
            {loggedIn && (
              <>
                <NavLink to="/dashboard" icon="🏠" label="Dashboard" />
                <NavLink to="/jobs" icon="📋" label="My Jobs" />
                <NavLink to="/earnings" icon="💵" label="Earnings" />

                {/* Mobile Location Controls */}
                <div className="flex items-center justify-between py-2">
                  <button
                    onClick={toggleLocation}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      isLocationActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isLocationActive ? (
                      <Wifi className="w-4 h-4" />
                    ) : (
                      <WifiOff className="w-4 h-4" />
                    )}
                    {isLocationActive ? "Online" : "Offline"}
                  </button>
                  <button
                    onClick={toggleMiniMap}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </>
            )}
            <NavLink to="/profile" icon="👤" label="Profile" />

            {loggedIn ? (
              <>
                <Button onClick={() => handleNavigation("/profile")}>
                  Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setShowPopup(true);
                  setMenuOpen(false);
                }}
              >
                Login
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Spacer below fixed navbar */}
      <div className="h-[9vh] md:h-16"></div>

      {/* Login Popup */}
      {showPopup && (
        <Popup step={step} setStep={setStep} setShowPopup={setShowPopup} />
      )}
    </>
  );
};

export default WorkerNavbar;
