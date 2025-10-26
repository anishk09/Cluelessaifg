import { useEffect, useState } from "react";
import { fetchFashionListings, FashionItem } from "./fashionStorage";
import { OutfitSuggestionModal } from "./OutfitSuggestionModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ClosetScreen() {
  const [wardrobe, setWardrobe] = useState<FashionItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const userZip = "94103"; // Replace with dynamic user ZIP code

  useEffect(() => {
    async function loadWardrobe() {
      const items = await fetchFashionListings();
      setWardrobe(items);
    }
    loadWardrobe();
  }, []);

  const handleItemClick = (item: FashionItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Your Wardrobe</h1>

      {wardrobe.length === 0 ? (
        <p className="text-muted-foreground">No items in your wardrobe yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wardrobe.map((item) => (
            <div
              key={item.id}
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
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <OutfitSuggestionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          wardrobeItemName={selectedItem.name}
          userZip={userZip} // pass ZIP code instead of lat/lon
        />
      )}
    </div>
  );
}
