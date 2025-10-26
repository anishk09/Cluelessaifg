import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for image uploads
const upload = multer({ storage: multer.memoryStorage() });

// --------------------
// Weather Endpoint
// --------------------
// Route for weather data using ZIP code
app.get('/weather', async (req, res) => {
  const { zip } = req.query;
  try {
    const response = await axios.get(`${process.env.VIP_WEATHER_API_URL}/weather`, {
      params: {
        zip,                       // <-- Use ZIP code
        appid: process.env.VIP_WEATHER_API_KEY,
        units: 'imperial',
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('Weather error', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});


// --------------------
// Gemini / Google Search Endpoint
// --------------------
app.get('/gemini', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    const response = await axios.get('https://content.googleapis.com/customsearch/v1', {
      params: {
        key: process.env.VIP_GEMINI_API_KEY,
        cx: process.env.GOOGLE_CX_ID, // Add this to your .env
        q: query,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Gemini search' });
  }
});

// --------------------
// Trends Endpoint (Pinterest + TikTok) - used by frontend at /api/fetchTrends
// --------------------
function filterByWeather(item, temp) {
  const keywords = (item.name || '').toLowerCase();
  if (temp < 55) return keywords.includes('jacket') || keywords.includes('coat') || keywords.includes('boots');
  if (temp >= 55 && temp <= 75) return keywords.includes('jacket') || keywords.includes('sweater');
  if (temp > 75) return keywords.includes('shorts') || keywords.includes('t-shirt') || keywords.includes('dress');
  return true;
}

async function getPinterestTrends() {
  try {
    const res = await axios.get('https://pinterest-api3.p.rapidapi.com/search/pins', {
      params: { query: 'fashion trends', limit: 10 },
      headers: {
        'X-RapidAPI-Host': 'pinterest-api3.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      },
    });
    const data = res.data || {};
    return (data.pins || []).map(pin => ({
      id: pin.id,
      name: pin.title || pin.description || 'Pinterest Item',
      image: pin.image_url || (pin.images && pin.images[0] && pin.images[0].url) || '',
      source: 'Pinterest',
    }));
  } catch (err) {
    console.error('Pinterest fetch error', err?.response?.data || err.message);
    return [];
  }
}

async function getTikTokTrends() {
  try {
    const res = await axios.get('https://tiktok-trending-data.p.rapidapi.com/trending', {
      params: { region: 'US', count: 10 },
      headers: {
        'X-RapidAPI-Host': 'tiktok-trending-data.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      },
    });
    const data = res.data || {};
    return (data.trends || []).map(trend => ({
      id: trend.id || trend.videoId || Math.random().toString(36).slice(2),
      name: trend.title || trend.description || 'TikTok Trend',
      image: trend.image_url || trend.cover || '',
      source: 'TikTok',
    }));
  } catch (err) {
    console.error('TikTok fetch error', err?.response?.data || err.message);
    return [];
  }
}

app.get('/api/fetchTrends', async (req, res) => {
  try {
    const zip = req.query.zip || '94103';
    // Get weather (use VIP_WEATHER_API_URL and VIP_WEATHER_API_KEY from .env)
    const weatherResp = await axios.get(`${process.env.VIP_WEATHER_API_URL}/weather`, {
      params: { zip, appid: process.env.VIP_WEATHER_API_KEY, units: 'imperial' },
    });
    const weather = weatherResp.data;
    const temp = weather?.main?.temp || 60;

    const [pinterest, tiktok] = await Promise.all([getPinterestTrends(), getTikTokTrends()]);

    const pinterestTrends = pinterest.filter(item => filterByWeather(item, temp));
    const tiktokTrends = tiktok.filter(item => filterByWeather(item, temp));

    res.json({
      weather: {
        temp,
        conditions: (weather?.weather && weather.weather[0]?.main || '').toLowerCase(),
        description: weather?.weather && weather.weather[0]?.description || '',
      },
      trends: [...pinterestTrends, ...tiktokTrends],
    });
  } catch (err) {
    console.error('Error fetching trends', err?.response?.data || err.message);
    res.status(500).json({ message: 'Failed to fetch trends', error: err.message });
  }
});

// --------------------
// Barcode Lookup Endpoint (mock or real API)
// --------------------
app.get('/barcode', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Barcode required" });

  try {
    // TODO: Replace mock with real barcode API if available
    const mockItem = {
      id: code,
      name: "Nike Air Max 90",
      brand: "Nike",
      category: "Shoes",
      color: "#FFFFFF",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
    };
    res.json(mockItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch barcode info" });
  }
});

// --------------------
// Image Recognition Endpoint (mock AI)
// --------------------
app.post('/image', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Image file required" });

  try {
    // Mock AI recognition
    const mockResponse = {
      name: "Denim Jacket",
      brand: "Levi's",
      category: "Tops",
      color: "#4169E1",
      image: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    };
    res.json(mockResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image recognition failed" });
  }
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
