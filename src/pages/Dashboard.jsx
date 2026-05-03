import React from 'react';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/StatCard';
import AlertStrip from '../components/AlertStrip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Plus } from 'lucide-react';

const Dashboard = ({ readings }) => {
  const { dailyGoal, glassesCount, addGlass, theme } = useAppContext();
  const latest = readings[0];
  const isLoading = readings.length === 0;

  // TDS Status logic
  const getTdsStatus = (val) => {
    if (val <= 300) return { text: 'Pure', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' };
    if (val <= 600) return { text: 'Good', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' };
    if (val <= 900) return { text: 'Moderate', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' };
    return { text: 'Poor — Do Not Drink', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  };

  // Temp Status logic
  const getTempStatus = (val) => {
    if (val < 10) return { text: 'Too Cold', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
    if (val <= 30) return { text: 'Ideal', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' };
    if (val <= 40) return { text: 'Warm', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' };
    return { text: 'Too Hot', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  };

  const tdsStatus = getTdsStatus(latest?.tds || 0);
  const tempStatus = getTempStatus(latest?.temperature || 0);

  // Chart data (last 20, newest last for chart display)
  const chartData = readings.slice(0, 20).reverse().map(r => ({
    ...r,
    time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  const gridColor = theme === 'dark' ? '#334155' : '#f1f5f9';
  const axisColor = theme === 'dark' ? '#94a3b8' : '#94a3b8';
  const tooltipBg = theme === 'dark' ? '#1e293b' : '#ffffff';
  const tooltipText = theme === 'dark' ? '#f1f5f9' : '#1a1a1a';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 pb-24 md:pb-8 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Water Quality (TDS)" 
          value={latest?.tds} 
          unit="ppm"
          status={tdsStatus.text}
          statusColor={tdsStatus.color}
          isLoading={isLoading}
        />
        
        <StatCard 
          title="Temperature" 
          value={latest?.temperature} 
          unit="°C"
          status={tempStatus.text}
          statusColor={tempStatus.color}
          isLoading={isLoading}
        />

        <StatCard 
          title="Daily Hydration" 
          value={`${glassesCount} / ${dailyGoal}`} 
          unit="glasses"
          status={`${Math.round((glassesCount / dailyGoal) * 100)}% of goal`}
          statusColor="bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue"
        >
          <div className="w-full bg-app border border-app h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-brand-blue h-full transition-all duration-500" 
              style={{ width: `${Math.min((glassesCount / dailyGoal) * 100, 100)}%` }}
            ></div>
          </div>
          <button 
            onClick={addGlass}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white py-2.5 rounded-xl font-semibold transition-all active:scale-[0.98]"
          >
            <Plus size={20} />
            +1 Glass
          </button>
        </StatCard>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-2xl border border-app shadow-sm">
          <h3 className="text-app font-bold mb-6">TDS History (ppm)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 'auto']} stroke={axisColor} fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, borderRadius: '12px', border: `1px solid ${gridColor}`, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: tooltipText }}
                />
                <ReferenceLine y={600} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Safe Limit', fill: '#ef4444', fontSize: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="tds" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-app shadow-sm">
          <h3 className="text-app font-bold mb-6">Temperature History (°C)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="time" hide />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke={axisColor} fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, borderRadius: '12px', border: `1px solid ${gridColor}`, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: tooltipText }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#14b8a6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#14b8a6', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <AlertStrip tds={latest?.tds || 0} temp={latest?.temperature || 0} />
    </div>
  );
};

export default Dashboard;
