import React from 'react';

const StatCard = ({ title, value, unit, status, statusColor, children, isLoading }) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-app flex flex-col justify-between transition-all">
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{title}</h3>
        {isLoading ? (
          <div className="py-2">
            <span className="text-slate-400 italic text-sm animate-pulse">Waiting for data...</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-app">{value}</span>
            <span className="text-slate-400 font-medium">{unit}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        {!isLoading && status && (
          <div className={`text-sm font-semibold mb-2 px-3 py-1 rounded-lg inline-block ${statusColor}`}>
            {status}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default StatCard;
