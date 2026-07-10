import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      siz[i] = Math.random() * 0.03 + 0.01;
    }
    return [pos, siz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const baseX = positions[i3];
      const baseY = positions[i3 + 1];
      posAttr.array[i3] = baseX + Math.sin(time * 0.3 + i * 0.1) * 0.3 + mouse.current.x * 0.5;
      posAttr.array[i3 + 1] = baseY + Math.cos(time * 0.2 + i * 0.15) * 0.25 + mouse.current.y * 0.3;
      posAttr.array[i3 + 2] = positions[i3 + 2] + Math.sin(time * 0.4 + i * 0.05) * 0.2;
    }
    posAttr.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#fcd34d"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingRing({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.5;
    ref.current.rotation.z = t * speed * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.4) * 0.5;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 64]} />
      <meshBasicMaterial color="#fcd34d" transparent opacity={0.15} />
    </mesh>
  );
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={180} />
        <FloatingRing position={[-4, 1, -2]} scale={1.5} speed={0.3} />
        <FloatingRing position={[5, -1, -3]} scale={2} speed={0.2} />
        <FloatingRing position={[0, 2, -4]} scale={1.2} speed={0.25} />
      </Canvas>
    </div>
  );
}
