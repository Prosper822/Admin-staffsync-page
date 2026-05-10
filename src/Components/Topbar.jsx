// Topbar.jsx
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

export default function Topbar({ setSidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await fetch('https://staffsync-career-backend.vercel.app/api/notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden cursor-pointer p-2 text-slate-600 rounded-xl hover:bg-slate-50">
          <Menu size={22} />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 relative">
        {/* BELL ICON */}
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors"
        >
          <Bell size={23} className='cursor-pointer'/>
          {unreadCount > 0 && (
            <span className="absolute cursor-pointer top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* NOTIFICATION DROPDOWN */}
        {showDropdown && (
          <div className="absolute top-12 right-0 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Notifications</h3>
              <button onClick={() => setShowDropdown(false)}><X size={16} className="text-slate-400 cursor-pointer" /></button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? notifications.map((note) => (
                <div key={note._id} className="p-4 border-b-gray-500 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm font-bold text-slate-900">{note.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{note.message}</p>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase font-semibold">
                    {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No new alerts.
                </div>
              )}
            </div>
          </div>
        )}

        <img src="https://i.pravatar.cc/150?u=admin" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
      </div>
    </header>
  );
}