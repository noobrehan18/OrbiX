import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, Plus, Minus, ArrowRight } from 'lucide-react';
import { planetData } from '../planetData';

const PlanetComparison = ({ isOpen, onClose }) => {
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const addPlanet = (planet) => {
    if (selectedPlanets.length < 4 && !selectedPlanets.includes(planet)) {
      setSelectedPlanets([...selectedPlanets, planet]);
    }
  };

  const removePlanet = (planet) => {
    setSelectedPlanets(selectedPlanets.filter(p => p !== planet));
  };

  const clearAll = () => {
    setSelectedPlanets([]);
    setShowComparison(false);
  };

  const comparisonData = [
    { key: 'diameter', label: 'Diameter (km)', format: (val) => val.toLocaleString() },
    { key: 'distance', label: 'Distance from Sun (M km)', format: (val) => val.toLocaleString() },
    { key: 'rotation', label: 'Rotation Period', format: (val) => val },
    { key: 'gravity', label: 'Surface Gravity (m/s²)', format: (val) => val },
    { key: 'temperature', label: 'Avg Temperature (°C)', format: (val) => val },
    { key: 'moons', label: 'Number of Moons', format: (val) => val }
  ];

  const getMaxValue = (key) => {
    return Math.max(...selectedPlanets.map(planet => planetData[planet][key] || 0));
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 bg-slate-900/95 backdrop-blur-xl rounded-2xl 
                      border border-white/10 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <BarChart3 size={24} className="text-cyan-400" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Planet Comparison
                </h2>
              </div>
              <div className="flex gap-2">
                {selectedPlanets.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="px-3 py-1.5 text-sm bg-red-600/20 hover:bg-red-600/30 
                             text-red-400 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 
                           rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {!showComparison ? (
                <>
                  {/* Planet Selection */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Select Planets to Compare (Max 4)
                      </h3>
                      <div className="text-sm text-gray-400">
                        {selectedPlanets.length}/4 selected
                      </div>
                    </div>
                    
                    {/* Selected Planets */}
                    {selectedPlanets.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Selected:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPlanets.map((planet) => (
                            <motion.div
                              key={planet}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 bg-slate-800/50 border border-white/10 
                                       rounded-lg px-3 py-2"
                            >
                              <span className="text-lg">{planetData[planet].icon}</span>
                              <span className="text-white font-medium">{planetData[planet].name}</span>
                              <button
                                onClick={() => removePlanet(planet)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Planet Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {Object.keys(planetData).map((planet) => {
                        const isSelected = selectedPlanets.includes(planet);
                        const isDisabled = selectedPlanets.length >= 4 && !isSelected;
                        
                        return (
                          <motion.button
                            key={planet}
                            onClick={() => addPlanet(planet)}
                            disabled={isDisabled}
                            className={`p-4 rounded-xl border transition-all duration-200 text-left
                                     ${isSelected 
                                       ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-400' 
                                       : isDisabled
                                       ? 'bg-slate-800/30 border-white/5 text-gray-500 cursor-not-allowed'
                                       : 'bg-slate-800/50 border-white/10 text-white hover:bg-slate-700/50 hover:border-white/20'
                                     }`}
                            whileHover={!isDisabled ? { scale: 1.02 } : {}}
                            whileTap={!isDisabled ? { scale: 0.98 } : {}}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{planetData[planet].icon}</span>
                              <div>
                                <div className="font-medium">{planetData[planet].name}</div>
                                <div className="text-xs text-gray-400">
                                  {planetData[planet].diameter.toLocaleString()} km
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compare Button */}
                  {selectedPlanets.length >= 2 && (
                    <div className="p-6 border-t border-white/10">
                      <button
                        onClick={() => setShowComparison(true)}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 
                                 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl 
                                 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ArrowRight size={20} />
                        Compare {selectedPlanets.length} Planets
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Comparison View */}
                  <div className="flex-1 overflow-auto p-6">
                    <div className="mb-6">
                      <button
                        onClick={() => setShowComparison(false)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                      >
                        ← Back to Selection
                      </button>
                    </div>

                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left p-3 text-gray-400 font-medium">Property</th>
                            {selectedPlanets.map((planet) => (
                              <th key={planet} className="text-center p-3 text-white font-medium">
                                <div className="flex flex-col items-center gap-2">
                                  <span className="text-2xl">{planetData[planet].icon}</span>
                                  <span>{planetData[planet].name}</span>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map(({ key, label, format }) => (
                            <tr key={key} className="border-b border-white/5">
                              <td className="p-3 text-gray-300 font-medium">{label}</td>
                              {selectedPlanets.map((planet) => {
                                const value = planetData[planet][key];
                                const maxValue = getMaxValue(key);
                                const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                                
                                return (
                                  <td key={planet} className="p-3 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                      <span className="text-white font-medium">
                                        {format ? format(value) : value}
                                      </span>
                                      <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${percentage}%` }}
                                          transition={{ duration: 0.8, delay: 0.2 }}
                                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlanetComparison; 