import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, X, Palette, TrendingUp, Sun } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  images?: string[];
  suggestions?: string[];
}

interface AIChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit?: {
    top: string;
    bottom: string;
    shoes: string;
    weather: string;
  };
}

export function AIChatDialog({ isOpen, onClose, currentOutfit }: AIChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your personal fashion AI. Ask me anything about styling, trends, or your outfit!",
      timestamp: new Date(),
      suggestions: [
        "What should I wear today?",
        "Does this outfit work?",
        "Color palette advice",
        "What's trending?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const outfit = currentOutfit || {
    top: 'Casual Hoodie',
    bottom: 'Joggers',
    shoes: 'White Sneakers',
    weather: 'Sunny, 65°F'
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.toLowerCase());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        images: aiResponse.images,
        suggestions: aiResponse.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string) => {
    // Context-aware responses based on current outfit
    if (query.includes('today') || query.includes('wear') || query.includes('outfit')) {
      return {
        content: `Based on today's weather (${outfit.weather}), your current ${outfit.top} and ${outfit.bottom} combo is perfect! The neutral earth tones are very on-trend.

I'd suggest adding:
• A structured denim jacket for layering
• A crossbody bag in brown
• Minimal gold jewelry

This gives you a relaxed streetwear vibe that's great for casual outings!`,
        suggestions: ["Show jacket options", "What accessories?", "Alternative shoes?"],
        images: []
      };
    }

    if (query.includes('color') || query.includes('palette')) {
      return {
        content: `Your current color palette is excellent! Earth tones and neutrals create a sophisticated look.

Colors in your outfit:
• Beige/Tan - ${outfit.top}
• Charcoal Gray - ${outfit.bottom}
• White - ${outfit.shoes}

To add interest, try:
• Warm accents: Rust, terracotta, olive
• Cool accents: Navy, forest green, burgundy

Pro tip: Use the 60-30-10 rule!`,
        suggestions: ["Show trending colors", "What colors suit me?", "Seasonal palettes"]
      };
    }

    if (query.includes('accessor') || query.includes('bag') || query.includes('jewelry')) {
      return {
        content: `Perfect question! Your outfit is a great canvas for accessories:

**Bags:**
• Leather crossbody (cognac/tan)
• Canvas tote for casual vibes
• Small backpack for function

**Jewelry:**
• Minimal gold chain
• Leather bracelet or watch
• Simple studs

Keep it minimal - 2-3 pieces max!`,
        suggestions: ["Show bag options", "Jewelry ideas", "Seasonal accessories"],
        images: [
          'https://images.unsplash.com/photo-1709899629440-64da054379d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc2JvZHklMjBiYWclMjBsZWF0aGVyfGVufDF8fHx8MTc2MTM3NDUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MTQ5MTI4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
        ]
      };
    }

    if (query.includes('trend') || query.includes('popular') || query.includes('hot')) {
      return {
        content: `Here are the hottest trends for 2025:

**Trending Styles:**
• Oversized silhouettes (your hoodie is perfect!)
• Quiet luxury - neutral tones
• Gorpcore - outdoor-inspired
• Baggy jeans (45M+ TikTok views)

Your look aligns with "quiet luxury" and minimalist streetwear trends!`,
        suggestions: ["Show trending items", "Celebrity inspo", "Seasonal trends"]
      };
    }

    if (query.includes('formal') || query.includes('dress up') || query.includes('occasion')) {
      return {
        content: `To elevate your style:

**Smart Casual:**
• Swap hoodie for Oxford shirt
• Try chinos or dark jeans
• Add loafers or clean sneakers

**Business Casual:**
• Structured blazer
• Dress pants
• Leather shoes

**Formal:**
• Full suit (navy/charcoal)
• Dress shirt and tie
• Oxford shoes

Start with one upgrade - a blazer instantly elevates!`,
        suggestions: ["Show formal options", "Business casual", "Date night outfit"]
      };
    }

    if (query.includes('shoe') || query.includes('sneaker') || query.includes('boot')) {
      return {
        content: `Great shoe choices for your style:

**Casual (like your white sneakers):**
• Classic white leather sneakers
• Canvas sneakers (Vans, Converse)
• Minimal trainers

**Smart Casual:**
• Chelsea boots
• Loafers (suede/leather)
• Clean leather sneakers

**Active:**
• Running shoes
• High-tops
• Chunky sneakers

Your white sneakers are versatile and trendy!`,
        suggestions: ["Show sneaker options", "Boot recommendations", "Summer shoes"]
      };
    }

    // Default response
    return {
      content: `I can help with:
• Outfit suggestions & styling
• Color coordination
• Trending fashion
• Occasion-appropriate looks
• Accessories & shoes
• Building a capsule wardrobe

What would you like to know?`,
      suggestions: ["Styling tips", "Wardrobe basics", "Color theory", "Current trends"]
    };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: '100%', opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] sm:max-h-[700px] flex flex-col shadow-2xl border border-border"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-accent/10 to-chart-2/10 border-b border-border px-5 py-4 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-chart-2 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-foreground">Fashion AI</h2>
                <p className="text-muted-foreground text-sm">Ask me anything</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-secondary"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>

          {/* Current Outfit Context */}
          <div className="bg-accent/5 border-b border-accent/20 px-4 py-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-accent" strokeWidth={2} />
              <span>
                Current: {outfit.top}, {outfit.bottom}, {outfit.shoes} • {outfit.weather}
              </span>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4" ref={scrollRef}>
            <div className="space-y-4 py-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border'
                      }`}
                    >
                      {message.type === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-accent to-chart-2 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
                          </div>
                          <span className="text-accent text-sm">AI</span>
                        </div>
                      )}
                      
                      <p className="whitespace-pre-line text-sm">{message.content}</p>

                      {/* Image suggestions */}
                      {message.images && message.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {message.images.map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                              <ImageWithFallback
                                src={img}
                                alt={`Suggestion ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick reply suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(suggestion)}
                              className="px-3 py-1.5 bg-secondary hover:bg-secondary/70 rounded-full text-foreground text-xs border border-border transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-accent to-chart-2 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4 rounded-b-3xl">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Ask about outfits, trends, styling..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="px-4"
              >
                <Send className="w-4 h-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
