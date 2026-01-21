
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Dumbbell } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the Forge, Athlete. I am your AZ AI Coach. Tell me your goals, available equipment, or current plateaus, and I will design your next evolution." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize AI chat session
  const chatRef = useRef<any>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the AZ Fitness AI Coach, an elite specialist in strength training, hypertrophy, and functional fitness. 
        Your goal is to provide science-based workout routines and suggestions tailored to the AZ Fitness Gym experience.
        Guidelines:
        - Be professional, technical, and motivating.
        - Refer to the user as "Athlete".
        - Always format routines in clean Markdown (use tables for sets/reps/weight).
        - Suggest specific exercises found in professional gyms (squats, bench, deadlifts, machines).
        - Keep responses focused on fitness and recovery.
        - If asked about diet, give general macro guidance but prioritize training protocols.`,
      },
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessageStream({ message: userMessage });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of response) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection to the Forge interrupted. Please check your credentials and retry." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none flex items-center gap-3">
            <Sparkles className="text-[#39FF14]" />
            Forge AI Coach
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
            NEURAL PROTOCOL: ACTIVE
          </p>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#39FF14] to-blue-600"></div>
        
        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 border-slate-700 text-blue-400' 
                  : 'bg-[#0a0a0a] border-[#39FF14]/30 text-[#39FF14]'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`rounded-[2rem] p-5 text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-900/50 border border-slate-800 text-slate-200 rounded-tl-none prose prose-invert max-w-none'
                }`}>
                  {msg.text ? (
                    <div className="whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  ) : (
                    <Loader2 className="animate-spin text-[#39FF14]" size={18} />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length-1].role === 'user' && (
            <div className="flex justify-start animate-pulse">
               <div className="flex gap-3 max-w-[75%]">
                <div className="w-10 h-10 rounded-2xl bg-[#0a0a0a] border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14]">
                  <Bot size={20} />
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] rounded-tl-none p-5">
                  <Loader2 className="animate-spin" size={18} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#0a0a0a] border-t border-slate-800">
          <form onSubmit={handleSend} className="relative flex items-center gap-3">
            <input 
              type="text"
              placeholder="e.g. Design a 4-day push/pull/legs split for hypertrophy..."
              className="flex-1 bg-[#121212] border border-slate-800 rounded-2xl py-4 pl-6 pr-14 outline-none focus:border-[#39FF14] transition-all font-medium text-slate-200"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bg-[#39FF14] text-black p-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              <Send size={20} strokeWidth={3} />
            </button>
          </form>
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              "3-day split",
              "Fat loss routine",
              "Strength plateau",
              "Home workout",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap bg-slate-900 border border-slate-800 text-slate-500 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
