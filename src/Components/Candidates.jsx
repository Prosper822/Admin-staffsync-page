import React from 'react';
import { 
  Search, Filter, Eye, Download, Menu, Bell, 
  Mail, MoreVertical, Star, UserPlus 
} from 'lucide-react';

const workerData = [
  { id: 1, name: "Alex Rivera", role: "Full Stack Dev", status: "Available", rating: 4.9, skills: ["React", "Node.js"], salary: "$85k" },
  { id: 2, name: "Sofia Chen", role: "UI Designer", status: "On Project", rating: 4.8, skills: ["Figma", "Adobe"], salary: "$70k" },
  { id: 3, name: "Marcus Thorne", role: "DevOps", status: "Available", rating: 4.7, skills: ["AWS", "Docker"], salary: "$95k" },
];

export default function Candidates({ setSidebarOpen }) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      {/* EXACT ADMIN HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search candidates... ⌘ K" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/><span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span></button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full hidden xs:block"><Mail size={20}/></button>
          <img src="https://i.pravatar.cc/150?u=john" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
        </div>
      </header>

      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Talent Pool</h1>
            <p className="text-slate-500 text-sm font-medium">Manage and source your professional workforce.</p>
          </div>
          <button className="w-full sm:w-auto bg-[#000035] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
            <UserPlus size={18} /> Add Candidate
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden px-2 sm:px-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[800px]">
              <thead className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Skills</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {workerData.map((worker, i) => (
                  <tr key={worker.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/150?u=${worker.id + 10}`} className="w-10 h-10 rounded-full" alt="" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{worker.name}</p>
                          <p className="text-[11px] text-slate-400">{worker.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {worker.skills.map(skill => (
                          <span key={skill} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{skill}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${worker.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                        <Star size={14} className="fill-amber-400 text-amber-400" /> {worker.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600"><Mail size={16}/></button>
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900"><MoreVertical size={16}/></button>
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