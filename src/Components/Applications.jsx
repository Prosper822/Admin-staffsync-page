import React from 'react';
import { Search, Eye, Download, Mail, Menu, Bell, MoreVertical } from 'lucide-react';

const appData = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", job: "Frontend Developer", date: "May 20, 2024", score: "94%", status: "Shortlisted" },
  { id: 2, name: "Michael Brown", email: "michael.b@email.com", job: "UI/UX Designer", date: "May 19, 2024", score: "88%", status: "Pending" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", job: "Backend Developer", date: "May 18, 2024", score: "91%", status: "Interview" },
];

export default function Applications({ setSidebarOpen }) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      {/* RESPONSIVE ADMIN HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="lg:hidden p-2 cursor-pointer text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Menu size={22} />
          </button>
          
          {/* Search: Hidden on extra small mobile, visible from 'sm' up */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search candidates... ⌘ K" 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10" 
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
            <Bell size={20}/>
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
          </button>
          {/* Mail hidden on tiny screens to save space */}
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full hidden xs:block">
            <Mail size={20}/>
          </button>
          <img src="https://i.pravatar.cc/150?u=john" className="w-8 h-8 rounded-full border border-slate-200 ml-1 md:ml-2" alt="profile" />
        </div>
      </header>

      <main className="mt-16 p-4 md:p-8 space-y-6 md:y-8 max-w-[1400px] mx-auto">
        {/* PAGE TITLE & ACTION BUTTON */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Candidate Applications</h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Review and process all job submissions.</p>
          </div>
          <button className="w-full sm:w-auto bg-[#000035] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-slate-800 transition-all">
            <Download size={18} /> 
            <span>Export List</span>
          </button>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {/* min-w-[650px] prevents the table from squishing. 
               The container handles the side-scrolling on mobile.
            */}
            <table className="w-full text-left border-separate border-spacing-y-2 px-2 md:px-4">
              <thead className="text-slate-400 text-[10px] md:text-[11px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-4 py-4">Candidate</th>
                  <th className="px-4 py-4">Applied Job</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appData.map((app, i) => (
                  <tr key={app.id} className="group hover:bg-slate-50 transition-all">
                    {/* Candidate Info */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://i.pravatar.cc/150?u=${i}`} 
                          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex-shrink-0 border border-slate-100" 
                          alt="" 
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{app.name}</p>
                          <p className="text-[11px] text-slate-400 truncate hidden xs:block">{app.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Job Position */}
                    <td className="px-4 py-4">
                      <p className="text-sm font-bold text-slate-900 whitespace-nowrap">{app.job}</p>
                      <p className="text-[11px] text-slate-400">{app.date}</p>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-600' : 
                        app.status === 'Interview' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {app.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-1.5 md:gap-2">
                        <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                          <Eye size={16}/>
                        </button>
                        <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
                          <MoreVertical size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Swipe Hint: Only shows on small screens */}
          <div className="lg:hidden text-center py-2 border-t border-slate-50">
            <p className="text-[10px] text-slate-400 font-medium">Swipe horizontally to view more</p>
          </div>
        </div>
      </main>
    </div>
  );
}