import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, MapPin, Briefcase, Trash2, Menu, X, ArrowLeft 
} from 'lucide-react';
import { fetchJobs, deleteJob, createJob } from '../api/index'; 

export default function Jobs({ setSidebarOpen }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State to track which job is being "viewed" on mobile
  const [viewingJob, setViewingJob] = useState(null);

  const [newJob, setNewJob] = useState({ 
    title: '', 
    department: '', 
    type: 'Full-time', 
    location: 'Remote' 
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const savedJob = await createJob(newJob); 
      setJobs(prev => [savedJob, ...prev]);
      setIsModalOpen(false);
      setNewJob({ title: '', department: '', type: 'Full-time', location: 'Remote' });
      alert("Job posted successfully!");
    } catch (err) {
      alert("Failed to post job. Is your backend running?");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id));
        setViewingJob(null); // Close detail view on mobile after delete
      } catch (error) {
        alert("Failed to delete job");
      }
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-10 h-10 border-4 border-[#000035] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-10">
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-50"><Menu size={22} /></button>
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
      </header>

      <main className="mt-16 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
        {/* Responsive Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Job Management</h1>
            <p className="text-slate-500 text-sm">Managing {jobs.length} active job openings.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-[#000035] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg">
            <Plus size={18} /> Post New Job
          </button>
        </div>

        {/* Jobs Table Wrapper - Responsive overflow handling */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto"> 
            <table className="w-full text-left min-w-[600px] sm:min-w-full"> 
              <thead className="bg-slate-50 text-slate-600 text-[12px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Job Details</th>
                  <th className="px-4 py-4 hidden sm:table-cell">Department</th>
                  <th className="px-4 py-4 hidden md:table-cell">Type</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><Briefcase size={18} /></div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">{job.title}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12}/> {job.location}</p>
                          {/* Mobile-only info tags */}
                          <div className="flex gap-2 mt-1 sm:hidden">
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">{job.department}</span>
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-900 font-bold">{job.type}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-slate-600 hidden sm:table-cell">{job.department}</td>
                    <td className="px-4 py-5 font-bold text-slate-900 hidden md:table-cell">{job.type}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleDelete(job._id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- ADD JOB MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Post New Job</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddJob} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Job Title</label>
                <input 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#000035]"
                  placeholder="e.g. Frontend Developer"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Department</label>
                <input 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#000035]"
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none appearance-none"
                    value={newJob.type}
                    onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                  <input 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#000035]"
                    placeholder="e.g. Lagos"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#000035] text-white py-4 rounded-xl font-bold mt-4 hover:bg-slate-800 transition-colors">
                Publish Job Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}