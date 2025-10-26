import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AddItemDialog } from './AddItemDialog';

export function ClosetScreen() {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  
  const categories = [
    {
      name: 'Tops',
      items: [
        {
          id: 1,
          name: 'Casual Hoodie',
          image: 'https://images.unsplash.com/photo-1760126130338-4e6c9043ee2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBob29kaWUlMjBmYXNoaW9ufGVufDF8fHx8MTc2MTQwNDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#8B7355',
        },
        {
          id: 2,
          name: 'T-Shirt',
          image: 'https://images.unsplash.com/photo-1696086152513-c74dc1d4b135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdHNoaXJ0JTIwY2xvdGhlc3xlbnwxfHx8fDE3NjE0MDQ1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#4ECDC4',
        },
        {
          id: 3,
          name: 'Dress Shirt',
          image: 'https://images.unsplash.com/photo-1760545183001-af3b64500b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNoaXJ0JTIwZm9ybWFsfGVufDF8fHx8MTc2MTMxNTQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#87CEEB',
        },
        {
          id: 4,
          name: 'Leather Jacket',
          image: 'https://images.unsplash.com/photo-1562751361-8839562e351b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjEzMzA4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#2C2C2C',
        },
      ],
    },
    {
      name: 'Bottoms',
      items: [
        {
          id: 5,
          name: 'Joggers',
          image: 'https://images.unsplash.com/photo-1715609104589-97585b210c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2dnZXJzJTIwc3dlYXRwYW50cyUyMG91dGZpdHxlbnwxfHx8fDE3NjE0MDQ1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#4A4A4A',
        },
        {
          id: 6,
          name: 'Denim Jeans',
          image: 'https://images.unsplash.com/photo-1715865871494-6bba579c2dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjEzODIwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#4169E1',
        },
      ],
    },
    {
      name: 'Shoes',
      items: [
        {
          id: 7,
          name: 'White Sneakers',
          image: 'https://images.unsplash.com/photo-1651371409956-20e79c06a8bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwc2hvZXN8ZW58MXx8fHwxNzYxMzkyNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#F5F5F5',
        },
        {
          id: 8,
          name: 'Boots',
          image: 'https://images.unsplash.com/photo-1609336348831-959d5926d686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib290cyUyMHNob2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjE0MDQ1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
          color: '#8B4513',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-foreground">My Closet</h1>
            <p className="text-muted-foreground">42 items total</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddItemDialogOpen(true)}
            className="p-3 bg-primary text-primary-foreground rounded-xl shadow-sm"
          >
            <Plus className="w-6 h-6" strokeWidth={2} />
          </motion.button>
        </div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-lg text-foreground">{category.name}</h2>
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border group-hover:shadow-md transition-all duration-200">
                    <div className="aspect-square bg-secondary relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-foreground">{item.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <AddItemDialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen} />
    </div>
  );
}