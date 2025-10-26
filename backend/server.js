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
    const response = await axios.get(`${process.env.VIPE_WEATHER_API_URL}/weather`, {
      params: {
        zip,                       // <-- Use ZIP code
        appid: process.env.VIPE_WEATHER_API_KEY,
        units: 'metric',
      },
    });
    res.json(response.data);
  } catch (err) {
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
        key: process.env.VIPTE_GEMI_API_KEY,
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
