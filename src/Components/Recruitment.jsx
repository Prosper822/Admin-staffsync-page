import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, FileText, RefreshCw, User, Mail, Briefcase, ExternalLink } from 'lucide-react';
import Topbar from './Topbar';
import Swal from 'sweetalert2';

const Recruitment = ({ setSidebarOpen }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your real production API URL
  const API_BASE_URL = "https://staffsync-career-backend.vercel.app";

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/candidates`);
      const data = await response.json();
      setCandidates([...data].reverse());
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

const handleStatusUpdate = async (id, status, applicantEmail, applicantName) => {
  // Replace window.confirm with Swal.fire
  const result = await Swal.fire({
    title: 'Confirm Decision',
    text: `Send real ${status} email to ${applicantName}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000035', // StaffSync Navy
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes, ${status} them!`
  });

  if (!result.isConfirmed) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, email: applicantEmail, name: applicantName })
    });

    if (response.ok) {
      // Replace alert with a success modal
      Swal.fire({
        title: 'Success!',
        text: 'Email sent and status updated.',
        icon: 'success',
        confirmButtonColor: '#000035'
      });
      fetchCandidates();
    }
  } catch (error) {
    // Replace alert with an error modal
    Swal.fire('Error', 'Network error. Is your backend running?', 'error');
  }
};

  return (
    <div className="w-full min-h-screen bg-slate-50">
    
  <Topbar setSidebarOpen={setSidebarOpen} />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Staffing Dashboard</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Review applicant capacities and send hiring decisions directly to their inbox.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[600px]">
            {/* Left Side: Stats/Status (Keeping the Navy Design) */}
            <div className="md:w-1/4 bg-[#000035] p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-8">Quick Stats</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-slate-400 text-xs font-bold tracking-wider">Total Applicants</p>
                    <p className="text-3xl font-bold">{candidates.length}</p>
                  </div>
                  <button 
                    onClick={fetchCandidates}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-medium"
                  >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh List
                  </button>
                </div>
              </div>
              <div className="mt-12 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <p className="text-xs text-slate-300 italic">"Reviewing talent is the first step to scaling StaffSync."</p>
              </div>
            </div>

            {/* Right Side: The Management Table */}
            <div className="md:w-3/4 p-8 overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full text-slate-400">Loading applications...</div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="pb-4 text-sm font-bold text-slate-600 tracking-wider">Candidate</th>
                      <th className="pb-4 text-sm font-bold text-slate-600 tracking-wider">Position</th>
                      <th className="pb-4 text-sm font-bold text-slate-600  tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {candidates.map((app) => (
                      <tr key={app._id} className="group hover:bg-slate-50/50 transition-all">
                        <td className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#000035] font-bold">
                              {app.fullName?.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{app.fullName}</p>
                              <p className="text-[11px] text-slate-400">{app.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5">
                          <span className="text-xs font-semibold text-slate-600">{app.position}</span>
                          <div className={`mt-1 text-[9px] font-bold uppercase ${
                            app.status === 'Hired' ? 'text-emerald-500' : 
                            app.status === 'Rejected' ? 'text-red-500' : 'text-amber-500'
                          }`}>
                            {app.status || 'Pending'}
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <div className="flex justify-end gap-3">
                            {/* HIRE */}
                            <button 
                              onClick={() => handleStatusUpdate(app._id, 'Hired', app.email, app.fullName)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Hire Candidate"
                            >
                              <CheckCircle size={20} />
                            </button>
                            {/* REJECT */}
                            <button 
                              onClick={() => handleStatusUpdate(app._id, 'Rejected', app.email, app.fullName)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject Candidate"
                            >
                              <XCircle size={20} />
                            </button>
                            {/* VIEW CV */}
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-2 text-slate-400 hover:text-[#000035] hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <FileText size={20} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!loading && candidates.length === 0 && (
                <div className="text-center py-20 text-slate-400">No applicants found.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recruitment;