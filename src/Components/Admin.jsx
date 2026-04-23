import React from 'react';
import { 
  Search, Bell, Mail, Plus, Filter, 
  MoreVertical, Eye, Menu, ChevronRight 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- DATA FOR GRAPHS ---
const lineData = [
  { name: 'May 1', apps: 420, short: 300, hired: 100, rej: 50 },
  { name: 'May 7', apps: 580, short: 320, hired: 120, rej: 80 },
  { name: 'May 14', apps: 620, short: 320, hired: 120, rej: 80 },
  { name: 'May 21', apps: 590, short: 400, hired: 150, rej: 90 },
  { name: 'May 28', apps: 750, short: 450, hired: 200, rej: 110 },
];

const pieData = [
  { name: 'Pending', value: 1545, color: '#6366F1' },
  { name: 'Shortlisted', value: 1029, color: '#3B82F6' },
  { name: 'Interview', value: 551, color: '#10B981' },
  { name: 'Hired', value: 369, color: '#F59E0B' },
  { name: 'Rejected', value: 184, color: '#EF4444' },
];

// --- DATA FOR TABLE ---
const tableData = [
  { name: "Sarah Johnson", email: "sarah.j@email.com", role: "Frontend Developer", type: "Full Time", client: "TechSolutions Inc.", status: "Shortlisted", date: "May 20, 2024" },
  { name: "Michael Brown", email: "michael.b@email.com", role: "UI/UX Designer", type: "Full Time", client: "DesignStudio", status: "Pending", date: "May 19, 2024" },
  { name: "Emily Davis", email: "emily.d@email.com", role: "Backend Developer", type: "Full Time", client: "WebApp Corp.", status: "Interview", date: "May 18, 2024" },
  { name: "David Wilson", email: "david.w@email.com", role: "DevOps Engineer", type: "Full Time", client: "CloudTech Systems", status: "Hired", date: "May 17, 2024" },
];

export default function Admin({ setSidebarOpen }) {
  return (
    <div className="w-full pb-10">
      {/* RESPONSIVE HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden cursor-pointer p-2 text-slate-600 rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search anything...   ⌘ K" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/><span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span></button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full hidden xs:block"><Mail size={20}/></button>
          <img src="https://i.pravatar.cc/150?u=john" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        
        {/* WELCOME AREA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className='mt-4'>
            <h1 className="text-2xl md:text-2xl font-bold text-slate-900 leading-tight">Welcome back.</h1>
            <p className="text-slate-500 md:text-sm">Here's what's happening with your agency today.</p>
          </div>
          <button className="w-[50] sm:w-auto bg-[#000035] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
            <Plus size={18} /> Add New Job
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard label="Total Jobs" value="128" trend="12%" color="indigo" icon="💼" />
          <StatCard label="Active Candidates" value="1,245" trend="18%" color="blue" icon="👥" />
          <StatCard label="Applications" value="3,678" trend="22%" color="emerald" icon="📄" />
          <StatCard label="Clients" value="86" trend="8%" color="orange" icon="🏢" />
        </div>

        {/* GRAPHS SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LINE CHART */}
          <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Applications Overview</h3>
              <select className="text-xs font-bold bg-slate-50 border-none rounded-lg p-1">
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Line type="monotone" dataKey="apps" stroke="#6366F1" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="short" stroke="#3B82F6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="hired" stroke="#10B981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Applications by Status</h3>
            <div className="h-[240px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-900">3,678</span>
                <span className="text-[10px] text-slate-400 font-bold ">Total</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-[13px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                    <span className="font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-slate-900">Recent Applications</h3>
            <div className="flex gap-2">
               <div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={14}/><input className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" placeholder="Search..."/></div>
               <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"><Filter size={14}/> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-700 text-[11px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Job Position</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Applied On</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((app, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-9 h-9 rounded-full" alt="" />
                      <div><p className="text-sm font-bold text-slate-900">{app.name}</p><p className="text-[11px] text-slate-400">{app.email}</p></div>
                    </td>
                    <td className="px-6 py-4"><p className="text-sm font-bold text-slate-900">{app.role}</p><p className="text-[11px] text-slate-400">{app.type}</p></td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">🏢 {app.client}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-600' : app.status === 'Hired' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{app.date}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900"><Eye size={16}/></button>
                      <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900"><MoreVertical size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <button className="text-indigo-600 text-xs font-bold hover:underline flex items-center gap-1 mx-auto">View all applications <ChevronRight size={14}/></button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, trend, icon }) {
  return (
    <div className="bg-white px-5 py-8 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl bg-slate-50">{icon}</div>
      <div className="min-w-0">
        <p className="text-slate-600 text-[15px] font-medium">{label}</p>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">{value}</h3>
        <p className="text-emerald-500 text-[10px] font-bold mt-0.5">↑ {trend} <span className="text-slate-400 font-normal">vs last month</span></p>
      </div>
    </div>
  );
}