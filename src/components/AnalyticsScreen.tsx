import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Heart, Shirt } from 'lucide-react';

export function AnalyticsScreen() {
  const wearFrequencyData = [
    { day: 'Mon', count: 3 },
    { day: 'Tue', count: 2 },
    { day: 'Wed', count: 4 },
    { day: 'Thu', count: 2 },
    { day: 'Fri', count: 5 },
    { day: 'Sat', count: 1 },
    { day: 'Sun', count: 3 },
  ];

  const categoryData = [
    { name: 'Tops', value: 18, color: '#FF6B6B' },
    { name: 'Bottoms', value: 12, color: '#4ECDC4' },
    { name: 'Shoes', value: 8, color: '#FFD93D' },
    { name: 'Accessories', value: 4, color: '#95E1D3' },
  ];

  const favoriteOutfits = [
    { name: 'Casual Friday', wears: 12, lastWorn: '3 days ago' },
    { name: 'Business Casual', wears: 8, lastWorn: '1 week ago' },
    { name: 'Weekend Vibes', wears: 15, lastWorn: 'Yesterday' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your style journey</p>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-accent" strokeWidth={2} />
              </div>
              <p className="text-xs text-muted-foreground">This Week</p>
            </div>
            <p className="text-2xl text-foreground">20</p>
            <p className="text-xs text-muted-foreground mt-1">Outfits worn</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Heart className="w-4 h-4 text-chart-2" strokeWidth={2} />
              </div>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </div>
            <p className="text-2xl text-foreground">8</p>
            <p className="text-xs text-muted-foreground mt-1">Saved outfits</p>
          </div>
        </motion.div>

        {/* Weekly Wear Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-xl p-5 border border-border"
        >
          <h2 className="text-lg text-foreground mb-4">Weekly Activity</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wearFrequencyData}>
                <XAxis 
                  dataKey="day" 
                  stroke="#787878"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#787878"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar 
                  dataKey="count" 
                  fill="#FF6B6B" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Wardrobe Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-xl p-5 border border-border"
        >
          <h2 className="text-lg text-foreground mb-4">Wardrobe Breakdown</h2>
          <div className="flex items-center gap-6">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <p className="text-sm text-foreground">{category.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{category.value} items</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Favorite Outfits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg text-foreground">Favorite Outfits</h2>
          {favoriteOutfits.map((outfit, index) => (
            <motion.div
              key={outfit.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="bg-card rounded-xl p-4 border border-border cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Shirt className="w-5 h-5 text-foreground" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{outfit.name}</p>
                    <p className="text-xs text-muted-foreground">Last worn: {outfit.lastWorn}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg text-foreground">{outfit.wears}</p>
                  <p className="text-xs text-muted-foreground">times</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
