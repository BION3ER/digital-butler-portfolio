import { useRef, type FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, OrbitControls } from '@react-three/drei';
import type { Mesh } from 'three';

interface AnimatedTorusProps {
  color: string;
  position: [number, number, number];
  rotationSpeed: number;
  rotationOffset?: [number, number, number];
}

const AnimatedTorus: FC<AnimatedTorusProps> = ({ 
  color, 
  position, 
  rotationSpeed,
  rotationOffset = [0, 0, 0]
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state): void => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Continuous rotation with individual speed
    meshRef.current.rotation.x = time * rotationSpeed + rotationOffset[0];
    meshRef.current.rotation.y = time * (rotationSpeed * 1.2) + rotationOffset[1];
    meshRef.current.rotation.z = time * (rotationSpeed * 0.8) + rotationOffset[2];

    // Hover effect - subtle scaling based on mouse position
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    const baseScale = 1;
    const hoverScale = baseScale + Math.abs(mouseX) * 0.05 + Math.abs(mouseY) * 0.05;

    meshRef.current.scale.setScalar(hoverScale);
  });

  return (
    <Torus
      ref={meshRef}
      args={[1.2, 0.12, 64, 100]}
      position={position}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </Torus>
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
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />

        {/* Three colored rings - Red, Blue, Green */}
        {/* Red Ring - tilted on X axis */}
        <AnimatedTorus 
          color="#ef4444" 
          position={[0, 0, 0]} 
          rotationSpeed={0.3} 
          rotationOffset={[Math.PI / 3, 0, 0]}
        />
        {/* Blue Ring - tilted on Y axis */}
        <AnimatedTorus 
          color="#3b82f6" 
          position={[0, 0, 0]} 
          rotationSpeed={0.4} 
          rotationOffset={[0, Math.PI / 3, 0]}
        />
        {/* Green Ring - tilted on Z axis */}
        <AnimatedTorus 
          color="#22c55e" 
          position={[0, 0, 0]} 
          rotationSpeed={0.5} 
          rotationOffset={[0, 0, Math.PI / 3]}
        />

        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default ButlerModel;
