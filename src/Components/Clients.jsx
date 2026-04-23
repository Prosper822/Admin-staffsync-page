import React from 'react';
import { 
  Search, Download, Menu, Bell, Mail, MoreVertical, 
  Building2, Plus, ExternalLink, Briefcase 
} from 'lucide-react';

const clientData = [
  { id: 1, name: "TechSolutions Inc.", industry: "Software", projects: 4, revenue: "$12,400", status: "Active" },
  { id: 2, name: "DesignStudio", industry: "Creative", projects: 2, revenue: "$5,800", status: "Active" },
  { id: 3, name: "CloudTech Systems", industry: "Infrastructure", projects: 1, revenue: "$18,200", status: "On Hold" },
];

export default function Clients({ setSidebarOpen }) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      {/* EXACT ADMIN HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 cursor-pointer rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search clients... ⌘ K" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
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
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Client Portfolio</h1>
            <p className="text-slate-500 text-sm font-medium">Overview of your corporate partnerships.</p>
          </div>
          <button className="w-full sm:w-auto bg-[#000035] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
            <Plus size={18} /> New Client
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden px-2 sm:px-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[800px]">
              <thead className="text-slate-400 text-[11px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Active Projects</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {clientData.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{client.name}</p>
                          <p className="text-[11px] text-slate-400">{client.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Briefcase size={14} className="text-slate-400" /> {client.projects}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{client.revenue}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${client.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600"><ExternalLink size={16}/></button>
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