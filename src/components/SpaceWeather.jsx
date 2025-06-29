import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SpaceWeather = ({ intensity = 0.5, type = 'solar-flare' }) => {
  const groupRef = useRef();
  const flareRef = useRef();
  const rayRef = useRef();

  // Solar flare effect
  const flareGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(0.1, 2, 8);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }, []);

  const flareMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff6b35),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Cosmic rays effect
  const rayGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      
      positions.push(x, y, z);
      positions.push(x + Math.random() * 10, y + Math.random() * 10, z + Math.random() * 10);
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geometry;
  }, []);

  const rayMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Atmospheric glow effect
  const glowGeometry = useMemo(() => {
    return new THREE.SphereGeometry(50, 32, 32);
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x4fc3c3),
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
    
    if (flareRef.current) {
      flareRef.current.rotation.z = time * 2;
      flareRef.current.material.opacity = 0.3 + Math.sin(time * 3) * 0.2;
    }
    
    if (rayRef.current) {
      rayRef.current.rotation.x = time * 0.05;
      rayRef.current.rotation.y = time * 0.03;
    }
  });

  if (type === 'solar-flare') {
    return (
      <group ref={groupRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            ref={flareRef}
            geometry={flareGeometry}
            material={flareMaterial}
            position={[
              Math.cos(i * Math.PI / 4) * 15,
              Math.sin(i * Math.PI / 4) * 15,
              0
            ]}
            scale={[intensity, intensity, intensity]}
          />
        ))}
      </group>
    );
  }

  if (type === 'cosmic-rays') {
    return (
      <group ref={groupRef}>
        <lineSegments
          ref={rayRef}
          geometry={rayGeometry}
          material={rayMaterial}
          scale={[intensity, intensity, intensity]}
        />
      </group>
    );
  }

  if (type === 'atmospheric-glow') {
    return (
      <mesh geometry={glowGeometry} material={glowMaterial} scale={[intensity, intensity, intensity]} />
    );
  }

  return null;
};

// Space weather controller component
const SpaceWeatherController = ({ weatherType, intensity, onWeatherChange }) => {
  const weatherTypes = [
    { key: 'solar-flare', name: 'Solar Flares', icon: '☀️', color: '#ff6b35' },
    { key: 'cosmic-rays', name: 'Cosmic Rays', icon: '⚡', color: '#4fc3c3' },
    { key: 'atmospheric-glow', name: 'Atmospheric Glow', icon: '🌌', color: '#9b59b6' }
  ];

  return (
    <div className="fixed bottom-4 left-4 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 p-4 z-30">
      <h3 className="text-sm font-medium text-white mb-3">Space Weather</h3>
      <div className="space-y-2">
        {weatherTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => onWeatherChange(type.key)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              weatherType === type.key
                ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/50'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-lg">{type.icon}</span>
            <span className="text-sm">{type.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-3">
        <label className="text-xs text-gray-400 block mb-1">Intensity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={intensity}
          onChange={(e) => onWeatherChange(weatherType, parseFloat(e.target.value))}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
};

export { SpaceWeather, SpaceWeatherController }; 