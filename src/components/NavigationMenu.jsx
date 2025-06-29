import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Sun, 
  Moon, 
  Zap, 
  Search, 
  ChevronRight,
  Home,
  Star
} from 'lucide-react';
import { planetData } from '../planetData';

const NavigationMenu = ({ onPlanetSelect, onOverview, isOpen, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('planets');

  const sections = {
    planets: {
      icon: <Globe size={20} />,
      title: 'Planets',
      items: Object.keys(planetData).map(planet => ({
        name: planetData[planet].name,
        icon: planetData[planet].icon || '🌍',
        key: planet,
        color: planetData[planet].color || '#4A99E9'
      }))
    },
    special: {
      icon: <Star size={20} />,
      title: 'Special Views',
      items: [
        { name: 'Solar System Overview', icon: <Home size={16} />, key: 'overview', color: '#FFD700' },
        { name: 'Asteroid Belt', icon: '☄️', key: 'asteroids', color: '#8B7355' },
        { name: 'Sun Close-up', icon: <Sun size={16} />, key: 'sun', color: '#FF6B35' },
        { name: 'Earth & Moon', icon: <Moon size={16} />, key: 'earth-moon', color: '#4A99E9' }
      ]
    }
  };

  const filteredItems = sections[activeSection].items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    if (item.key === 'overview') {
      onOverview();
    } else {
      onPlanetSelect(item.key);
    }
    onToggle();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onToggle}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 
                      bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 
                      shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Navigation
                </h2>
                <div className="flex gap-1">
                  {Object.keys(sections).map((sectionKey) => (
                    <button
                      key={sectionKey}
                      onClick={() => setActiveSection(sectionKey)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        activeSection === sectionKey
                          ? 'bg-cyan-600/30 text-cyan-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {sections[sectionKey].icon}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search planets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 
                           rounded-lg text-white placeholder-gray-400 focus:outline-none 
                           focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              <div className="p-2">
                {filteredItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 
                             transition-all duration-200 group"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {item.name}
                      </div>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="text-gray-400 group-hover:text-cyan-400 transition-colors" 
                    />
                  </motion.button>
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Search size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No planets found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationMenu; 