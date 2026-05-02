import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, MapPin, 
  Clock, Briefcase, Edit3, Trash2, Menu, Bell, Mail 
} from 'lucide-react';
import { fetchJobs, deleteJob } from '../api/index'; // Import your API tools

export default function Jobs({ setSidebarOpen }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch live data on mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // 2. Handle Deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id)); // Remove from UI immediately
        alert("Job deleted successfully");
      } catch (error) {
        alert("Failed to delete job");
      }
    }
  };

  // 3. Filter jobs based on search input
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-10 h-10 border-4 border-[#000035] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl cursor-pointer hover:bg-slate-50"><Menu size={22} /></button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20}/></button>
          <img src="https://i.pravatar.cc/150?u=admin" className="w-8 h-8 rounded-full border border-slate-200 ml-2" alt="profile" />
        </div>
      </header>

      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Job Management</h1>
            <p className="text-slate-500 text-sm font-medium">Managing {jobs.length} active job openings.</p>
          </div>
          <button className="bg-[#000035] cursor-pointer text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-100 transition-transform active:scale-95">
            <Plus size={18} /> Post New Job
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 mt-15 shadow-sm overflow-hidden px-2 sm:px-4">
          <div className="overflow-x-auto scrollbar-hide"> 
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[700px]"> 
              <thead className="text-slate-600 text-[12px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-4 sm:px-6 py-4">Job Details</th>
                  <th className="px-4 sm:px-6 py-4">Department</th>
                  <th className="px-4 sm:px-6 py-4">Type</th>
                  <th className="px-4 sm:px-6 py-4">Status</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredJobs.map((job) => (
                  <tr key={job._id} className="group hover:bg-slate-50 transition-all">
                    <td className="px-4 sm:px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="hidden xs:flex w-10 h-10 bg-slate-50 text-slate-600 rounded-xl items-center justify-center font-bold">
                          <Briefcase size={18} />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-slate-900">{job.title}</p>
                          <div className="flex items-center gap-3 text-[12px] font-medium text-slate-400">
                            <span className="flex items-center gap-1"><MapPin size={12}/> {job.location || "Remote"}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-5">
                      <span className="text-sm font-medium text-slate-600">{job.department}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-5 text-sm font-bold text-slate-900">
                      {job.type}
                    </td>
                    <td className="px-4 sm:px-6 py-5">
                      <span className="px-3 py-2 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                        Active
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors">
                          <Edit3 size={16}/>
                        </button>
                        <button 
                          onClick={() => handleDelete(job._id)}
                          className="p-2 border border-slate-200 rounded-lg text-slate-400 cursor-pointer hover:text-rose-600 transition-colors"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredJobs.length === 0 && (
              <div className="text-center py-20 text-slate-400">No jobs found matching your search.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}