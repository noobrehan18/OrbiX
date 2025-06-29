import { OrbitControls } from '@react-three/drei';
import React, { useState, Suspense, lazy, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  X, 
  Settings, 
  Eye, 
  EyeOff, 
  VolumeX, 
  Volume2, 
  Rocket, 
  Menu,
  BarChart3,
  HelpCircle,
  Zap,
  Globe,
  Star,
  Sparkles
} from 'lucide-react';

// Data
import { planetData, cameraPositions } from './planetData';

// Context
import { PlaygroundProvider, usePlayground } from './PlaygroundContext';

// Enhanced UI Components
import {
  EnhancedButton,
  EnhancedCard,
  EnhancedNotification,
  EnhancedTooltip,
  FloatingParticles
} from './components/EnhancedUI';

// New Components
import NavigationMenu from './components/NavigationMenu';
import PlanetComparison from './components/PlanetComparison';
import TutorialSystem from './components/TutorialSystem';
import { SpaceWeather, SpaceWeatherController } from './components/SpaceWeather';
import ParticleEffects from './components/ParticleEffects';

// Only import essential components directly
import Sun from './Sun';
import Starfield from './Starfield';
import RocketLoader from './RocketLoader';
import PlanetInfo from './PlanetInfo';
import Moon from './Moon';
import Playground from './Playground';

// Lazy load the rest
const Mercury = lazy(() => import('./Mercury'));
const Venus = lazy(() => import('./Venus'));
const Earth = lazy(() => import('./Earth'));
const Mars = lazy(() => import('./Mars'));
const AsteroidBelt = lazy(() => import('./AsteroidBelt'));
const Jupiter = lazy(() => import('./Jupiter'));
const Saturn = lazy(() => import('./Saturn'));
const Uranus = lazy(() => import('./Uranus'));
const Neptune = lazy(() => import('./Neptune'));
const OrbitLine = lazy(() => import('./OrbitLine'));

// Camera Controls Component
const CameraController = ({ target, enabled }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (!enabled || !target) return;
    
    const targetPosition = cameraPositions[target] || cameraPositions.Overview;
    
    gsap.to(camera.position, {
      duration: 2,
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      onUpdate: () => {
        if (target === 'Overview') {
          camera.lookAt(0, 0, 0);
        }
      },
      onComplete: () => {
        camera.lookAt(0, 0, 0);
      }
    });
  }, [target, camera, enabled]);
  
  return null;
};

// Audio Manager Component
const AudioManager = ({ muted }) => {
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio('/sounds/space.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    
    // Add click handler to play audio (browser policy)
    const handleInteraction = () => {
      audio.play().catch(() => {
        // Autoplay was prevented, that's fine
      });
      document.removeEventListener('click', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    
    return () => {
      audio.pause();
      document.removeEventListener('click', handleInteraction);
    };
  }, []);
  
  // Handle mute/unmute
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (muted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay was prevented, that's fine
      });
    }
  }, [muted]);
  
  return null;
};

