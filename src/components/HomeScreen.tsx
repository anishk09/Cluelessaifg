import { useState } from 'react';
import { RefreshCw, Sun, TrendingUp, Sparkles, ArrowRight, Shirt } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import logo from 'figma:asset/193fb722733955e40b908a73febec6ab789781c0.png';

interface HomeScreenProps {
  onRefresh: () => void;
  onViewAnalytics?: () => void;
}

export function HomeScreen({ onRefresh, onViewAnalytics }: HomeScreenProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const outfit = {
    top: {
      name: 'Casual Hoodie',
      color: '#8B7355',
      image: 'https://images.unsplash.com/photo-1588932250351-36235af5c0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGhvb2RpZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNDc2MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    bottom: {
      name: 'Joggers',
      color: '#4A4A4A',
      image: 'https://images.unsplash.com/photo-1654225307526-30d45703449b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwam9nZ2VycyUyMHBhbnRzfGVufDF8fHx8MTc2MTQ3NjA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    shoes: {
      name: 'White Sneakers',
      color: '#F5F5F5',
      image: 'https://images.unsplash.com/photo-1631482665588-d3a6f88e65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjEzODQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  };

  const weather = {
    temp: 65,
    condition: 'Sunny',
    icon: Sun,
  };

  const colorPalette = [outfit.top.color, outfit.bottom.color, outfit.shoes.color];

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start">
          <motion.img 
            src={logo} 
            alt="CluelessAI Logo" 
            className="w-20 h-20 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Weather Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-sm border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <weather.icon className="w-8 h-8 text-accent" strokeWidth={2} />
              </div>
              <div>
                <p className="text-muted-foreground">Today's Weather</p>
                <p className="text-foreground">{weather.temp}°F</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-foreground">{weather.condition}</p>
              <p className="text-muted-foreground">October 25</p>
            </div>
          </div>
        </motion.div>

        {/* Trending Styles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" strokeWidth={2} />
              <h2 className="text-foreground">Trending Now</h2>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>As seen on social media</span>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {[
              {
                name: 'Baggy Jeans',
                platform: 'TikTok',
                views: '45M',
                image: 'https://images.unsplash.com/photo-1560241088-7ddb7e9513b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWdneSUyMGplYW5zJTIwZGVuaW18ZW58MXx8fHwxNzYxNDc2MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                matchInWardrobe: true,
              },
              {
                name: 'Oversized Blazer',
                platform: 'Instagram',
                views: '32M',
                image: 'https://images.unsplash.com/photo-1726608869833-a0541c9bba5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBibGF6ZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzYxNDc2MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                matchInWardrobe: false,
              },
              {
                name: 'Streetwear',
                platform: 'TikTok',
                views: '89M',
                image: 'https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYxNDc2MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                matchInWardrobe: true,
              },
              {
                name: 'Minimal Chic',
                platform: 'Instagram',
                views: '28M',
                image: 'https://images.unsplash.com/photo-1542219550-b1b13a6a29eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdHNoaXJ0JTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYxNDc2MTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                matchInWardrobe: true,
              },
            ].map((trend, index) => (
              <motion.div
                key={trend.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => setSelectedItem(trend)}
                className="relative flex-shrink-0 w-32 cursor-pointer group"
              >
                <div className="aspect-[3/4] bg-secondary rounded-xl overflow-hidden shadow-sm border border-border group-hover:shadow-md transition-all duration-200">
                  <ImageWithFallback
                    src={trend.image}
                    alt={trend.name}
                    className="w-full h-full object-cover"
                  />
                  {trend.matchInWardrobe && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-foreground truncate">{trend.name}</p>
                  <p className="text-muted-foreground">{trend.views} views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Today's Fit Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-md border border-border"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground">Today's Fit</h2>
              <div className="flex gap-1.5">
                {colorPalette.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Outfit Items */}
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(outfit).map(([key, item], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-secondary rounded-xl overflow-hidden shadow-sm border border-border group-hover:shadow-md transition-all duration-200">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground mt-2 text-center">{item.name}</p>
                </motion.div>
              ))}
            </div>

            {/* Reasoning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-secondary rounded-xl p-4"
            >
              <p className="text-foreground">
                <span className="text-accent">Sunny and {weather.temp}°F</span> — Perfect weather for a casual hoodie and joggers. 
                Comfortable and stylish for your day out.
              </p>
            </motion.div>

            {/* Refresh Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              onClick={onRefresh}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-200 shadow-sm"
            >
              <RefreshCw className="w-5 h-5" strokeWidth={2} />
              <span>Refresh Outfit</span>
            </motion.button>
          </div>
        </motion.div>

        {/* AI Recommendations Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-gradient-to-br from-accent/10 via-chart-2/10 to-chart-3/10 rounded-2xl p-5 border border-accent/20 shadow-sm"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-accent" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-foreground">CluelessAi Suggestions</h3>
                <p className="text-muted-foreground">Based on trending styles</p>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 space-y-3 border border-border/50">
              <p className="text-foreground">
                Your casual look is on point! Here's how to elevate it:
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground">Try adding a <span className="text-accent">structured blazer</span></p>
                    <p className="text-muted-foreground">Trending on Instagram - 24M views</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1646888000308-620e64df78fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGF6ZXIlMjBqYWNrZXQlMjBwcm9kdWN0fGVufDF8fHx8MTc2MTQ3NjEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Blazer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-chart-2 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground">Accessorize with a <span className="text-chart-2">crossbody bag</span></p>
                    <p className="text-muted-foreground">Matches your aesthetic perfectly</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1709899629440-64da054379d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc2JvZHklMjBiYWclMjBsZWF0aGVyfGVufDF8fHx8MTc2MTM3NDUxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Crossbody bag"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-chart-3 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground">Consider <span className="text-chart-3">earth tones</span> for fall</p>
                    <p className="text-muted-foreground">Seasonal color palette recommendation</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <div className="w-6 h-12 rounded-md bg-[#8B7355] border border-border" />
                    <div className="w-6 h-12 rounded-md bg-[#D2691E] border border-border" />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (onViewAnalytics) {
                    onViewAnalytics();
                  } else {
                    toast.info('Opening detailed style analysis...');
                  }
                }}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-200"
              >
                <span>View Full Analysis</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            onClick={() => toast.info('View all your saved outfits')}
            className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-5 border border-accent/20 shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-accent/20 rounded-xl">
                <Shirt className="w-5 h-5 text-accent" strokeWidth={2} />
              </div>
              <div className="text-foreground" style={{ fontSize: '2rem' }}>24</div>
            </div>
            <p className="text-muted-foreground">Saved Outfits</p>
            <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            onClick={() => toast.info('View all wardrobe items')}
            className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 rounded-2xl p-5 border border-chart-2/20 shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-chart-2/20 rounded-xl">
                <Shirt className="w-5 h-5 text-chart-2" strokeWidth={2} />
              </div>
              <div className="text-foreground" style={{ fontSize: '2rem' }}>42</div>
            </div>
            <p className="text-muted-foreground">Wardrobe Items</p>
            <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '84%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-full bg-chart-2 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Item Detail Sheet */}
      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>{selectedItem?.name}</SheetTitle>
            <SheetDescription>Item details and styling options</SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="mt-6 space-y-6">
              <div className="aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden bg-secondary">
                <ImageWithFallback
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-foreground mb-2">Color</h3>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: selectedItem.color }}
                    />
                    <span className="text-muted-foreground">{selectedItem.color}</span>
                  </div>
                </div>
                {selectedItem.platform && (
                  <div>
                    <h3 className="text-foreground mb-2">Trending On</h3>
                    <p className="text-muted-foreground">{selectedItem.platform} - {selectedItem.views} views</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toast.success('Added to favorites!');
                      setSelectedItem(null);
                    }}
                    className="py-3 bg-primary text-primary-foreground rounded-xl"
                  >
                    Add to Favorites
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toast.success('Shared to social media!');
                      setSelectedItem(null);
                    }}
                    className="py-3 bg-secondary text-foreground rounded-xl border border-border"
                  >
                    Share
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
