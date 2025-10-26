import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getWeather(city) {
  const key = process.env.OPENWEATHER_API_KEY;
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  );
  return res.data;
}

async function getTrending() {
  const res = await axios.get(
    `https://api.apify.com/v2/acts/tiktok-scraper/trending-items/run-sync-get-dataset-items?token=apify_free_token`
  );
  return res.data.map(v => ({
    title: v.title,
    hashtags: v.hashtags || [],
    music: v.musicMeta?.musicName || "",
  }));
}

async function suggestOutfit(trends, weather) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
  TikTok trending hashtags: ${trends.map(t => t.hashtags.join(", ")).join("; ")}
  Weather: ${weather.main.temp}°C, ${weather.weather[0].description}.
  Suggest 3 outfits that match the weather and trends in JSON with outfit_name, description, style_keywords.
  `;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.get("/recommend", async (req, res) => {
  try {
    const city = req.query.city || "New York";
    const [trends, weather] = await Promise.all([getTrending(), getWeather(city)]);
    const outfits = await suggestOutfit(trends.slice(0, 5), weather);
    res.json({ city, weather, outfits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recommendations." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
