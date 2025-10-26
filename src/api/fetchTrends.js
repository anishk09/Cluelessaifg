import fetch from 'node-fetch';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

async function getWeather(zip) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${OPENWEATHER_KEY}`
  );
  const data = await res.json();
  if (data.cod !== 200) throw new Error(data.message);
  return data;
}

async function getPinterestTrends() {
  const res = await fetch(
    'https://pinterest-api3.p.rapidapi.com/search/pins?query=fashion%20trends&limit=10',
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'pinterest-api3.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
    }
  );
  const data = await res.json();
  return (data.pins || []).map(pin => ({
    id: pin.id,
    name: pin.title,
    image: pin.image_url,
    source: 'Pinterest',
  }));
}

async function getTikTokTrends() {
  const res = await fetch(
    'https://tiktok-trending-data.p.rapidapi.com/trending?region=US&count=10',
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'tiktok-trending-data.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
    }
  );
  const data = await res.json();
  return (data.trends || []).map(trend => ({
    id: trend.id,
    name: trend.title,
    image: trend.image_url,
    source: 'TikTok',
  }));
}

function filterByWeather(item, temp) {
  const keywords = item.name.toLowerCase();
  if (temp < 55) return keywords.includes('jacket') || keywords.includes('coat') || keywords.includes('boots');
  if (temp >= 55 && temp <= 75) return keywords.includes('jacket') || keywords.includes('sweater');
  if (temp > 75) return keywords.includes('shorts') || keywords.includes('t-shirt') || keywords.includes('dress');
  return true;
}

export default async function handler(req, res) {
  try {
    const zip = req.query.zip || '94103';
    const weather = await getWeather(zip);
    const temp = weather.main.temp;

    const pinterestTrends = (await getPinterestTrends()).filter(item => filterByWeather(item, temp));
    const tiktokTrends = (await getTikTokTrends()).filter(item => filterByWeather(item, temp));

    res.status(200).json({
      weather: {
        temp,
        conditions: weather.weather[0].main.toLowerCase(),
        description: weather.weather[0].description,
      },
      trends: [...pinterestTrends, ...tiktokTrends],
    });
  } catch (err) {
    console.error('Error fetching trends:', err);
    res.status(500).json({ message: 'Failed to fetch trends', error: err.message });
  }
}
