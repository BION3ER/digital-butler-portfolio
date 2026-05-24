import { useRef, type FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, OrbitControls } from '@react-three/drei';
import type { Mesh } from 'three';

const AnimatedTorusKnot: FC = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state): void => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Continuous rotation
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Hover effect - subtle scaling based on mouse position
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    const baseScale = 1;
    const hoverScale = baseScale + Math.abs(mouseX) * 0.1 + Math.abs(mouseY) * 0.1;
    
    meshRef.current.scale.setScalar(hoverScale);
  });

  return (
    <TorusKnot
      ref={meshRef}
      args={[1, 0.3, 128, 32]}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial
        color="#6366f1"
        emissive="#4f46e5"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </TorusKnot>
  );
};

const ButlerModel: FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        {/* Main 3D object */}
        <AnimatedTorusKnot />
        
        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default ButlerModel;
