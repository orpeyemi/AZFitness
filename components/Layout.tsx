
import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Users, 
  LogOut, 
  User, 
  Calendar, 
  BarChart3,
  Menu,
  X,
  MessageSquareCode,
  Home
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface LayoutProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, activeTab, setActiveTab, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const adminNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Analytics', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'stats', label: 'Revenue', icon: BarChart3 },
  ];

  const memberNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workout', icon: Dumbbell },
    { id: 'forge-ai', label: 'Forge AI', icon: MessageSquareCode },
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const navItems = user.role === UserRole.ADMIN ? adminNav : memberNav;

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#121212] border-r border-slate-800 p-6 fixed h-full z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#39FF14] rounded-lg flex items-center justify-center">
            <Dumbbell className="text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter uppercase">AZ<span className="text-[#39FF14]">Fitness</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#121212] border-b border-slate-800 sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#39FF14] rounded flex items-center justify-center">
            <Dumbbell className="text-black" size={18} />
          </div>
          <h1 className="text-lg font-bold tracking-tighter uppercase">AZ FITNESS</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 z-50 p-8 flex flex-col pt-24 animate-in fade-in slide-in-from-top-4">
          <nav className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-black italic uppercase tracking-tighter transition-all ${
                  activeTab === item.id ? 'bg-[#39FF14] text-black' : 'text-slate-400'
                }`}
              >
                <item.icon size={24} />
                {item.label}
              </button>
            ))}
          </nav>
          <button 
            onClick={onLogout}
            className="mt-auto w-full flex items-center gap-4 px-6 py-4 text-red-400 font-black italic uppercase text-xl"
          >
            <LogOut size={24} />
            LOGOUT
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/90 backdrop-blur-lg border-t border-slate-800 flex justify-around items-center p-2 pb-6 z-40">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              activeTab === item.id ? 'text-[#39FF14]' : 'text-slate-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] mt-1 font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
