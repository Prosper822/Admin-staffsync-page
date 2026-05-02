import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, Briefcase, FileText, Users, 
  Building2, BarChart3, MessageSquare, Bell, Settings, ChevronDown 
} from 'lucide-react';
import logo from '../assets/1000562327.png';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  // Function to close sidebar on mobile after clicking a link
  const handleItemClick = () => {
    // 1024px is the standard 'lg' breakpoint in Tailwind
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutGrid, path: '/admin' },
    { label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { label: 'Applications', icon: FileText, path: '/apps' },
    { label: 'Candidates', icon: Users, path: '/workers' },
    { label: 'Clients', icon: Building2, path: '/clients' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'Messages', icon: MessageSquare, path: '/messages', badge: 12 },
    { label: 'Notifications', icon: Bell, path: '/notifs', badge: 8 },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#000035] text-slate-400 z-[70] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center gap-3">
          <img src={logo} alt="StaffSync Logo" className="w-32 md:w-36" />
        </div>

        <nav className="mt-4 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink 
              key={item.label} 
              to={item.path} 
              onClick={handleItemClick} // <-- ADD THIS LINE
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#6366F1] text-white' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && <span className="bg-[#6366F1] text-[10px] px-2 py-0.5 rounded-full text-white">{item.badge}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2">
            <img src="https://i.pravatar.cc/150?u=john" className="w-10 h-10 rounded-full border-2 border-white/10" alt="Admin" />
            <div className="flex-1 min-w-0 text-sm">
              <p className="font-bold text-white truncate">Oluwasuyi Lawson</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}