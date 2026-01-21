
import React from 'react';
import { 
  Flame, 
  Calendar, 
  Award, 
  Dumbbell, 
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Target
} from 'lucide-react';
import { UserProfile, SubscriptionStatus } from '../types';
import Heatmap from './Heatmap';

interface MemberViewProps {
  user: UserProfile;
  activeTab: string;
}

const MemberView: React.FC<MemberViewProps> = ({ user, activeTab }) => {
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setTimeout(() => alert('Successfully checked in to AZ Fitness!'), 500);
  };

  const heatmapData = React.useMemo(() => {
    return Array.from({ length: 52 }, () => 
      Array.from({ length: 7 }, () => Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0)
    );
  }, []);

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
              ATHLETE: {user.name.split(' ')[0]}
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">
              STATUS: <span className="text-[#39FF14]">OPERATIONAL</span>
            </p>
          </div>
          
          <button 
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all shadow-xl ${
              isCheckedIn 
              ? 'bg-slate-800 text-slate-500 cursor-default' 
              : 'bg-white text-black hover:bg-[#39FF14] hover:scale-105 active:scale-95'
            }`}
          >
            {isCheckedIn ? <CheckCircle2 size={20} className="text-[#39FF14]" /> : <Clock size={20} />}
            {isCheckedIn ? 'STATION SECURED' : 'CHECK-IN STATION'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Heatmap Card */}
          <div className="md:col-span-2 bg-[#121212] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Calendar size={120} className="text-white" />
            </div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black italic text-xl uppercase tracking-tighter flex items-center gap-2">
                <Calendar size={20} className="text-[#39FF14]" />
                Consistency Matrix
              </h3>
              <div className="bg-[#39FF14]/10 text-[#39FF14] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Lvl {Math.floor(user.streak / 5) + 1}
              </div>
            </div>
            <Heatmap data={heatmapData} />
          </div>

          {/* Daily Goal Card */}
          <div className="bg-[#121212] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-black italic text-xl uppercase tracking-tighter flex items-center gap-2 mb-6">
                <Target size={20} className="text-blue-500" />
                Daily Objective
              </h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                Consume 2,800 kcal & hit 15,000 steps today.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                    <span>Protein</span>
                    <span>180g / 200g</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                    <span>Activity</span>
                    <span>45m / 60m</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#39FF14] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all">
              Edit Goals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#121212] border border-slate-800 p-6 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute -bottom-2 -right-2 opacity-5">
              <Flame size={64} />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Streak</p>
            <h3 className="text-3xl font-black mt-1 text-[#39FF14]">{user.streak} <span className="text-xs uppercase">Days</span></h3>
          </div>
          <div className="bg-[#121212] border border-slate-800 p-6 rounded-[2rem]">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Membership</p>
            <h3 className={`text-lg font-black mt-2 uppercase ${user.subscription?.status === SubscriptionStatus.ACTIVE ? 'text-blue-400' : 'text-red-400'}`}>
              {user.subscription?.status || 'Inactive'}
            </h3>
          </div>
          <div className="bg-[#121212] border border-slate-800 p-6 rounded-[2rem]">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Next Payment</p>
            <h3 className="text-lg font-black mt-2 text-slate-200">
              {user.subscription?.end_date || 'N/A'}
            </h3>
          </div>
          <div className="bg-[#121212] border border-slate-800 p-6 rounded-[2rem] bg-gradient-to-br from-[#121212] to-slate-900">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Lvl Progress</p>
            <h3 className="text-lg font-black mt-2 text-slate-200">
              840 / 1000 XP
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#121212] border border-slate-800 rounded-[2.5rem] p-8 hover:border-[#39FF14]/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-black italic text-xl uppercase tracking-tighter">Latest Protocol</h3>
               <ChevronRight className="text-slate-600 group-hover:text-[#39FF14] transition-colors" />
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-bold text-slate-200">Squats</span>
                  </div>
                  <span className="font-black text-[#39FF14]">3 x 8 @ 225lbs</span>
               </div>
               <div className="flex justify-between items-center text-sm p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-bold text-slate-200">Leg Press</span>
                  </div>
                  <span className="font-black text-[#39FF14]">4 x 12 @ 400lbs</span>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-black italic text-xl uppercase tracking-tighter px-2">Elite Achievements</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: '10 Days', icon: Award, color: 'text-orange-400', label: 'Iron Will' },
                { name: 'Elite', icon: TrendingUp, color: 'text-blue-400', label: 'Plateau Breaker' },
                { name: 'Dawn', icon: Clock, color: 'text-[#39FF14]', label: 'Early Grinder' },
              ].map((badge, i) => (
                <div key={i} className="bg-[#121212] border border-slate-800 p-5 rounded-3xl flex flex-col items-center hover:bg-slate-800/50 transition-all border-b-4 border-b-slate-800 hover:border-b-[#39FF14]">
                  <badge.icon size={32} className={`${badge.color} mb-3`} />
                  <span className="text-[10px] font-black uppercase text-white tracking-tighter">{badge.label}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-8 text-center text-slate-500">Module coming soon...</div>;
};

export default MemberView;
