import React from 'react';
import { motion } from 'framer-motion';
import { planetData } from './planetData';
import { X, Globe, Thermometer, Zap, Moon, Gauge, Sparkles } from 'lucide-react';
import { EnhancedCard, EnhancedButton, EnhancedProgressBar } from './components/EnhancedUI';

const PlanetInfo = ({ planet, onClose }) => {
  if (!planet) return null;
  
  const data = planetData[planet];
  
  if (!data) return null;

  const getTemperatureColor = (temp) => {
    if (temp > 100) return 'red';
    if (temp > 0) return 'yellow';
    return 'cyan';
  };

  const getGravityColor = (gravity) => {
    if (gravity > 20) return 'red';
    if (gravity > 10) return 'yellow';
    return 'green';
  };
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-5 md:left-5 md:right-auto 
                w-full md:w-96 lg:w-[450px] z-50 max-h-[80vh] overflow-y-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <EnhancedCard
        title={data.name}
        subtitle={`${data.icon} ${data.distance.toLocaleString()} million km from Sun`}
        icon={<Globe size={24} />}
        className="w-full"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              {data.name}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>
          <EnhancedButton
            onClick={onClose}
            variant="ghost"
            size="sm"
            icon={<X size={18} />}
            className="flex-shrink-0 ml-4"
          />
        </div>
        
        {/* Key Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Globe size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-400">Diameter</span>
            </div>
            <div className="text-lg font-bold text-white">
              {data.diameter.toLocaleString()} km
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-400">Rotation</span>
            </div>
            <div className="text-lg font-bold text-white">
              {data.rotation}
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-400">Temperature</span>
            </div>
            <div className={`text-lg font-bold ${getTemperatureColor(data.temperature) === 'red' ? 'text-red-400' : getTemperatureColor(data.temperature) === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}`}>
              {data.temperature}°C
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Moon size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-400">Moons</span>
            </div>
            <div className="text-lg font-bold text-white">
              {data.moons}
            </div>
          </div>
        </div>

        {/* Gravity Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Gauge size={16} className="text-cyan-400" />
            <span className="text-sm font-medium text-gray-300">Surface Gravity</span>
            <span className="text-sm text-cyan-400 font-mono ml-auto">
              {data.gravity} m/s²
            </span>
          </div>
          <EnhancedProgressBar
            progress={(data.gravity / 25) * 100}
            color={getGravityColor(data.gravity)}
            showPercentage={false}
          />
        </div>
        
        {/* Fun Fact Section */}
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/20">
          <h4 className="text-cyan-400 text-base font-semibold mb-2 flex items-center gap-2">
            <Sparkles size={16} />
            Did You Know?
          </h4>
          <p className="text-sm text-white/90 leading-relaxed">
            {data.fact}
          </p>
        </div>
      </EnhancedCard>
    </motion.div>
  );
};

export default PlanetInfo;