import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Barcode, Camera, Search, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (item: any) => void; // callback to update ClosetScreen
}

export function AddItemDialog({ open, onOpenChange, onAddItem }: AddItemDialogProps) {
  const [activeTab, setActiveTab] = useState<'barcode' | 'picture' | 'search'>('picture');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Barcode scan via backend API
  const handleBarcodeScan = async () => {
    if (!barcodeInput.trim()) return;
    setIsScanning(true);
    try {
      const res = await fetch(`http://localhost:4000/barcode?code=${barcodeInput}`);
      const data = await res.json();
      setScannedItem(data);
    } catch (err) {
      console.error('Barcode API error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Web search via backend API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/gemini?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search API error:', err);
    }
  };

  // Image upload via backend API
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploadedImage(URL.createObjectURL(file));

    try {
      const res = await fetch('http://localhost:4000/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setScannedItem(data);
    } catch (err) {
      console.error('Image upload API error:', err);
    }
  };

  const handleAddWardrobeItem = (item: any) => {
    onAddItem(item); // update ClosetScreen state
    onOpenChange(false);
    setBarcodeInput('');
    setSearchQuery('');
    setScannedItem(null);
    setSearchResults([]);
    setUploadedImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item to Wardrobe</DialogTitle>
          <DialogDescription>
            Choose a method to add new clothing items to your wardrobe
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="picture" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Picture</span>
            </TabsTrigger>
            <TabsTrigger value="barcode" className="flex items-center gap-2">
              <Barcode className="w-4 h-4" />
              <span className="hidden sm:inline">Barcode</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
          </TabsList>

          {/* Picture Upload */}
          <TabsContent value="picture" className="space-y-4">
            <div className="space-y-3">
              <Label>Upload or take a picture</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  {uploadedImage ? (
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-card">
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground">Click to upload or take photo</p>
                        <p className="text-xs text-muted-foreground mt-1">AI will identify your item</p>
                      </div>
                    </>
                  )}
                </label>
              </div>
            </div>

            <AnimatePresence>
              {scannedItem && activeTab === 'picture' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border border-border rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <Check className="w-5 h-5" />
                    <span>Item identified!</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={scannedItem.image} alt={scannedItem.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{scannedItem.name}</p>
                      <p className="text-sm text-muted-foreground">{scannedItem.brand}</p>
                      <p className="text-xs text-muted-foreground mt-1">{scannedItem.category}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleAddWardrobeItem(scannedItem)} className="w-full">
                    Add to Wardrobe
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Barcode */}
          <TabsContent value="barcode" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="barcode">Scan or enter barcode</Label>
              <div className="flex gap-2">
                <Input
                  id="barcode"
                  placeholder="Enter barcode number..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                />
                <Button onClick={handleBarcodeScan} disabled={isScanning}>
                  {isScanning ? 'Scanning...' : 'Scan'}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {scannedItem && activeTab === 'barcode' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border border-border rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <Check className="w-5 h-5" />
                    <span>Product found!</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <ImageWithFallback src={scannedItem.image} alt={scannedItem.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{scannedItem.name}</p>
                      <p className="text-sm text-muted-foreground">{scannedItem.brand}</p>
                      <p className="text-xs text-muted-foreground mt-1">{scannedItem.category}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleAddWardrobeItem(scannedItem)} className="w-full">
                    Add to Wardrobe
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Search */}
          <TabsContent value="search" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="search">Search for clothing items</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="e.g., blue denim jacket..."
                  value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleAddWardrobeItem(item)}
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="text-sm text-accent mt-1">{item.price}</p>
                      </div>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
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
