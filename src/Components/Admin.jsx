import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Mail, Plus, Filter, 
  MoreVertical, Eye, Menu, ChevronRight 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { fetchCandidates } from '../api/index'; 

export default function Admin({ setSidebarOpen }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, apps: 0, clients: 12 });

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        // Fetching live data from your Vercel backend
        const data = await fetchCandidates(); 
        setCandidates(data);
        
        // Calculate dynamic stats from your live database
        const uniquePositions = [...new Set(data.map(c => c.position))].filter(Boolean);
        
        setStats(prev => ({
          ...prev,
          jobs: uniquePositions.length || 0,
          candidates: data.length,
          apps: data.length
        }));
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  // Map API status to your UI colors
  const getPieData = () => {
    const counts = candidates.reduce((acc, curr) => {
      const status = curr.status || 'Pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const colors = {
      'Pending': '#6366F1',
      'Shortlisted': '#3B82F6',
      'Interview': '#10B981',
      'Hired': '#F59E0B',
      'Rejected': '#EF4444'
    };

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: colors[key] || '#CBD5E1'
    }));
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#000035] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full pb-10">
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search applications..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/></button>
          <img src="https://i.pravatar.cc/150?u=admin" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
        </div>
      </header>

      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className='mt-4'>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back.</h1>
            <p className="text-slate-500 text-sm">Managing {candidates.length} active applications from your backend.</p>
          </div>
          <button className="bg-[#000035] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-100/50">
            <Plus size={18} /> Add New Job
          </button>
        </div>

        {/* STATS GRID - Now using dynamic backend counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard label="Live Jobs" value={stats.jobs} trend="Active" icon="💼" />
          <StatCard label="Total Candidates" value={stats.candidates} trend="New" icon="👥" />
          <StatCard label="Total Apps" value={stats.apps} trend="Synced" icon="📄" />
          <StatCard label="Clients" value={stats.clients} trend="Stable" icon="🏢" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* GROWTH CHART */}
          <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Application Trends</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{name: 'Week 1', apps: 5}, {name: 'Week 2', apps: 12}, {name: 'Week 3', apps: stats.apps}]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="apps" stroke="#6366F1" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* STATUS BREAKDOWN */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Status Breakdown</h3>
            <div className="h-[240px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={getPieData()} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {getPieData().map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-900">{candidates.length}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {getPieData().map((item) => (
                <div key={item.name} className="flex justify-between items-center text-[13px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                    <span className="font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 text-slate-700 text-[11px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Job Position</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right pr-10">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.slice(0, 6).map((app, i) => (
                  <tr key={app._id || i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#000035] text-xs border border-slate-200">
                        {app.fullName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{app.name}</p>
                        <p className="text-[11px] text-slate-400">{app.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{app.position || "Staff"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'Hired' ? 'bg-emerald-50 text-emerald-600' : 
                        app.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-10">
                      <button className="p-2 text-slate-300 hover:text-slate-600 cursor-pointer"><MoreVertical size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      <div>
        <p className="text-slate-600 text-[15px] font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 leading-none">{value}</h3>
        <p className="text-emerald-500 text-[10px] font-bold mt-1 uppercase tracking-tight">{trend}</p>
      </div>
    </div>
  );
}