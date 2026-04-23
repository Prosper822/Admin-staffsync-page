import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, MoreVertical, Menu, Bell, Phone, Video, ChevronLeft } from 'lucide-react';

const contacts = [
  { id: 1, name: "Sarah Johnson", online: true, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "TechSolutions HR", online: false, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Michael Brown", online: true, avatar: "https://i.pravatar.cc/150?u=3" },
];

export default function Messages({ setSidebarOpen }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState("");
  
  // Fake message history state
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'them', text: "Hello! I'm interested in the job position.", time: "10:00 AM" },
    { id: 2, sender: 'me', text: "Great! We saw your application.", time: "10:05 AM" }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, newMessage]);
    setInputText(""); // Clear input
  };

  return (
    <div className="w-full bg-[#F8FAFC] h-screen overflow-hidden flex flex-col">
      {/* Header logic (Same as before) */}
      <header className={`h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 left-0 lg:left-64 px-4 md:px-8 items-center justify-between transition-all ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 cursor-pointer rounded-xl hover:bg-slate-50"><Menu size={22} /></button>
          <h2 className="text-sm font-bold text-slate-800">Messages</h2>
        </div>
      </header>

      <main className="mt-16 h-[calc(100vh-64px)] flex overflow-hidden">
        {/* Contacts Sidebar */}
        <div className={`w-full md:w-80 bg-white border-r border-slate-200 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
           <div className="p-4 border-b border-slate-100">
             <input 
               className="w-full pl-4 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
               placeholder="Search chats..." 
             />
           </div>
           <div className="flex-1 overflow-y-auto">
             {contacts.map((c) => (
               <div key={c.id} onClick={() => setSelectedChat(c)} className="p-4 cursor-pointer hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50">
                 <img src={c.avatar} className="w-11 h-11 rounded-full" alt="" />
                 <p className="text-sm font-bold text-slate-900">{c.name}</p>
               </div>
             ))}
           </div>
        </div>

        {/* Chat Window */}
        <div className={`flex-1 flex flex-col bg-slate-50/50 ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedChat(null)} className="md:hidden p-2"><ChevronLeft size={24} /></button>
                  <img src={selectedChat.avatar} className="w-9 h-9 rounded-full" alt="" />
                  <p className="text-sm font-bold text-slate-900">{selectedChat.name}</p>
                </div>
              </div>

              {/* MESSAGES AREA - Now mapping from state */}
              <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-[70%] text-sm shadow-sm ${
                      msg.sender === 'me' 
                      ? 'bg-[#000035] text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                      <p className={`text-[9px] mt-1 opacity-70 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} /> {/* Anchor for auto-scroll */}
              </div>

              {/* INPUT AREA - Form handles 'Enter' to send */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
                <div className="flex items-center gap-2 max-w-[1000px] mx-auto">
                  <button type="button" className="p-2 text-slate-400"><Paperclip size={20}/></button>
                  <input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" 
                    placeholder="Type a message..." 
                  />
                  <button 
                    type="submit"
                    className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700"
                  >
                    <Send size={18}/>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-slate-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </main>
    </div>
  );
}