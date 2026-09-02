"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* Deterministic seeded PRNG — stable positions, React-purity-safe. */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A floating abstract wireframe object — represents an "idea". */
function IdeaShape({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.005;
      meshRef.current.rotation.y += speed * 0.008;
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y =
        position[1] + Math.sin(t * 0.4 + position[0] * 2) * 0.25;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

/**
 * Communication network: nodes (points) joined by connection lines,
 * plus floating abstract objects and a slow rotating particle field.
 * Represents connection, collaboration, communication and ideas.
 */
function Scene({ mobile }: { mobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodeCount = mobile ? 34 : 90;
  const particleCount = mobile ? 120 : 320;

  const { nodePositions, edgePositions } = useMemo(() => {
    const rand = mulberry32(7);
    const nodes = new Float32Array(nodeCount * 3);
    const nodeArr: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (rand() - 0.5) * 14;
      const y = (rand() - 0.5) * 8;
      const z = (rand() - 0.5) * 6;
      nodes[i * 3] = x;
      nodes[i * 3 + 1] = y;
      nodes[i * 3 + 2] = z;
      nodeArr.push(new THREE.Vector3(x, y, z));
    }

    // Connect nearby nodes into a network lattice.
    const edges: number[] = [];
    const maxDist = mobile ? 2.6 : 3.2;
    for (let i = 0; i < nodeArr.length; i++) {
      for (let j = i + 1; j < nodeArr.length; j++) {
        if (nodeArr[i].distanceTo(nodeArr[j]) < maxDist) {
          edges.push(nodeArr[i].x, nodeArr[i].y, nodeArr[i].z);
          edges.push(nodeArr[j].x, nodeArr[j].y, nodeArr[j].z);
        }
      }
    }
    return { nodePositions: nodes, edgePositions: new Float32Array(edges) };
  }, [nodeCount, mobile]);

  const particlePositions = useMemo(() => {
    const rand = mulberry32(21);
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (rand() - 0.5) * 22;
      pos[i * 3 + 1] = (rand() - 0.5) * 12;
      pos[i * 3 + 2] = (rand() - 0.5) * 8;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0006;
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 4, 4]} color="#00D9FF" intensity={1.2} />
      <pointLight position={[-6, -4, 2]} color="#7C3AED" intensity={0.9} />

      <group ref={groupRef}>
        {/* Connection lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[edgePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00D9FF"
            transparent
            opacity={mobile ? 0.12 : 0.16}
          />
        </lineSegments>

        {/* Communication nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={mobile ? 0.1 : 0.07}
            color="#00D9FF"
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>

        {/* Ambient particle field */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#7C3AED"
            transparent
            opacity={0.4}
            sizeAttenuation
          />
        </points>

        {/* Floating abstract idea objects */}
        <IdeaShape position={[-5, 2, -2]} color="#00D9FF" scale={0.35} speed={0.5} />
        <IdeaShape position={[5, -2, -3]} color="#7C3AED" scale={0.45} speed={0.3} />
        <IdeaShape position={[3, 2.5, -1.5]} color="#39FF88" scale={0.28} speed={0.7} />
        <IdeaShape position={[-4, -2.5, -1]} color="#00D9FF" scale={0.3} speed={0.4} />
      </group>
    </>
  );
}

export default function ContactScene() {
  // Detect small screens once so heavy network detail is reduced for mobile.
  const [mobile] = useState(
    () => typeof window !== "undefined" && (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches)
  );

  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, dpr]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent", position: "absolute", inset: 0 }}
    >
      <Scene mobile={mobile} />
    </Canvas>
  );
}
