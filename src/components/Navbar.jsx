import React from 'react';
import { Droplets, Activity, History, Settings, Info, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ isOffline, lastUpdated }) => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <nav className="bg-app border-b border-app sticky top-0 z-50 px-4 py-3 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-blue/10 p-1.5 rounded-lg">
            <Droplets className="w-6 h-6 text-brand-blue" />
          </div>
          <span className="text-xl font-bold tracking-tight text-app">HydroSense</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-6 mr-6 border-r border-app pr-6">
            <NavLink to="/" icon={<Activity size={18} />} label="Dashboard" />
            <NavLink to="/history" icon={<History size={18} />} label="History" />
            <NavLink to="/settings" icon={<Settings size={18} />} label="Settings" />
            <NavLink to="/about" icon={<Info size={18} />} label="About" />
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-card border border-app text-app hover:bg-brand-blue/10 transition-all mr-2"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isOffline 
                ? 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></span>
                {isOffline ? 'OFFLINE' : 'LIVE'}
              </span>
            </div>
            {lastUpdated && (
              <span className="text-[10px] text-slate-400 mt-0.5">Updated: {lastUpdated}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
        isActive ? 'text-brand-blue' : 'text-slate-500 dark:text-slate-400 hover:text-brand-blue'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-app border-t border-app px-6 py-3 flex justify-between items-center z-50 transition-colors">
      <MobileLink to="/" icon={<Activity size={22} />} label="Home" active={location.pathname === '/'} />
      <MobileLink to="/history" icon={<History size={22} />} label="History" active={location.pathname === '/history'} />
      <MobileLink to="/settings" icon={<Settings size={22} />} label="Settings" active={location.pathname === '/settings'} />
      <MobileLink to="/about" icon={<Info size={22} />} label="About" active={location.pathname === '/about'} />
    </div>
  );
};

const MobileLink = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 ${active ? 'text-brand-blue' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

export default Navbar;
