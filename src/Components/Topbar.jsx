// Topbar.jsx
import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export default function Topbar({ setSidebarOpen }) {
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
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/></button>
        <img src="https://i.pravatar.cc/150?u=admin" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
      </div>
    </header>
  );
}