import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { OutfitSuggestionModal } from "./OutfitSuggestionModal";

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
