import React from 'react';
import { 
  Bell, Check, MessageSquare, Briefcase, 
  UserPlus, Info, Menu, Search, MoreVertical 
} from 'lucide-react';

const notifications = [
  { id: 1, type: 'job', title: 'New Application', desc: 'Sarah Johnson applied for Frontend Developer', time: '2m ago', read: false, icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
  { id: 2, type: 'message', title: 'New Message', desc: 'TechSolutions HR sent you a contract draft', time: '1h ago', read: false, icon: MessageSquare, color: 'text-indigo-600 bg-indigo-50' },
  { id: 3, type: 'system', title: 'System Update', desc: 'StaffSync v2.4 successfully deployed', time: '5h ago', read: true, icon: Info, color: 'text-slate-600 bg-slate-50' },
  { id: 4, type: 'job', title: 'Job Closed', desc: 'Backend Developer position has been filled', time: '1d ago', read: true, icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
];

export default function Notifications({ setSidebarOpen }) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 cursor-pointer rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <h2 className="text-sm font-bold text-slate-800">Activity Center</h2>
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Mark all as read</button>
      </header>

      <main className="mt-16 p-4 md:p-8 max-w-[800px] mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm">Stay updated with your latest recruitment activities.</p>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className={`group p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${n.read ? 'bg-white border-slate-100 opacity-75' : 'bg-white border-indigo-100 shadow-sm ring-1 ring-indigo-50'}`}>
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${n.color}`}>
                <n.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-900">{n.title}</p>
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{n.desc}</p>
              </div>
              <button className="p-1.5 text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <button className="w-full py-3 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
          View Older Notifications
        </button>
      </main>
    </div>
  );
}