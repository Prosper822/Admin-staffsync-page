import React from 'react';
import { 
  Search, Download, Menu, Bell, Mail, Filter, 
  TrendingUp, Users, Calendar, ArrowUpRight 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 4000, placements: 24 },
  { month: 'Feb', revenue: 3000, placements: 18 },
  { month: 'Mar', revenue: 5000, placements: 29 },
  { month: 'Apr', revenue: 4500, placements: 22 },
  { month: 'May', revenue: 6000, placements: 35 },
];

export default function Reports({ setSidebarOpen }) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl cursor-pointer hover:bg-slate-50"><Menu size={22} /></button>
          <h2 className="text-sm font-bold text-slate-800 hidden sm:block">Analytics Terminal</h2>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/></button>
          <img src="https://i.pravatar.cc/150?u=john" className="w-8 h-8 rounded-full border border-slate-200" alt="profile" />
        </div>
      </header>

      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Performance Reports</h1>
            <p className="text-slate-500 text-sm">Deep dive into your agency's growth metrics.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2"><Filter size={14}/> Filter</button>
            <button className="flex-1 sm:flex-none px-4 py-2 bg-[#000035] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Download size={14}/> Export PDF</button>
          </div>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Revenue Growth</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366F1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Monthly Placements</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                  <Tooltip cursor={{fill: '#F8FAFC'}} />
                  <Bar dataKey="placements" fill="#000035" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}