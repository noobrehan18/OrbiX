import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Star, 
  Zap, 
  Globe, 
  Rocket, 
  ChevronUp,
  ChevronDown,
  Settings,
  Palette,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react';

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced button component
const EnhancedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white',
    secondary: 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/10',
    ghost: 'bg-transparent hover:bg-white/10 text-white',
    danger: 'bg-red-600/80 hover:bg-red-700/80 text-white',
    success: 'bg-green-600/80 hover:bg-green-700/80 text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-lg font-medium transition-all duration-200
        backdrop-blur-sm border border-white/10
        hover:scale-105 hover:shadow-lg
        active:scale-95
        flex items-center gap-2
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};

// Enhanced card component
const EnhancedCard = ({ 
  children, 
  title, 
  subtitle,
  icon,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      className={`
        bg-slate-900/90 backdrop-blur-xl rounded-2xl
        border border-white/10 shadow-2xl
        p-6 hover:shadow-cyan-500/10
        transition-all duration-300
        ${className}
      `}
      whileHover={{ y: -5, scale: 1.02 }}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="p-2 bg-cyan-600/20 rounded-lg text-cyan-400">
              {icon}
            </div>
          )}
          <div>
            {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </motion.div>
  );
};

// Enhanced slider component
const EnhancedSlider = ({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  onChange, 
  unit = '',
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-sm text-cyan-400 font-mono">
          {typeof value === 'number' ? value.toFixed(step < 0.01 ? 3 : 2) : value}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div 
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg pointer-events-none"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Enhanced notification component
const EnhancedNotification = ({ 
  message, 
  type = 'info', 
  visible, 
  onClose,
  duration = 5000 
}) => {
  const types = {
    info: { icon: <Sparkles size={20} />, color: 'text-cyan-400', bg: 'bg-cyan-900/80' },
    success: { icon: <Star size={20} />, color: 'text-green-400', bg: 'bg-green-900/80' },
    warning: { icon: <Zap size={20} />, color: 'text-yellow-400', bg: 'bg-yellow-900/80' },
    error: { icon: <Zap size={20} />, color: 'text-red-400', bg: 'bg-red-900/80' }
  };

  const config = types[type];

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`
            fixed top-4 left-1/2 transform -translate-x-1/2 z-50
            ${config.bg} backdrop-blur-xl text-white px-6 py-4 
            rounded-2xl shadow-2xl border border-white/10
            max-w-md w-full mx-4
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={config.color}>
                {config.icon}
              </div>
              <span className="text-sm font-medium">{message}</span>
            </div>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced loading component
const EnhancedLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-cyan-400"
          >
            <Rocket size={48} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">OrbiX</h3>
            <p className="text-gray-400">{message}</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced tooltip component
const EnhancedTooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`
              absolute z-50 ${positions[position]}
              bg-slate-900/95 backdrop-blur-xl text-white px-3 py-2
              rounded-lg text-sm font-medium border border-white/10
              shadow-2xl whitespace-nowrap
            `}
          >
            {content}
            <div className="absolute w-2 h-2 bg-slate-900/95 border border-white/10 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced progress bar component
const EnhancedProgressBar = ({ 
  progress, 
  label, 
  color = 'cyan',
  showPercentage = true 
}) => {
  const colors = {
    cyan: 'from-cyan-500 to-blue-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-pink-500',
    yellow: 'from-yellow-500 to-orange-500'
  };

  return (
    <div className="mb-4">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm text-cyan-400 font-mono">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export {
  FloatingParticles,
  EnhancedButton,
  EnhancedCard,
  EnhancedSlider,
  EnhancedNotification,
  EnhancedLoading,
  EnhancedTooltip,
  EnhancedProgressBar
}; 