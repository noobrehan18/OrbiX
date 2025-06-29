import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleEffects = ({ count = 1000, size = 0.02, color = '#ffffff', speed = 0.001 }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.02;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
    });
    return positions;
  }, [particles, count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      const { factor, speed, x, y, z } = particle;
      
      const nx = x + Math.cos((time + factor) * speed) * 50;
      const ny = y + Math.sin((time + factor) * speed) * 50;
      const nz = z + Math.cos((time + factor) * speed) * 50;
      
      mesh.current.geometry.attributes.position.array[i * 3] = nx;
      mesh.current.geometry.attributes.position.array[i * 3 + 1] = ny;
      mesh.current.geometry.attributes.position.array[i * 3 + 2] = nz;
    });
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleEffects; 