import { useEffect, useState } from "react";
import { RefreshCw, Sun, TrendingUp, Sparkles, ArrowRight, Shirt } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import logo from "asset/logo.png";

interface HomeScreenProps {
  onRefresh: () => void;
}

export function HomeScreen({ onRefresh }: HomeScreenProps) {
  // 🌤 State for weather
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    icon: string;
  } | null>(null);

  // 👕 Your static outfit data (could later be generated dynamically)
  const outfit = {
    top: {
      name: "Casual Hoodie",
      color: "#8B7355",
      image:
        "https://images.unsplash.com/photo-1588932250351-36235af5c0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGhvb2RpZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNDc2MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    bottom: {
      name: "Joggers",
      color: "#4A4A4A",
      image:
        "https://images.unsplash.com/photo-1654225307526-30d45703449b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwam9nZ2VycyUyMHBhbnRzfGVufDF8fHx8MTc2MTQ3NjA5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    shoes: {
      name: "White Sneakers",
      color: "#F5F5F5",
      image:
        "https://images.unsplash.com/photo-1631482665588-d3a6f88e65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjEzODQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  };

  const colorPalette = [outfit.top.color, outfit.bottom.color, outfit.shoes.color];

  // 🌦 Fetch weather on load
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const city = "San Francisco"; // you can make this dynamic later
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === 200) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          });
        } else {
          console.error("Weather API error:", data.message);
        }
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start">
          <motion.img
            src={logo}
            alt="CluelessAI Logo"
            className="w-20 h-20 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Weather Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-sm border border-border"
        >
          {weather ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <img
                    src={weather.icon}
                    alt={weather.condition}
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground">Today's Weather</p>
                  <p className="text-foreground">{weather.temp}°F</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-foreground">{weather.condition}</p>
                <p className="text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center">Loading weather...</p>
          )}
        </motion.div>

        {/* 🔥 Keep all your existing sections here (Trending, Outfit, Suggestions, Stats, etc.) */}
        {/* Nothing else below needs to change for now */}
      </div>
    </div>
  );
}
