import React, { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  condition: string;
}

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/weather?city=New%20York")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, []);

  if (!weather) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold">Today's Weather</h3>
      <p className="text-4xl font-bold">{Math.round(weather.temp)}°F</p>
      <p className="text-gray-600">{weather.condition}</p>
    </div>
  );
};

export default WeatherCard;
