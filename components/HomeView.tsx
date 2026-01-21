
import React from 'react';
import { Shield, Zap, Target, Trophy, ChevronRight, Play, Star, Heart, Brain, Waves } from 'lucide-react';

const HomeView: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-blue-900/30 z-0"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-4 py-1.5 rounded-full mb-8">
            <Heart size={14} className="text-[#39FF14]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#39FF14]">Holistic Vitality Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8">
            MASTER YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-blue-500">WELLNESS</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            AZ Fitness is your ultimate sanctuary for physical mastery and mental clarity. We bridge the gap between high-performance training and sustainable wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-[#39FF14] text-black font-black px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(57,255,20,0.2)] uppercase tracking-widest text-sm italic">
              Begin Your Journey
            </button>
            <button className="bg-slate-900 border border-slate-800 text-white font-black px-10 py-5 rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-sm italic">
              Our Wellness Philosophy
            </button>
          </div>
        </div>
      </section>

      {/* Wellness Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Zap,
            title: "Physical Excellence",
            text: "Precision strength and conditioning tailored to your unique biomechanics. Build a body that is as functional as it is aesthetic.",
            color: "text-[#39FF14]",
            bg: "bg-[#39FF14]/5"
          },
          {
            icon: Waves,
            title: "Restorative Science",
            text: "Access cutting-edge recovery protocols from cryotherapy to infrared saunas. Optimization doesn't stop when you leave the gym floor.",
            color: "text-blue-500",
            bg: "bg-blue-500/5"
          },
          {
            icon: Brain,
            title: "Mental Resilience",
            text: "Fitness is a cognitive discipline. We provide the environment and tools to sharpen your focus and reduce oxidative stress.",
            color: "text-purple-500",
            bg: "bg-purple-500/5"
          }
        ].map((item, i) => (
          <div key={i} className="bg-[#121212] border border-slate-800 p-10 rounded-[2.5rem] hover:border-slate-700 transition-all group relative overflow-hidden">
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${item.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform ${item.color}`}>
              <item.icon size={32} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{item.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Wellness Manifesto Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900/40 border border-slate-800 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mb-48"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-[1.1] mb-8">
              "True strength is the harmony between a powerful body and a peaceful mind. Invest in your longevity today."
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-16 h-1.5 bg-[#39FF14] rounded-full"></div>
              <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">The AZ Wellness Creed</p>
            </div>
          </div>
          <div className="flex-shrink-0">
             <div className="w-40 h-40 rounded-full border-2 border-white/5 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[#39FF14]/5 blur-xl rounded-full animate-pulse"></div>
               <Shield size={64} className="text-[#39FF14] relative z-10" />
             </div>
          </div>
        </div>
      </section>

      {/* Holistic Arsenal Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">THE WELLNESS <br /><span className="text-[#39FF14]">ECOSYSTEM</span></h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              Our facility isn't just a place to lift—it's a comprehensive platform for human optimization. We provide the equipment, the data, and the recovery protocols to ensure you thrive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Smart Biometrics", desc: "Real-time tracking of your exertion and recovery." },
              { title: "Cryo-Recovery", desc: "Advanced thermal therapy for rapid muscle repair." },
              { title: "Forge AI Coach", desc: "Personalized programming that evolves with you." },
              { title: "Nutritional Bar", desc: "Precision-fueled macros to power your day." }
            ].map((feature, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#39FF14]"></div>
                  <h4 className="font-black italic uppercase text-sm tracking-tight">{feature.title}</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed ml-5">{feature.desc}</p>
              </div>
            ))}
          </div>

          <button className="group flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs italic bg-slate-900 border border-slate-800 px-8 py-4 rounded-xl hover:border-[#39FF14]/50 transition-all">
            Tour the Wellness Suite
            <ChevronRight className="group-hover:translate-x-2 transition-transform text-[#39FF14]" size={16} />
          </button>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-[3.5rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
              alt="Gym Wellness" 
              className="object-cover w-full h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                <Play size={32} fill="white" className="ml-1 text-white" />
              </div>
            </div>
            <div className="absolute bottom-10 left-10 right-10 p-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-slate-800 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14] flex items-center justify-center text-black">
                  <Star size={24} fill="black" />
                </div>
                <div>
                  <p className="text-sm font-black italic uppercase tracking-tight">The Gold Standard</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Voted Best Wellness Gym 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Footer */}
      <section className="text-center py-32 border-t border-slate-900 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
            YOUR BODY IS A <span className="text-[#39FF14]">TEMPLE.</span> <br />
            BUILD IT WELL.
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
            AZ FITNESS • WELLNESS REIMAGINED
          </p>
          <div className="flex justify-center gap-12 opacity-20 grayscale grayscale-100">
             <Trophy size={48} />
             <Target size={48} />
             <Shield size={48} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
