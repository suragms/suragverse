"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, scale, rotationSpeed }: {
  position: [number, number, number];
  color: string;
  scale: number;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      meshRef.current.rotation.x += rotationSpeed * 0.005;
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({ onClick }: { onClick?: () => void }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const rotationY = t * 0.15;
    const rotationX = Math.sin(t * 0.2) * 0.1;
    const scale = 1 + Math.sin(t * 0.5) * 0.02;

    if (innerRef.current) {
      innerRef.current.rotation.y = rotationY;
      innerRef.current.rotation.x = rotationX;
      innerRef.current.scale.set(scale, scale, scale);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -rotationY * 0.5;
      wireRef.current.rotation.x = -rotationX;
      wireRef.current.rotation.z = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Inner glowing sphere */}
      <mesh
        ref={innerRef}
        onPointerDown={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          color="#00D9FF"
          roughness={0.3}
          metalness={0.7}
          emissive="#00D9FF"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.3, 20, 20]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      {/* Orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.9, 0.015, 2, 128]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Angular second ring */}
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.008, 2, 128]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

/** Deterministic pseudo-random generator (mulberry32) — keeps particle
 *  positions stable across re-renders and satisfies the React purity rule. */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const rand = mulberry32(42);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 8 + rand() * 8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
      meshRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#7C3AED"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ mouseX, mouseY, onObjectClick }: { mouseX: number; mouseY: number; onObjectClick?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.005 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouseY * 0.003 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 0]} color="#7C3AED" intensity={1} />
      <pointLight position={[0, 5, 0]} color="#00D9FF" intensity={0.5} />

      <Stars
        radius={50}
        depth={30}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <group ref={groupRef}>
        <GlowingSphere onClick={onObjectClick} />
        <Particles count={300} />
        <FloatingShape position={[-4, 1.5, -2]} color="#00D9FF" scale={0.4} rotationSpeed={0.5} />
        <FloatingShape position={[4, -1, -3]} color="#7C3AED" scale={0.6} rotationSpeed={0.3} />
        <FloatingShape position={[3, 2, -1]} color="#39FF88" scale={0.3} rotationSpeed={0.7} />
        <FloatingShape position={[-3, -1.5, -1]} color="#00D9FF" scale={0.35} rotationSpeed={0.4} />
      </group>
    </>
  );
}

export default function HeroScene({ mouseX = 0, mouseY = 0, onObjectClick }: { mouseX?: number; mouseY?: number; onObjectClick?: () => void }) {
  // Limit DPR to 2 on all devices for performance
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, dpr]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} onObjectClick={onObjectClick} />
    </Canvas>
  );
}
