import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Send, MoreVertical, ChevronLeft, Paperclip, Loader2, Mail 
} from 'lucide-react';
import Topbar from '../Components/Topbar'; 
import { fetchCandidates } from '../api/index'; 

// Production API base URL
const API_BASE_URL = 'https://staffsync-career-backend.vercel.app/api';

export default function Inbox({ setSidebarOpen }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  // Fetch Candidates
  useEffect(() => {
    const getCandidates = async () => {
      setLoading(true);
      try {
        const data = await fetchCandidates();
        let allCandidates = Array.isArray(data) ? data : [];
        allCandidates.sort((a, b) => {
          if (b.createdAt && a.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
          return b._id.toString().localeCompare(a._id.toString());
        });
        setCandidates(allCandidates);
      } catch (error) {
        console.error("Failed to load candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    getCandidates();
  }, []);

  // Fetch History
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!activeChat) return;
      try {
        const candidateId = activeChat._id || activeChat.id;
        const response = await fetch(`${API_BASE_URL}/messages/history/${candidateId}`);
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        setMessages([]);
      }
    };
    fetchChatHistory();
  }, [activeChat]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;
    const candidateId = activeChat._id || activeChat.id;
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId, sender: 'me', text: newMessage })
      });
      const savedMsg = await response.json();
      setMessages((prev) => [...prev, {
        ...savedMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const name = c.name || c.fullName || "";
    const role = c.jobTitle || c.position || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           role.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="w-10 h-10 text-[#000035] animate-spin mb-4" />
      <p className="text-slate-500 font-medium">Syncing candidates...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
      <Topbar setSidebarOpen={setSidebarOpen} />

      {/* 
          FIXED LAYOUT:
          - lg:ml-64 matches your Sidebar width exactly.
          - Removed 'w-full' to prevent the layout from pushing past the screen edge.
          - h-screen ensures the chat occupies the full vertical space.
      */}
      <main className="flex-grow pt-16 flex lg:ml-64 h-screen transition-all duration-300 overflow-hidden">
        <div className="flex w-full h-full bg-white shadow-sm overflow-hidden">
          
          {/* LIST SECTION */}
          <div className={`w-full md:w-80 lg:w-[380px] border-r border-slate-100 flex flex-col bg-white ${activeChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-6 border-b border-slate-50">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search candidates..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#000035]/10"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar">
              {filteredCandidates.map((candidate) => (
                <div 
                  key={candidate._id}
                  onClick={() => setActiveChat(candidate)}
                  className={`p-4 mx-3 my-1 rounded-2xl cursor-pointer transition-all flex items-center gap-4 border ${
                    activeChat?._id === candidate._id 
                    ? 'bg-[#000035] text-white border-[#000035] shadow-md' 
                    : 'hover:bg-slate-50 border-transparent text-slate-900'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center font-bold ${
                    activeChat?._id === candidate._id ? 'bg-white/20' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {(candidate.name || candidate.fullName || "?").charAt(0)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold truncate text-sm">
                      {candidate.name || candidate.fullName}
                    </h3>
                    <p className={`text-xs truncate ${activeChat?._id === candidate._id ? 'text-blue-100' : 'text-slate-500'}`}>
                      {candidate.jobTitle || 'Applicant'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHAT SECTION */}
          <div className={`flex-grow flex flex-col bg-[#F9FAFB] ${activeChat ? 'flex' : 'hidden md:flex'}`}>
            {activeChat ? (
              <>
                <div className="h-20 px-6 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setActiveChat(null)} className="md:hidden p-2 text-slate-600">
                      <ChevronLeft size={24} />
                    </button>
                    <div className="w-11 h-11 rounded-2xl bg-[#000035] text-white flex items-center justify-center font-bold">
                      {(activeChat.name || activeChat.fullName || "?").charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{activeChat.name || activeChat.fullName}</h3>
                      <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Conversation</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
                  {messages.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'me' ? 'bg-[#000035] text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                      }`}>
                        {msg.text}
                        <p className={`text-[10px] mt-2 ${msg.sender === 'me' ? 'text-white/50 text-right' : 'text-slate-400'}`}>
                          {msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>

                <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                  <form onSubmit={handleSend} className="flex items-center gap-3 max-w-4xl mx-auto bg-slate-50 p-2 pl-4 rounded-2xl border border-slate-200 focus-within:border-[#000035]/20 focus-within:ring-4 focus-within:ring-[#000035]/5 transition-all">
                    <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors"><Paperclip size={20} /></button>
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write your message..." 
                      className="flex-grow bg-transparent border-none outline-none text-sm py-2 px-1"
                    />
                    <button type="submit" className="p-3 bg-[#000035] text-white rounded-xl shadow-md hover:bg-[#000050] active:scale-95 transition-all">
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-white">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-4 border border-slate-100">
                  <Mail size={32} className="text-slate-300" />
                </div>
                <h3 className="text-slate-900 text-lg font-bold">Your Inbox</h3>
                <p className="text-sm max-w-xs mt-1 text-slate-500">Select a candidate from the list to start a conversation or view history.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}