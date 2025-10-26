import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Barcode, Camera, Search, Upload, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddItemDialog({ open, onOpenChange }: AddItemDialogProps) {
  const [activeTab, setActiveTab] = useState<'barcode' | 'picture' | 'search'>('picture');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Mock barcode scan
  const handleBarcodeScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedItem({
        name: 'Nike Air Max 90',
        brand: 'Nike',
        category: 'Shoes',
        color: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZXN8ZW58MXx8fHwxNzYxNDIxMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      });
    }, 2000);
  };

  // Mock web search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Mock search results
    setSearchResults([
      {
        id: 1,
        name: `${searchQuery} - Classic`,
        brand: 'Fashion Brand',
        price: '$49.99',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBjbG90aGluZ3xlbnwxfHx8fDE3NjE0MjEwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#4ECDC4',
      },
      {
        id: 2,
        name: `${searchQuery} - Premium`,
        brand: 'Designer Co.',
        price: '$89.99',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYxNDIxMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#FF6B6B',
      },
      {
        id: 3,
        name: `${searchQuery} - Essential`,
        brand: 'Basics Inc.',
        price: '$29.99',
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBjbG90aGluZ3xlbnwxfHx8fDE3NjE0MjEwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#2C2C2C',
      },
    ]);
  };

  // Mock image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        // Simulate AI recognition
        setTimeout(() => {
          setScannedItem({
            name: 'Denim Jacket',
            brand: 'Levi\'s',
            category: 'Tops',
            color: '#4169E1',
            image: reader.result as string,
          });
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (item: any) => {
    // In a real app, this would add the item to the user's wardrobe
    toast.success(`${item.name} added to your wardrobe!`);
    onOpenChange(false);
    // Reset state
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

          {/* Picture Upload Tab */}
          <TabsContent value="picture" className="space-y-4">
            <div className="space-y-3">
              <Label>Upload or take a picture of your item</Label>
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
                  <Button onClick={() => handleAddItem(scannedItem)} className="w-full">
                    Add to Wardrobe
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Barcode Scan Tab */}
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

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-secondary/30">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-primary/10 rounded-full">
                  {isScanning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Barcode className="w-8 h-8 text-primary" />
                    </motion.div>
                  ) : (
                    <Barcode className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-foreground">
                    {isScanning ? 'Scanning barcode...' : 'Click scan to use camera'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Position barcode in frame</p>
                </div>
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
                  <Button onClick={() => handleAddItem(scannedItem)} className="w-full">
                    Add to Wardrobe
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Web Search Tab */}
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
                    onClick={() => handleAddItem(item)}
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