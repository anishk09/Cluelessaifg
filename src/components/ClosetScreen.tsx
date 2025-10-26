import { AnimatePresence, motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { OutfitSuggestionModal } from "./OutfitSuggestionModal";
import { useEffect, useState } from 'react';

interface TrendItem {
  id: string;
  name: string;
  image: string;
  source: string; // "Pinterest" or "TikTok"
}

interface WeatherData {
  temp: number;
  conditions: string;
  description: string;
}

export function Trends({ zip }: { zip: string }) {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch(`/api/fetchTrends?zip=${zip}`);
        const data = await res.json();
        setWeather(data.weather);
        setTrends(data.trends);
      } catch (err) {
        console.error('Error fetching trends:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrends();
  }, [zip]);

  if (loading) return <p>Loading trends...</p>;

  return (
    <div>
      <h2>Trending Outfits ({weather?.description}, {weather?.temp}°F)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {trends.map(item => (
          <div key={item.id} className="border rounded-lg p-2">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
            <p className="text-sm font-medium mt-1">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface FashionItem {
  id: string;
  name: string;
  category: string;
  image: string;
  brand?: string;
  price?: string;
  color?: string;
}

interface ClosetScreenProps {
  wardrobe: FashionItem[];
}

export function ClosetScreen({ wardrobe }: ClosetScreenProps) {
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const userZip = "94103"; // Replace with dynamic ZIP

  const handleItemClick = (item: FashionItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Wardrobe</h1>

      {wardrobe.length === 0 ? (
        <p className="text-muted-foreground">No items in your wardrobe yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {wardrobe.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square bg-secondary">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {selectedItem && (
        <OutfitSuggestionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          wardrobeItemName={selectedItem.name}
          userZip={userZip}
        />
      )}
    </div>
  );
}