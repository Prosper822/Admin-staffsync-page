import React from 'react';
import { 
  Plus, Search, Filter, MoreVertical, MapPin, 
  Clock, Briefcase, Edit3, Trash2, Menu, Bell, Mail 
} from 'lucide-react';

const jobData = [
  { id: 1, title: "Frontend Developer", department: "Engineering", location: "Remote", type: "Full Time", status: "Active", applicants: 42 },
  { id: 2, title: "UI/UX Designer", department: "Design", location: "New York, NY", type: "Contract", status: "Active", applicants: 18 },
  { id: 3, title: "Backend Engineer", department: "Engineering", location: "Remote", type: "Full Time", status: "Paused", applicants: 25 },
  { id: 3, title: "Backend Engineer", department: "Engineering", location: "Remote", type: "Full Time", status: "Paused", applicants: 25 },
];

export default function Jobs({ setSidebarOpen }) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      {/* EXACT ADMIN HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl cursor-pointer hover:bg-slate-50"><Menu size={22} /></button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search jobs...   ⌘ K" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/><span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span></button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full hidden xs:block"><Mail size={20}/></button>
          <img src="https://i.pravatar.cc/150?u=john" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
        </div>
      </header>


     {/* main */}
      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Job Management</h1>
            <p className="text-slate-500 text-sm font-medium">Create and manage your active job openings.</p>
          </div>
          <button className="bg-[#000035] cursor-pointer text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-100">
            <Plus size={18} /> Post New Job
          </button>
        </div>

      {/* Jobs Table Container */}
<div className="bg-white rounded-3xl border border-slate-200 mt-15 shadow-sm overflow-hidden px-2 sm:px-4">
  <div className="overflow-x-auto scrollbar-hide"> 
    {/* Added overflow-x-auto to allow horizontal swipe on mobile */}
    <table className="w-full text-left border-separate border-spacing-y-3 min-w-[700px]"> 
      {/* min-w-[700px] ensures the table doesn't collapse on small screens */}
      <thead className="text-slate-600 text-[12px] uppercase font-bold tracking-widest">
        <tr>
          <th className="px-4 sm:px-6 py-4">Job Details</th>
          <th className="px-4 sm:px-6 py-4">Department</th>
          <th className="px-4 sm:px-6 py-4">Applicants</th>
          <th className="px-4 sm:px-6 py-4">Status</th>
          <th className="px-4 sm:px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {jobData.map((job) => (
          <tr key={job.id} className="group hover:bg-slate-50 transition-all">
            <td className="px-4 sm:px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="hidden xs:flex w-10 h-10 bg-slate-50 text-slate-600 rounded-xl items-center justify-center font-bold">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-[16px] font-bold text-slate-900">{job.title}</p>
                  <div className="flex items-center gap-3 text-[12px] font-medium text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 sm:px-6 py-5">
              <span className="text-sm font-medium text-slate-600">{job.department}</span>
            </td>
            <td className="px-4 sm:px-6 py-5 text-sm font-bold text-slate-900 whitespace-nowrap">
              {job.applicants} Applied
            </td>
            <td className="px-4 sm:px-6 py-5">
              <span className={`px-3 py-2 rounded-full text-[10px] font-bold ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                {job.status}
              </span>
            </td>
            <td className="px-4 sm:px-6 py-5 text-right">
              <div className="flex justify-end gap-2">
                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 cursor-pointer hover:text-indigo-600"><Edit3 size={16}/></button>
                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 cursor-pointer hover:text-rose-600"><Trash2 size={16}/></button>
              </div>
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