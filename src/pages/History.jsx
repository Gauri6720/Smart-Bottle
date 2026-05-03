import React from 'react';

const History = ({ readings }) => {
  const getTdsBadge = (val) => {
    if (val <= 300) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (val <= 600) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    if (val <= 900) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:px-8 pb-24 transition-colors">
      <h1 className="text-2xl font-bold text-app mb-6">Reading History</h1>
      
      <div className="bg-card rounded-2xl border border-app shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-app border-b border-app">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">TDS Value</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Temperature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app">
              {readings.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-blue/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(row.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getTdsBadge(row.tds)}`}>
                      {row.tds} ppm
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-app">{row.temperature} °C</td>
                </tr>
              ))}
              {readings.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-slate-400 italic">
                    Waiting for data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
