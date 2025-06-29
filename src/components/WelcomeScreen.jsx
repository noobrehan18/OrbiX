import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Globe, 
  Star, 
  Zap, 
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const features = [
    {
      icon: <Globe size={48} />,
      title: "Interactive 3D Solar System",
      description: "Explore planets in stunning 3D with realistic textures and orbital mechanics"
    },
    {
      icon: <Rocket size={48} />,
      title: "Real-time Customization",
      description: "Adjust orbits, speeds, and visual effects with our powerful playground"
    },
    {
      icon: <Star size={48} />,
      title: "Educational Experience",
      description: "Learn fascinating facts about each planet with detailed information panels"
    },
    {
      icon: <Zap size={48} />,
      title: "Space Weather Effects",
      description: "Experience dynamic space phenomena like solar flares and cosmic rays"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 
                  flex items-center justify-center overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Logo and title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-6xl"
              >
                🌌
              </motion.div>
              <div>
                <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-2">
                  OrbiX
                </h1>
                <p className="text-xl md:text-2xl text-cyan-300 font-light">
                  Solar System Explorer
                </p>
              </div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="text-6xl"
              >
                🚀
              </motion.div>
            </div>
          </motion.div>

          {/* Feature showcase */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-cyan-400 mb-4 flex justify-center">
                    {features[currentFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {features[currentFeature].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Feature indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {features.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentFeature ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                    animate={{
                      scale: index === currentFeature ? 1.2 : 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Start button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: isReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={onStart}
              className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 
                       hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl 
                       transition-all duration-300 hover:scale-105 btn-glow pulse-glow"
            >
              <div className="flex items-center gap-3">
                <Play size={24} className="group-hover:scale-110 transition-transform" />
                <span>Launch Solar System</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>

          {/* Loading indicator */}
          {!isReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <div className="flex items-center justify-center gap-2 text-cyan-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
                <span className="text-lg">Preparing your journey...</span>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 text-gray-400 text-sm"
          >
            <p>Experience the wonders of our solar system in stunning 3D</p>
            <p className="mt-1">Click and drag to explore • Scroll to zoom • Click planets for details</p>
            <p className="mt-4 flex items-center justify-center gap-1 text-base font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Made with <span role="img" aria-label="love">❤️</span> by rehan
            </p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-4xl opacity-30"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 text-4xl opacity-30"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-10 text-3xl opacity-20"
        >
          🌙
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen; 