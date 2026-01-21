
import React from 'react';
import { UserProfile, UserRole } from './types';
import { MOCK_USERS } from './constants';
import Layout from './components/Layout';
import AdminView from './components/AdminView';
import MemberView from './components/MemberView';
import WorkoutView from './components/WorkoutView';
import ChatBot from './components/ChatBot';
import HomeView from './components/HomeView';
import LandingPage from './components/LandingPage';
import { LogIn, Lock, Mail, Dumbbell, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = React.useState('home');
  const [showLogin, setShowLogin] = React.useState(false);
  
  const [authEmail, setAuthEmail] = React.useState('');
  const [authPassword, setAuthPassword] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    // Simulate Supabase Auth delay
    setTimeout(() => {
      const foundUser = MOCK_USERS.find(u => u.email === authEmail);
      if (foundUser && authPassword === 'password') {
        setUser(foundUser);
        setActiveTab('home');
      } else {
        setError('Unauthorized access. Use demo credentials.');
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthEmail('');
    setAuthPassword('');
    setShowLogin(false);
    setActiveTab('home');
  };

  if (!user && !showLogin) {
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  if (!user && showLogin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#0a0a0a] to-[#0a0a0a]">
        <button 
          onClick={() => setShowLogin(false)}
          className="fixed top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-[#39FF14] transition-colors font-black uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} />
          BACK TO PORTAL
        </button>
        
        <div className="w-full max-w-md space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-[#39FF14] via-[#0070f3] to-slate-900 mb-8 shadow-[0_0_50px_rgba(57,255,20,0.15)] relative group overflow-hidden">
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Dumbbell className="text-black relative z-10" size={48} strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter mb-3 uppercase leading-none">AZ<span className="text-[#39FF14]">FITNESS</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Forging Elite Standards</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#121212]/80 backdrop-blur-xl border border-slate-800/50 p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#39FF14] to-blue-600"></div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">Secure Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-[#39FF14] transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@azfitness.com"
                  className="w-full bg-[#0a0a0a] border border-slate-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#39FF14]/50 transition-all font-medium text-slate-200"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-[#39FF14] transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-slate-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#39FF14]/50 transition-all font-medium text-slate-200"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#39FF14] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(57,255,20,0.2)]"
            >
              {isLoggingIn ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} strokeWidth={3} />
                  AUTHENTICATE
                </>
              )}
            </button>
          </form>

          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 p-6 rounded-3xl text-[10px] text-slate-500 text-center font-bold tracking-widest leading-loose">
            <p className="text-slate-400 mb-2 font-black italic">DEMO ACCESS PROTOCOL</p>
            <p>ADMIN: admin@azfitness.com | password</p>
            <p>MEMBER: member@azfitness.com | password</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === 'home') return <HomeView />;
    
    if (user!.role === UserRole.ADMIN) {
      return <AdminView activeTab={activeTab} />;
    } else {
      switch (activeTab) {
        case 'dashboard': return <MemberView user={user!} activeTab={activeTab} />;
        case 'workouts': return <WorkoutView />;
        case 'forge-ai': return <ChatBot />;
        case 'history':
        case 'profile':
          return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-6">
               <div className="w-20 h-20 bg-slate-900/50 rounded-[2rem] flex items-center justify-center border border-slate-800">
                 <Lock size={32} className="text-slate-700" />
               </div>
               <div className="text-center">
                 <h3 className="font-black italic text-xl uppercase tracking-tighter text-slate-300">{activeTab} MODULE</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mt-2">Access restricted in preview mode</p>
               </div>
            </div>
          );
        default: return <HomeView />;
      }
    }
  };

  return (
    <Layout user={user!} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
