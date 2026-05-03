import { useState, useEffect, useRef } from 'react';

const CHANNEL_ID = '3367075';
const READ_API_KEY = '4UXCKWJ87GF6Y915';

export const useThingSpeak = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  
  const lastUpdateRef = useRef(Date.now());

  const fetchInitialHistory = async () => {
    try {
      const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=20&t=${Date.now()}`;
      const res = await fetch(url, { 
        cache: "no-store"
      });

      if (!res.ok) throw new Error('Fetch failed');
      
      const data = await res.json();
      const initialReadings = data.feeds.map(f => ({
        tds: parseFloat(f.field1) || 0,
        temperature: parseFloat(f.field2) || 0,
        rawTDS: parseFloat(f.field3) || 0,
        timestamp: f.created_at
      })).reverse(); 
      
      setReadings(initialReadings);
      if (initialReadings.length > 0) {
        setLastUpdated(new Date().toLocaleTimeString());
        lastUpdateRef.current = Date.now();
        setIsOffline(false);
      }
    } catch (err) {
      console.error('Initial Fetch Error:', err);
      setIsOffline(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatest = async () => {
    try {
      // FIX 2 & 3: aggressive cache busting and /last.json endpoint with results=1
      const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_API_KEY}&results=1&t=${Date.now()}`;
      const res = await fetch(url, { 
        cache: "no-store"
      });

      if (!res.ok) throw new Error('Fetch failed');
      
      const data = await res.json();
      if (data && data.created_at) {
        // FIX 4: Update state immediately with functional update
        setReadings(prev => {
          // Avoid duplicate entries if the timestamp hasn't changed
          if (prev.length > 0 && prev[0].timestamp === data.created_at) {
            return prev;
          }
          return [
            {
              tds: parseFloat(data.field1) || 0,
              temperature: parseFloat(data.field2) || 0,
              rawTDS: parseFloat(data.field3) || 0,
              timestamp: data.created_at
            },
            ...prev.slice(0, 49)
          ];
        });

        setLastUpdated(new Date().toLocaleTimeString());
        lastUpdateRef.current = Date.now();
        setIsOffline(false);
      }
    } catch (err) {
      console.error('Latest Fetch Error:', err);
    }
  };

  useEffect(() => {
    fetchInitialHistory();
    fetchLatest();
    
    // FIX 1: Poll every 10 seconds to match Arduino rate
    const interval = setInterval(fetchLatest, 10000);

    const offlineCheck = setInterval(() => {
      const secondsSinceUpdate = (Date.now() - lastUpdateRef.current) / 1000;
      if (secondsSinceUpdate > 30) {
        setIsOffline(true);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(offlineCheck);
    };
  }, []);

  return { readings, loading, lastUpdated, isOffline };
};
