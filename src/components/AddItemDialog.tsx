import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Barcode, Camera, Search, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FashionItem {
  id: string;
  name: string;
  image: string;
  brand?: string;
  category?: string;
  price?: string;
  color?: string;
}

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (item: FashionItem) => void;
}

export function AddItemDialog({ open, onOpenChange, onAddItem }: AddItemDialogProps) {
  const [activeTab, setActiveTab] = useState<'picture' | 'barcode' | 'search'>('picture');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState<FashionItem | null>(null);
  const [searchResults, setSearchResults] = useState<FashionItem[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // ------------------ Picture Upload ------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:4000/image', { method: 'POST', body: formData });
      const data = await res.json();
      setScannedItem(data);
    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

  // ------------------ Barcode Scan ------------------
  const handleBarcodeScan = async () => {
    if (!barcodeInput.trim()) return;
    setIsScanning(true);
    try {
      const res = await fetch(`http://localhost:4000/barcode?code=${barcodeInput}`);
      const data = await res.json();
      setScannedItem(data);
    } catch (err) {
      console.error('Barcode scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // ------------------ Search ------------------
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/gemini?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // ------------------ Add Item ------------------
  const handleAddItem = (item: FashionItem) => {
    onAddItem(item);
    resetDialog();
  };

  const resetDialog = () => {
    setBarcodeInput('');
    setSearchQuery('');
    setScannedItem(null);
    setSearchResults([]);
    setUploadedImage(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item to Wardrobe</DialogTitle>
          <DialogDescription>Choose a method to add new clothing items</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="picture" className="flex items-center gap-2">
              <Camera className="w-4 h-4" /> Picture
            </TabsTrigger>
            <TabsTrigger value="barcode" className="flex items-center gap-2">
              <Barcode className="w-4 h-4" /> Barcode
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" /> Search
            </TabsTrigger>
          </TabsList>

          {/* -------- Picture Upload Tab -------- */}
          <TabsContent value="picture" className="space-y-4">
            <Label>Upload or take a picture</Label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="flex flex-col items-center gap-3">
                {uploadedImage ? (
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p>Click to upload or take photo</p>
                  </>
                )}
              </label>
            </div>

            <AnimatePresence>
              {scannedItem && activeTab === 'picture' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <Check className="w-5 h-5" /> Item identified!
                  </div>
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback src={scannedItem.image} alt={scannedItem.name} />
                    </div>
                    <div className="flex-1">
                      <p>{scannedItem.name}</p>
                      <p className="text-sm text-muted-foreground">{scannedItem.brand}</p>
                      <p className="text-xs text-muted-foreground mt-1">{scannedItem.category}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleAddItem(scannedItem)} className="w-full">
                    Add to Wardrobe
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* -------- Barcode Tab -------- */}
          <TabsContent value="barcode" className="space-y-4">
            <Label>Scan or enter barcode</Label>
            <div className="flex gap-2">
              <Input
                value={barcodeInput}
                placeholder="Enter barcode..."
                onChange={(e) => setBarcodeInput(e.target.value)}
              />
              <Button onClick={handleBarcodeScan} disabled={isScanning}>
                {isScanning ? 'Scanning...' : 'Scan'}
              </Button>
            </div>

            <AnimatePresence>
  {scannedItem && activeTab === "picture" && (
    <motion.div
      key={scannedItem.id || "scanned-item"}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center gap-2 text-accent">
        <Check className="w-5 h-5" />
        <span>Item identified!</span>
      </div>
      <div className="flex gap-3">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
          <ImageWithFallback
            src={scannedItem.image}
            alt={scannedItem.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-foreground">{scannedItem.name}</p>
          <p className="text-sm text-muted-foreground">{scannedItem.brand}</p>
          <p className="text-xs text-muted-foreground mt-1">{scannedItem.category}</p>
        </div>
      </div>
      <Button
        onClick={() => handleAddWardrobeItem(scannedItem)}
        className="w-full"
      >
        Add to Wardrobe
      </Button>
    </motion.div>
  )}
</AnimatePresence>

          </TabsContent>

          {/* -------- Search Tab -------- */}
          <TabsContent value="search" className="space-y-4">
            <Label>Search for clothing items</Label>
            <div className="flex gap-2">
              <Input
                value={searchQuery}
                placeholder="e.g., blue denim jacket"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border rounded-xl p-3 cursor-pointer hover:shadow-md transition-shadow flex gap-3"
                    onClick={() => handleAddItem(item)}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback src={item.image} alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <p className="text-sm text-accent mt-1">{item.price}</p>
                    </div>
                    {item.color && (
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }} />
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Search for items to add to your wardrobe</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
