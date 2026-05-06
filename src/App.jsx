import React, { useState } from "react";
// Import BrowserRouter as Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Admin from "./Components/Admin";
import Jobs from "./Components/Jobs";
import Topbar from "./Components/Topbar";
import Clients from "./Components/Clients";
import Recruitment from "./Components/Recruitment"
import Inbox from "./Components/Inbox"



export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // 1. Everything MUST be inside the Router
    <Router>
      <div className="flex min-h-screen bg-[#F8FAFC] overflow-x-hidden">
        
        {/* 2. Sidebar now works because it's inside the Router */}
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* 3. Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64 w-full transition-all duration-300">
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />

            <Route 
              path="/admin" 
              element={<Admin setSidebarOpen={setSidebarOpen} />} 
            />

             <Route 
              path="/jobs" 
              element={<Jobs setSidebarOpen={setSidebarOpen} />} 
            />
            
            <Route 
              path="/clients" 
              element={<Clients setSidebarOpen={setSidebarOpen} />} 

            />

             <Route 
              path="/recruitment" 
              element={<Recruitment setSidebarOpen={setSidebarOpen} />} 
            />

            <Route 
              path="/inbox" 
              element={<Inbox setSidebarOpen={setSidebarOpen} />} 
            />
             

            
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}