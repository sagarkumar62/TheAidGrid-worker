import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import Home from "../pages/WorkerHome";
import WorkerDashBoard from "../pages/WorkerDashBoard";
import WorkerHome from "../pages/WorkerHome";
import WorkerRegister from "../pages/WorkerRegister";
import WorkerJobs from "../pages/WorkerJobs";
import WorkerEarning from "../pages/WorkerEarning";
import WorkerProfile from "../pages/WorkerProfile";


const AppRouter = () => {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<WorkerHome />} />
          <Route path="/dashboard" element={<WorkerDashBoard />} />
          <Route path="/worker-register" element={<WorkerRegister />} />
          <Route path='/jobs' element={<WorkerJobs />} />
          <Route path="/earnings" element={<WorkerEarning />} />
          <Route path="/profile" element={<WorkerProfile />} />
        </Routes>
      
    </BrowserRouter>
  );
};

export default AppRouter;
