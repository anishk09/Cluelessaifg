import React, { createContext, useContext, useState, useEffect } from "react";

interface Weather {
  temp: number;
  condition: string;
}

interface Trend {
  name: string;
  views: string;
  image: string;
}

interface AppContextType {
  weather: Weather | null;
  trends: Trend[];
}

const AppContext = createContext<AppContextType>({
  weather: null,
  trends: [],
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    // Fetch weather
    fetch("http://localhost:5000/weather?city=New%20York")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(console.error);

    // Fetch trends
    fetch("http://localhost:5000/trends")
      .then((res) => res.json())
      .then((data) => setTrends(data))
      .catch(console.error);
  }, []);

  return (
    <AppContext.Provider value={{ weather, trends }}>
      {children}
    </AppContext.Provider>
  );
};