const SolarContent = () => {
  // Base states
  const [showOrbitLines, setShowOrbitLines] = useState(true);
  const [loadStage, setLoadStage] = useState(0);
  
  // Feature states
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  
  // New feature states
  const [showNavigation, setShowNavigation] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [spaceWeatherType, setSpaceWeatherType] = useState('solar-flare');
  const [spaceWeatherIntensity, setSpaceWeatherIntensity] = useState(0.5);
  const [showSpaceWeather, setShowSpaceWeather] = useState(false);
  
  // Enhanced UI states
  const [showStats, setShowStats] = useState(false);
  const [currentStats, setCurrentStats] = useState({
    planetsLoaded: 0,
    totalPlanets: 8,
    particlesActive: 2000,
    weatherActive: false
  });
  
  // Get playground values
  const { values } = usePlayground();
  
  // Orbit controls ref to disable during camera transitions
  const orbitControlsRef = useRef();
  
  // Handle planet click
  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };
  
  // Close planet info panel
  const closePlanetInfo = () => {
    setSelectedPlanet(null);
  };
  
  // Fly to specific location
  const flyTo = (target) => {
    setCameraTarget(target);
    
    // If clicking on a planet that's already selected, close the info panel
    if (selectedPlanet === target) {
      setSelectedPlanet(null);
    } else {
      setSelectedPlanet(target);
    }
  };
  
  // Handle space weather change
  const handleSpaceWeatherChange = (type, intensity = 0.5) => {
    if (typeof type === 'string' && typeof intensity === 'number') {
      setSpaceWeatherType(type);
      setSpaceWeatherIntensity(intensity);
    } else {
      setSpaceWeatherType(type);
    }
    setShowSpaceWeather(true);
    setCurrentStats(prev => ({ ...prev, weatherActive: true }));
  };
  
  // Progressive loading of planets
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadStage < 5) {
        setLoadStage(loadStage + 1);
        setCurrentStats(prev => ({ 
          ...prev, 
          planetsLoaded: Math.min(loadStage + 1, 8) 
        }));
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [loadStage]);
  
  // Show toast after loading is complete
  useEffect(() => {
    if (loadStage === 5) {
      // Wait a bit after loading completes before showing toast
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loadStage]);
  
  // Disable orbit controls during camera transitions
  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = !cameraTarget;
    }
  }, [cameraTarget]);

  return (
    <div className="relative w-full h-screen">
      {/* Enhanced Floating Particles */}
      <FloatingParticles />
      
      {/* Enhanced Toast notification */}
      <EnhancedNotification 
        message="🚀 Welcome to OrbiX! Click on any planet to learn more. Try the playground to customize everything live!"
        type="info"
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />
      
      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {/* Tutorial button */}
        <EnhancedTooltip content="Interactive Tutorial">
          <EnhancedButton
            onClick={() => setShowTutorial(true)}
            variant="secondary"
            size="sm"
            icon={<HelpCircle size={14} />}
          >
            <span className="hidden sm:inline">Tutorial</span>
          </EnhancedButton>
        </EnhancedTooltip>
        
        {/* Navigation button */}
        <EnhancedTooltip content="Quick Navigation">
          <EnhancedButton
            onClick={() => setShowNavigation(!showNavigation)}
            variant="secondary"
            size="sm"
            icon={<Menu size={14} />}
          >
            <span className="hidden sm:inline">Navigate</span>
          </EnhancedButton>
        </EnhancedTooltip>
        
        {/* Comparison button */}
        <EnhancedTooltip content="Compare Planets">
          <EnhancedButton
            onClick={() => setShowComparison(true)}
            variant="secondary"
            size="sm"
            icon={<BarChart3 size={14} />}
          >
            <span className="hidden sm:inline">Compare</span>
          </EnhancedButton>
        </EnhancedTooltip>
        
        {/* Stats button */}
        <EnhancedTooltip content="System Stats">
          <EnhancedButton
            onClick={() => setShowStats(!showStats)}
            variant={showStats ? "primary" : "secondary"}
            size="sm"
            icon={<Sparkles size={14} />}
          >
            <span className="hidden sm:inline">Stats</span>
          </EnhancedButton>
        </EnhancedTooltip>
        
        {/* Playground toggle button */}
        <EnhancedTooltip content="Interactive Playground">
          <EnhancedButton
            onClick={() => setShowPlayground(!showPlayground)}
            variant={showPlayground ? "primary" : "secondary"}
            size="sm"
            icon={<Rocket size={14} />}
          >
            <span className="hidden sm:inline">Playground</span>
          </EnhancedButton>
        </EnhancedTooltip>
        
        {/* Orbit lines toggle button */}
        <EnhancedTooltip content={showOrbitLines ? "Hide Orbit Lines" : "Show Orbit Lines"}>
          <EnhancedButton
            onClick={() => setShowOrbitLines(!showOrbitLines)}
            variant="secondary"
            size="sm"
            icon={showOrbitLines ? <EyeOff size={14} /> : <Eye size={14} />}
          >
            <span className="hidden sm:inline">{showOrbitLines ? 'Hide Orbits' : 'Show Orbits'}</span>
          </EnhancedButton>
        </EnhancedTooltip>
      </div>
      
      {/* Left Controls */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
        {/* Audio control button */}
        <EnhancedTooltip content={audioMuted ? "Unmute Audio" : "Mute Audio"}>
          <EnhancedButton
            onClick={() => setAudioMuted(!audioMuted)}
            variant={audioMuted ? "danger" : "secondary"}
            size="sm"
            icon={audioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            className="w-10 h-10 p-0 justify-center"
          />
        </EnhancedTooltip>
        
        {/* Space Weather button */}
        <EnhancedTooltip content="Space Weather Effects">
          <EnhancedButton
            onClick={() => setShowSpaceWeather(!showSpaceWeather)}
            variant={showSpaceWeather ? "primary" : "secondary"}
            size="sm"
            icon={<Zap size={16} />}
            className="w-10 h-10 p-0 justify-center"
          />
        </EnhancedTooltip>
      </div>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute top-20 left-5 z-20"
          >
            <EnhancedCard
              title="System Stats"
              subtitle="Real-time information"
              icon={<Globe size={20} />}
              className="w-80"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Planets Loaded</span>
                  <span className="text-cyan-400 font-mono">
                    {currentStats.planetsLoaded}/{currentStats.totalPlanets}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Particles Active</span>
                  <span className="text-cyan-400 font-mono">
                    {currentStats.particlesActive.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Weather Effects</span>
                  <span className={`font-mono ${currentStats.weatherActive ? 'text-green-400' : 'text-gray-400'}`}>
                    {currentStats.weatherActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Time Scale</span>
                  <span className="text-cyan-400 font-mono">
                    {values.timeScale}x
                  </span>
                </div>
              </div>
            </EnhancedCard>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation Menu */}
      <NavigationMenu 
        isOpen={showNavigation}
        onToggle={() => setShowNavigation(false)}
        onPlanetSelect={flyTo}
        onOverview={() => flyTo('Overview')}
      />
      
      {/* Planet Comparison */}
      <PlanetComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
      
      {/* Tutorial System */}
      <TutorialSystem 
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={() => setShowTutorial(false)}
      />
      
      {/* Space Weather Controller */}
      {showSpaceWeather && (
        <SpaceWeatherController 
          weatherType={spaceWeatherType}
          intensity={spaceWeatherIntensity}
          onWeatherChange={handleSpaceWeatherChange}
        />
      )}
      
      {/* Playground Panel */}
      <Playground isOpen={showPlayground} onClose={() => setShowPlayground(false)} />
      
      {/* Audio manager (out of sight) */}
      <AudioManager muted={audioMuted} />
      
      {/* Planet info panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <PlanetInfo planet={selectedPlanet} onClose={closePlanetInfo} />
        )}
      </AnimatePresence>
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [200, 50, 120], fov: 50 }}
        className="absolute inset-0 z-0"
        shadows
        gl={{ 
          antialias: true,
          powerPreference: "high-performance" 
        }}
      >
        <color attach="background" args={['#030718']} />
        <ambientLight intensity={values.ambientLight} />
        
        {/* Camera controller */}
        <CameraController target={cameraTarget} enabled={!!cameraTarget} />
        
        {/* Particle Effects */}
        <ParticleEffects count={2000} size={0.015} color="#4fc3c3" speed={0.0005} />
        
        {/* Space Weather Effects */}
        {showSpaceWeather && (
          <SpaceWeather 
            type={spaceWeatherType} 
            intensity={spaceWeatherIntensity} 
          />
        )}
        
        {/* Essential components load first */}
        <Suspense fallback={<RocketLoader />}>
          <Starfield />
          <Sun 
            position={[0, 0, 0]} 
            onClick={handlePlanetClick}
            timeSpeed={values.timeScale}
          />
          
          {/* Inner planets load next */}
          {loadStage >= 1 && (
            <>
              <Suspense fallback={null}>
                {showOrbitLines && <OrbitLine radius={values.mercuryOrbit} color="#6A6A92" eccentricity={0.2}/>}
                <Mercury 
                  orbitRadius={values.mercuryOrbit}
                  onClick={handlePlanetClick}
                  timeSpeed={values.timeScale}
                />
                
                {showOrbitLines && <OrbitLine radius={values.venusOrbit} color="#E89D65" eccentricity={0.1}/>}
                <Venus 
                  orbitRadius={values.venusOrbit}
                  onClick={handlePlanetClick}
                  timeSpeed={values.timeScale}
                />
              </Suspense>
            </>
          )}
          
          {/* Earth and Mars */}
          {loadStage >= 2 && (
            <Suspense fallback={null}>
              {showOrbitLines && <OrbitLine radius={values.earthOrbit} color="#4A99E9" eccentricity={0.017}/>}
              <Earth 
                orbitRadius={values.earthOrbit}
                onClick={handlePlanetClick}
                timeSpeed={values.timeScale}
              />
              
              {showOrbitLines && <OrbitLine radius={values.marsOrbit} color="#E27B58" eccentricity={0.09}/>}
              <Mars 
                orbitRadius={values.marsOrbit}
                onClick={handlePlanetClick}
                timeSpeed={values.timeScale}
              />
            </Suspense>
          )}
          
          {/* Asteroid belt - load after Mars */}
          {loadStage >= 3 && (
            <Suspense fallback={null}>
              <AsteroidBelt 
                innerRadius={values.marsOrbit + 6} 
                outerRadius={values.jupiterOrbit - 10} 
                count={800}
              />
            </Suspense>
          )}
          
          {/* Outer planets */}
          {loadStage >= 4 && (
            <Suspense fallback={null}>
              {showOrbitLines && <OrbitLine radius={values.jupiterOrbit} color="#E8C275" eccentricity={0.049}/>}
              <Jupiter 
                orbitRadius={values.jupiterOrbit} 
                onClick={handlePlanetClick}
                timeSpeed={values.timeScale}
              />
              
              {showOrbitLines && <OrbitLine radius={values.saturnOrbit} color="#E8B465" eccentricity={0.057}/>}
              <Saturn 
                orbitRadius={values.saturnOrbit} 
                onClick={handlePlanetClick}
                timeSpeed={values.timeScale}
              />
            </Suspense>
          )}
          
          {/* Furthest planets */}
          {loadStage >= 5 && (
            <Suspense fallback={null}>
              {showOrbitLines && <OrbitLine radius={values.uranusOrbit} color="#4FC3C3" eccentricity={0.046}/>}
              <Uranus 
                orbitRadius={values.uranusOrbit} 
                onClick={handlePlanetClick}
                timeSpeed={values.timeScale}
              />
              
              {showOrbitLines && <OrbitLine radius={values.neptuneOrbit} color="#3066BE" eccentricity={0.009}/>}
              <Neptune 
                orbitRadius={values.neptuneOrbit} 
                onClick={handlePlanetClick}
                timeSpeed={values.timeScale}
              />
            </Suspense>
          )}
          
          <OrbitControls
            ref={orbitControlsRef}
            enablePan={true}
            enableZoom={true}
            minDistance={17}
            maxDistance={500}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

const Solar = () => {
  return (
    <PlaygroundProvider>
      <SolarContent />
    </PlaygroundProvider>
  );
};

export default Solar;