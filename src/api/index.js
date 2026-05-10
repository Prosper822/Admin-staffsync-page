import axios from 'axios';

// 1. Keep the base URL as the root of your admin API
const API_URL = "https://staffsync-career-backend.vercel.app/api/admin";

/**
 * Fetches all candidates/applicants from the database.
 */
export const fetchCandidates = async () => {
  try {
    const response = await axios.get(`${API_URL}/candidates`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

// ... fetch clients...

export const fetchClients = async () => {
  try {
    // Using your production Vercel URL
    const response = await fetch('https://staffsync-career-backend.vercel.app/api/clients');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return []; // Return empty array to prevent map errors in UI
  }
};

export const fetchPublicJobs = async () => {
    // We point to /api/career instead of /api/admin
    const PUBLIC_URL = "https://staffsync-career-backend.vercel.app/api/career";
    const response = await axios.get(PUBLIC_URL); 
    return response.data;
};

export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/candidates/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};

// jobs
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// create jobs
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// delete job
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

/**
 * Updates a candidate's status.
 */
export const updateCandidateStatus = async (id, status) => {
  try {
    // This will now correctly call: https://staffsync-career-backend.vercel.app/api/admin/candidates/[id]
    const response = await axios.patch(`${API_URL}/candidates/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
};

