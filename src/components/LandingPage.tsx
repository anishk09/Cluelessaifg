import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Shirt } from 'lucide-react';
import logo from 'figma:asset/193fb722733955e40b908a73febec6ab789781c0.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/5 flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-chart-2/10 to-chart-3/10 blur-3xl opacity-50" />
            <motion.img 
              src={logo} 
              alt="CluelessAI Logo" 
              className="relative w-40 h-40 object-contain drop-shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-foreground mb-3">Your AI Style Companion</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Daily outfit suggestions powered by your wardrobe, weather, and the latest trends
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <div className="grid grid-cols-3 gap-3 mb-6">
            <motion.div 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="p-2.5 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-accent" strokeWidth={2} />
              </div>
              <p className="text-foreground text-sm">Trending</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-chart-2/30 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="p-2.5 bg-gradient-to-br from-chart-2/20 to-chart-2/10 rounded-lg">
                <Shirt className="w-5 h-5 text-chart-2" strokeWidth={2} />
              </div>
              <p className="text-foreground text-sm">Wardrobe</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-chart-3/30 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="p-2.5 bg-gradient-to-br from-chart-3/20 to-chart-3/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-chart-3" strokeWidth={2} />
              </div>
              <p className="text-foreground text-sm">AI Powered</p>
            </motion.div>
          </div>

          {/* Feature Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center text-muted-foreground text-sm px-4"
          >
            Stay on trend, organize your closet, and get smart outfit recommendations tailored just for you
          </motion.p>
        </motion.div>

        {/* CTA Button & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-4 text-center"
        >
          <button
            onClick={onGetStarted}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
          >
            Get Started
          </button>
          
          <p className="text-muted-foreground text-sm">
            Never be clueless about what to wear again
          </p>
        </motion.div>
      </div>
    </div>
  );
}
