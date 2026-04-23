import React, { useState } from 'react';
import { 
  User, Shield, Bell, Globe, Mail, 
  Menu, Save, Camera, ChevronRight 
} from 'lucide-react';

export default function Settings({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'General Profile', icon: User },
    { id: 'security', label: 'Security & Password', icon: Shield },
    { id: 'notifs', label: 'Notification Settings', icon: Bell },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <h2 className="text-sm font-bold text-slate-800">Account Settings</h2>
        </div>
        <button className="bg-[#000035] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          <Save size={14} /> Save Changes
        </button>
      </header>

      <main className="mt-16 p-4 md:p-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Settings Navigation */}
          <div className="lg:col-span-4 space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} />
                  <span className="text-sm font-bold">{tab.label}</span>
                </div>
                <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>

          {/* Settings Content Area */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=john" className="w-24 h-24 rounded-2xl border-4 border-slate-50" alt="avatar" />
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-indigo-600">
                    <Camera size={16} />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900">John Admin</h3>
                  <p className="text-sm text-slate-500">Administrator • Lagos, Nigeria</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" defaultValue="John Admin" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input type="email" defaultValue="admin@staffsync.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-300 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
                    <option>Tech & Recruitment</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Language</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <Globe size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-700">English (US)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}