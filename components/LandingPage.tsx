
import React from 'react';
import { 
  Dumbbell, 
  Zap, 
  Shield, 
  Trophy, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Play,
  TrendingUp,
  Target
} from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#39FF14] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#39FF14] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              <Dumbbell className="text-black" size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">AZ<span className="text-[#39FF14]">FITNESS</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#philosophy" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#39FF14] transition-colors">Philosophy</a>
            <a href="#arsenal" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#39FF14] transition-colors">Arsenal</a>
            <a href="#results" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#39FF14] transition-colors">Results</a>
          </div>

          <button 
            onClick={onLoginClick}
            className="bg-white text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#39FF14] hover:scale-105 transition-all active:scale-95"
          >
            Authenticate
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-4 py-1.5 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="text-[#39FF14]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#39FF14]">The Future of Human Performance</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            STRONGER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-white to-blue-500">BY DESIGN.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Welcome to the Forge. We've combined elite biomechanics with real-time neural tracking to deliver the most efficient evolution protocol on the planet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <button 
              onClick={onLoginClick}
              className="group bg-[#39FF14] text-black font-black px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(57,255,20,0.2)] uppercase tracking-widest italic flex items-center gap-3"
            >
              START EVOLUTION
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-slate-800 overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
              <div className="h-10 px-3 rounded-full border-2 border-[#0a0a0a] bg-slate-900 flex items-center justify-center text-[10px] font-black italic">
                +420 ATHLETES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Target,
              title: "Absolute Precision",
              desc: "Every rep, set, and heart rate spike is captured by our central Forge Core. No guesswork, just pure math.",
              color: "text-blue-500"
            },
            {
              icon: Shield,
              title: "Elite Standards",
              desc: "AZ isn't a social club. It's a sanctuary for high-performance individuals dedicated to shattering plateaus.",
              color: "text-[#39FF14]"
            },
            {
              icon: TrendingUp,
              title: "Rapid Evolution",
              desc: "Our AI-driven programming adapts to your daily biometric output to ensure linear progress without burnout.",
              color: "text-yellow-400"
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#121212] border border-white/5 p-10 rounded-[3rem] hover:border-[#39FF14]/30 transition-all group">
              <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform ${item.color}`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto Banner */}
      <section className="py-24 px-6 overflow-hidden bg-[#121212] border-y border-white/5 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full flex items-center gap-10 text-[20vw] font-black italic uppercase tracking-tighter whitespace-nowrap leading-none select-none">
            NO EXCUSES NO EXCUSES NO EXCUSES
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Star className="mx-auto text-[#39FF14] mb-8" size={48} fill="#39FF14" />
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight mb-10">
            "Suffer the pain of discipline, or suffer the pain of regret. The choice is made every morning at 05:00."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-1 bg-[#39FF14]"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">The AZ Manifesto</p>
          </div>
        </div>
      </section>

      {/* Arsenal Section */}
      <section id="arsenal" className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop" 
              alt="Gym" 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10">
               <div className="flex gap-1 text-[#39FF14] mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
               </div>
               <p className="text-xl font-black italic uppercase tracking-tight">"The most advanced facility I've ever trained in."</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">— Mark Thorne, Pro Athlete</p>
            </div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#39FF14] rounded-[2.5rem] p-8 flex flex-col justify-end shadow-2xl shadow-[#39FF14]/20 -z-10 animate-bounce duration-[3000ms]">
            <Trophy className="text-black mb-auto" size={32} />
            <span className="text-black font-black text-2xl tracking-tighter italic">#1</span>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none mb-6">UNRIVALED <br /><span className="text-[#39FF14]">ARSENAL.</span></h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              We've curated the highest-spec equipment globally. Every machine is calibrated for optimal load profiling and peak contraction.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: CheckCircle2, text: "AI-Integrated Biometric Strength Racks" },
              { icon: CheckCircle2, text: "Cryo-Regeneration & Recovery Lab" },
              { icon: CheckCircle2, text: "Forge AI Personal Protocol Engine" },
              { icon: CheckCircle2, text: "Tier 1 Certified Elite Human Performance Coaches" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white group">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-black transition-colors">
                  <feature.icon size={16} strokeWidth={3} />
                </div>
                {feature.text}
              </div>
            ))}
          </div>

          <button 
            onClick={onLoginClick}
            className="flex items-center gap-4 text-[#39FF14] font-black uppercase tracking-widest text-sm italic group hover:text-white transition-colors"
          >
            EXPLORE THE FACILITY
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-8">READY TO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-blue-500">TRANSCEND?</span></h2>
        <p className="text-slate-500 text-lg mb-12">Average is a virus. We are the cure. Join the elite.</p>
        <button 
          onClick={onLoginClick}
          className="bg-white text-black font-black px-12 py-6 rounded-2xl text-lg uppercase tracking-widest italic hover:bg-[#39FF14] transition-all hover:scale-110 active:scale-95 shadow-2xl shadow-white/5"
        >
          CLAIM YOUR SPOT
        </button>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">AZ FITNESS © 2024</span>
           <div className="flex gap-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">INSTAGRAM</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">TWITTER</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">YOUTUBE</span>
           </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
