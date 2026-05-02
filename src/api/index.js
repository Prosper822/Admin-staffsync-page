import axios from 'axios';

// Your live Vercel backend URL
const API_URL = "https://staffsync-career-backend.vercel.app";

/**
 * Fetches all candidates/applicants from the database.
 * This is used by both the Admin page for analytics 
 * and the Workers Dashboard for management.
 */
export const fetchCandidates = async () => {
  try {
    // This will now call .../api/admin/candidates
    const response = await axios.get(`${API_URL}/candidates`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

/**
 * Updates a candidate's status (e.g., from 'Pending' to 'Hired').
 * Useful for the Admin page actions.
 */
export const updateCandidateStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/candidates/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
};