import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useThingSpeak } from './hooks/useThingSpeak';
import Navbar, { BottomNav } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import About from './pages/About';

function AppContent() {
  const { readings, loading, lastUpdated, isOffline } = useThingSpeak();

  return (
    <div className="min-h-screen bg-app flex flex-col transition-colors">
      <Navbar isOffline={isOffline} lastUpdated={lastUpdated} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard readings={readings} />} />
          <Route path="/history" element={<History readings={readings} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
