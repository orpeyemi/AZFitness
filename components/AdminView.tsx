
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Search,
  ChevronRight,
  Clock,
  Activity,
  CreditCard,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { UserProfile, SubscriptionStatus } from '../types';
import { MOCK_USERS } from '../constants';

const AdminView: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const stats = [
    { label: 'Total Members', value: '421', icon: Users, color: 'text-blue-400' },
    { label: 'Retention Rate', value: '94.2%', icon: TrendingUp, color: 'text-[#39FF14]' },
    { label: 'Revenue (MTD)', value: '$12,840', icon: DollarSign, color: 'text-yellow-400' },
    { label: 'Action Required', value: '23', icon: AlertTriangle, color: 'text-red-400' },
  ];

  const revenueData = [
    { month: 'Jan', amount: 9200 },
    { month: 'Feb', amount: 11800 },
    { month: 'Mar', amount: 10500 },
    { month: 'Apr', amount: 12200 },
    { month: 'May', amount: 13100 },
    { month: 'Jun', amount: 12840 },
  ];

  const expiringMembers = MOCK_USERS.filter(u => u.subscription?.status === SubscriptionStatus.EXPIRED);
  const activeMembers = MOCK_USERS.filter(u => u.subscription?.status === SubscriptionStatus.ACTIVE);

  const filteredMembers = MOCK_USERS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-10 animate-in fade-in duration-700 pb-12">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Operations Control</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Sector: AZ-ALPHA-7</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#121212] border border-slate-800 p-8 rounded-[2.5rem] shadow-xl hover:border-slate-700 transition-all border-b-8 border-b-slate-900">
              <div className={`p-3 w-14 h-14 rounded-2xl bg-slate-900 mb-6 flex items-center justify-center ${stat.color} shadow-lg border border-slate-800`}>
                <stat.icon size={28} />
              </div>
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-3xl font-black mt-2 tracking-tighter italic">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#121212] border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="font-black italic text-2xl uppercase tracking-tighter flex items-center gap-3">
                    <TrendingUp className="text-[#39FF14]" />
                    Performance Index
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">12 Months</span>
                  </div>
               </div>
               <div className="h-80">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={revenueData}>
                     <defs>
                       <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#39FF14" stopOpacity={0.1}/>
                         <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                     <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #334155', borderRadius: '16px', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="amount" stroke="#39FF14" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-[#121212] border border-slate-800 p-10 rounded-[3rem] shadow-2xl">
               <h3 className="font-black italic text-xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                 <CreditCard className="text-blue-500" />
                 Critical Subscriptions
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {expiringMembers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-5 bg-red-500/5 rounded-3xl border border-red-500/10 hover:border-red-500/30 transition-all">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-black italic">
                           {user.name.charAt(0)}
                         </div>
                         <div>
                           <p className="text-sm font-black italic">{user.name}</p>
                           <p className="text-[8px] text-red-500 font-black uppercase tracking-widest">Expired {user.subscription?.end_date}</p>
                         </div>
                       </div>
                       <button className="text-[10px] font-black uppercase text-blue-500 hover:text-white transition-colors">Alert</button>
                    </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#121212] border border-slate-800 p-10 rounded-[3rem] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black italic text-xl uppercase tracking-tighter flex items-center gap-3">
                  <Clock className="text-[#39FF14]" />
                  Live Station Feed
                </h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'John Wick', time: '2m', action: 'Bench Press @ 315lbs', type: 'log' },
                  { name: 'Alex Johnson', time: '12m', action: 'Station Secured', type: 'in' },
                  { name: 'Mike Ross', time: '45m', action: 'Incline DB Press', type: 'log' },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== 2 && <div className="absolute left-[7px] top-6 w-0.5 h-10 bg-slate-800"></div>}
                    <div className="w-4 h-4 rounded-full bg-slate-800 border-4 border-slate-900 z-10 mt-1"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black italic text-slate-200">{activity.name}</p>
                        <span className="text-[8px] font-black text-slate-600 uppercase">{activity.time} ago</span>
                      </div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-[#39FF14] mt-0.5">{activity.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-slate-900 border border-slate-800 text-slate-400 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:text-white hover:border-slate-700 transition-all">
                Access Archives
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[3rem] shadow-2xl text-white">
               <PieChart className="mb-4 opacity-50" size={32} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Projected Growth</p>
               <h4 className="text-4xl font-black italic tracking-tighter mt-2">+22.4%</h4>
               <p className="text-[10px] font-bold mt-4 leading-relaxed opacity-80">
                 Market analysis indicates sustained athlete registration increase throughout Q3.
               </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'members') {
    return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Athlete Database</h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Accessing Directory: FORGE-INT-01</p>
          </div>
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#39FF14] transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Query athlete identifier..."
              className="bg-[#121212] border border-slate-800 rounded-2xl py-4 pl-14 pr-6 w-full focus:outline-none focus:border-[#39FF14] transition-all font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-[#121212] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40">
                  <th className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Athlete identifier</th>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Contractual status</th>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Registration</th>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/20 transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black italic text-xl shadow-lg text-[#39FF14] group-hover:scale-110 transition-transform">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black italic tracking-tight text-lg uppercase">{member.name}</p>
                          <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`inline-flex items-center px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                        member.subscription?.status === SubscriptionStatus.ACTIVE 
                        ? 'bg-[#39FF14]/5 text-[#39FF14] border-[#39FF14]/20'
                        : 'bg-red-500/5 text-red-400 border-red-500/20'
                      }`}>
                        {member.subscription?.status || 'No Record'}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-black italic text-slate-500">{new Date(member.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-10 py-8">
                      <button className="p-4 bg-slate-900 border border-slate-800 hover:bg-[#39FF14] hover:text-black hover:border-transparent rounded-2xl transition-all shadow-md active:scale-95">
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminView;
