import React, { useState, useEffect } from 'react';
import { Search, Send, User, MoreVertical, Paperclip, Smile, Loader2 } from 'lucide-react';
import Topbar from './Topbar';

export default function Inbox({ setSidebarOpen }) {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://staffsync-career-backend.vercel.app";

  // 1. Fetch all conversations/contacts on mount
  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/messages/conversations`);
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching inbox:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, []);

  // 2. Fetch specific messages when a chat is selected
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/messages/${activeChat._id}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
    
    // Optional: Set up polling to check for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [activeChat]);

  // 3. Send a new message to the backend
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const messageData = {
      recipientId: activeChat._id,
      text: newMessage,
      sender: "Admin" // Or your logged-in user state
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });

      if (response.ok) {
        const savedMsg = await response.json();
        setMessages([...messages, savedMsg]); // Optimistic update
        setNewMessage("");
      }
    } catch (error) {
      alert("Failed to send message. Check connection.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      <Topbar setSidebarOpen={setSidebarOpen} />

      <main className="pt-24 pb-6 px-4 flex-grow flex flex-col">
        <div className="max-w-7xl mx-auto w-full h-[calc(100vh-140px)]  rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex">
          
          {/* Sidebar: Conversation List */}
          <div className="w-full md:w-1/3 border-r border-slate-100 flex flex-col bg-white">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#000035]"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto">
              {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-slate-300" /></div>
              ) : (
                conversations.map((chat) => (
                  <div 
                    key={chat._id}
                    onClick={() => setActiveChat(chat)}
                    className={`p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-slate-50 ${activeChat?._id === chat._id ? 'bg-slate-50 border-r-4 border-[#000035]' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#000035]">
                      {chat.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{chat.name || chat.email}</h4>
                        <span className="text-[10px] text-slate-400">
                          {chat.lastActive ? new Date(chat.lastActive).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{chat.lastMessage || "No messages yet"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main: Chat Window */}
          <div className="hidden md:flex flex-col flex-grow bg-slate-50/30">
            {activeChat ? (
              <>
                <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#000035] text-white flex items-center justify-center font-bold">
                      {activeChat.name?.charAt(0)}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{activeChat.name}</h3>
                  </div>
                </div>

                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                        msg.sender === 'Admin' 
                        ? 'bg-[#000035] text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..." 
                      className="flex-grow bg-transparent border-none text-sm focus:ring-0"
                    />
                    <button type="submit" className="p-3 bg-[#000035] text-white rounded-xl hover:opacity-90 transition-all">
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center text-slate-400">
                <p>Select a candidate to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}