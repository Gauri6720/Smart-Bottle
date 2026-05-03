import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Save, User, Target, Bell } from 'lucide-react';

const Settings = () => {
  const { 
    dailyGoal, setDailyGoal, 
    userName, setUserName, 
    reminderInterval, setReminderInterval 
  } = useAppContext();

  const [localGoal, setLocalGoal] = useState(dailyGoal);
  const [localName, setLocalName] = useState(userName);
  const [localInterval, setLocalInterval] = useState(reminderInterval);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setDailyGoal(Number(localGoal));
    setUserName(localName);
    setReminderInterval(Number(localInterval));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:px-8 pb-24 transition-colors">
      <h1 className="text-2xl font-bold text-app mb-6">Settings</h1>
      
      <div className="bg-card rounded-2xl border border-app shadow-sm p-8 space-y-8">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-app">
            <User size={18} className="text-brand-blue" />
            Your Name
          </label>
          <input 
            type="text" 
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-app bg-app text-app focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-app">
            <Target size={18} className="text-brand-blue" />
            Daily Hydration Goal (Glasses)
          </label>
          <input 
            type="number" 
            value={localGoal}
            onChange={(e) => setLocalGoal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-app bg-app text-app focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-app">
            <Bell size={18} className="text-brand-blue" />
            Reminder Interval
          </label>
          <select 
            value={localInterval}
            onChange={(e) => setLocalInterval(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-app bg-app text-app focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
          >
            <option value="30">Every 30 minutes</option>
            <option value="60">Every 60 minutes</option>
            <option value="90">Every 90 minutes</option>
          </select>
        </div>

        <button 
          onClick={handleSave}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            saved ? 'bg-emerald-500 text-white' : 'bg-brand-blue text-white hover:bg-brand-blue/90'
          }`}
        >
          {saved ? 'Settings Saved!' : <><Save size={20} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
};

export default Settings;
