import { useEffect, useState } from "react";
import axios from "axios";

type OutfitData = {
  city: string;
  weather: any;        // you can type this more strictly
  outfits: string;     // depending on how you parse the result
};

function OutfitRecs({ city = "New York" }: { city?: string }) {
  const [data, setData] = useState<OutfitData | null>(null);

  useEffect(() => {
    axios.get<OutfitData>(`https://your-backend-url/recommend?city=${city}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [city]);

  if (!data) return <p>Loading recommendations…</p>;

  return (
    <div>
      <h2>👗 Outfit ideas for {data.city}</h2>
      <p>Weather: {data.weather.main.temp}°C — {data.weather.weather[0].description}</p>
      <pre>{data.outfits}</pre>
    </div>
  );
}

export default OutfitRecs;
