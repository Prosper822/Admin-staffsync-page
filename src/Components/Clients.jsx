import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, MoreVertical, Building2, 
  Mail, Phone, ExternalLink, Loader2, Filter, X 
} from 'lucide-react';
import Topbar from '../components/Topbar';
import { fetchClients } from '../api/index';

const API_BASE_URL = 'https://staffsync-career-backend.vercel.app/api';

export default function Clients({ setSidebarOpen }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    industry: '',
    status: 'Active'
  });

  const getClients = async () => {
    setLoading(true);
    try {
      const data = await fetchClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ companyName: '', contactPerson: '', email: '', industry: '', status: 'Active' });
        getClients(); 
      }
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const company = client.companyName || client.name || "";
    const contact = client.contactPerson || "";
    return company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           contact.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="w-10 h-10 text-[#000035] animate-spin mb-4" />
      <p className="text-slate-500 font-medium">Loading client directory...</p>
    </div>
  );

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen flex flex-col">
      <Topbar setSidebarOpen={setSidebarOpen} />

      {/* 
          REMOVED lg:ml-64 to stop the right-shift. 
          Added w-full and flex justify-center to keep content centered.
      */}
      <main className="flex-grow pt-24 pb-12 px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
              <p className="text-slate-500 text-sm">Manage your corporate partners and active job posters.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center cursor-pointer justify-center gap-2 bg-[#000035] text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-[#000050] transition-all active:scale-95"
            >
              <Plus size={18} />
              Add New Client
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search company or contact..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000035]/10"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Person</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredClients.length > 0 ? filteredClients.map((client) => (
                    <tr key={client._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#000035]">
                            <Building2 size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{client.companyName}</p>
                            <p className="text-xs text-slate-500">{client.industry || 'Partner'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{client.contactPerson}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                            <Mail size={12} /> {client.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                          client.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <MoreVertical size={16} className="text-slate-400 inline cursor-pointer" />
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-slate-400 text-sm">
                        No clients found. Click "Add New Client" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b-gray-300 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Add New Partner</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                <input 
                  required
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:border-[#000035]"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact Person</label>
                  <input 
                    required
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:border-[#000035]"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Industry</label>
                  <input 
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:border-[#000035]"
                    value={formData.industry}
                    placeholder="e.g. Technology"
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50  rounded-xl outline-none focus:border-[#000035]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 cursor-pointer bg-[#000035] text-white rounded-2xl font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Register Client'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}