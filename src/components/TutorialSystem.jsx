import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  HelpCircle,
  MousePointer,
  Eye,
  Volume2,
  Settings
} from 'lucide-react';

const TutorialSystem = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tutorialSteps = [
    {
      id: 'welcome',
      title: 'Welcome to OrbiX Solar System!',
      description: 'Explore our beautiful 3D solar system with interactive planets and stunning visual effects.',
      icon: <HelpCircle size={24} />,
      position: 'center',
      highlight: null
    },
    {
      id: 'navigation',
      title: 'Navigation Controls',
      description: 'Use your mouse to rotate, zoom, and pan around the solar system. Click on planets to learn more!',
      icon: <MousePointer size={24} />,
      position: 'center',
      highlight: null
    },
    {
      id: 'planet-info',
      title: 'Planet Information',
      description: 'Click on any planet to see detailed information, facts, and statistics.',
      icon: <Eye size={24} />,
      position: 'bottom-right',
      highlight: 'planet-info'
    },
    {
      id: 'audio-controls',
      title: 'Audio Experience',
      description: 'Toggle ambient space sounds for an immersive experience.',
      icon: <Volume2 size={24} />,
      position: 'top-left',
      highlight: 'audio-controls'
    },
    {
      id: 'playground',
      title: 'Interactive Playground',
      description: 'Customize the solar system in real-time with our powerful playground controls.',
      icon: <Settings size={24} />,
      position: 'top-right',
      highlight: 'playground'
    },
    {
      id: 'orbit-lines',
      title: 'Orbit Visualization',
      description: 'Toggle orbit lines to see the paths planets follow around the sun.',
      icon: <Eye size={24} />,
      position: 'top-right',
      highlight: 'orbit-controls'
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'You now know how to navigate and explore the solar system. Have fun exploring!',
      icon: <HelpCircle size={24} />,
      position: 'center',
      highlight: null
    }
  ];

  const currentStepData = tutorialSteps[currentStep];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < tutorialSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsPlaying(false);
          onComplete();
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, tutorialSteps.length, onComplete]);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startTutorial = () => {
    setIsPlaying(true);
  };

  const pauseTutorial = () => {
    setIsPlaying(false);
  };

  const skipTutorial = () => {
    onComplete();
  };

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-20 left-4';
      case 'top-right':
        return 'top-20 right-4';
      case 'bottom-left':
        return 'bottom-20 left-4';
      case 'bottom-right':
        return 'bottom-20 right-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Tutorial Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed ${getPositionClasses(currentStepData.position)} 
                      bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 
                      shadow-2xl z-50 max-w-sm w-full mx-4`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-cyan-400">
                    {currentStepData.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {currentStepData.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {currentStepData.description}
              </p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
                  <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 
                             disabled:cursor-not-allowed transition-colors"
                  >
                    <SkipBack size={16} className="text-white" />
                  </button>
                  
                  {isPlaying ? (
                    <button
                      onClick={pauseTutorial}
                      className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
                    >
                      <Pause size={16} className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={startTutorial}
                      className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
                    >
                      <Play size={16} className="text-white" />
                    </button>
                  )}
                  
                  <button
                    onClick={nextStep}
                    disabled={currentStep === tutorialSteps.length - 1}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 
                             disabled:cursor-not-allowed transition-colors"
                  >
                    <SkipForward size={16} className="text-white" />
                  </button>
                </div>
                
                <button
                  onClick={skipTutorial}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Skip Tutorial
                </button>
              </div>
            </div>
          </motion.div>

          {/* Highlight Overlay */}
          {currentStepData.highlight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 pointer-events-none"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default TutorialSystem; 