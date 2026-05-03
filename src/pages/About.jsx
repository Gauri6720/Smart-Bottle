import React from 'react';
import { Cpu, Thermometer, Droplet, Monitor } from 'lucide-react';

const About = () => {
  const components = [
    { name: 'Arduino Uno R4 WiFi', icon: <Cpu size={24} className="text-brand-blue" /> },
    { name: 'TDS Sensor', icon: <Droplet size={24} className="text-brand-blue" /> },
    { name: 'DS18B20 Temp Sensor', icon: <Thermometer size={24} className="text-brand-blue" /> },
    { name: 'OLED Display', icon: <Monitor size={24} className="text-brand-blue" /> }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:px-8 pb-24 transition-colors">
      <div className="bg-card rounded-3xl border border-app shadow-sm p-8 md:p-12 text-center">
        <div className="bg-brand-blue/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Droplet className="w-10 h-10 text-brand-blue" />
        </div>
        <h1 className="text-3xl font-extrabold text-app mb-4">About HydroSense</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10">
          HydroSense is a smart hydration monitoring system that tracks your water intake, 
          water quality (TDS), and temperature in real-time, helping you stay hydrated and healthy.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {components.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl border border-app bg-app/50 flex flex-col items-center gap-3">
              {c.icon}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-app">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Developed By</p>
          <p className="text-xl font-bold text-app">Smart Water Bottle Team</p>
        </div>
      </div>
    </div>
  );
};

export default About;
