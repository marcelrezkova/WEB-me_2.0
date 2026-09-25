import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { makeNetwork } from './particles';

function Network({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const { positions, links } = useMemo(() => makeNetwork(count, 6, 11), [count]);
  const linePositions = useMemo(() => {
    const arr = new Float32Array(links.length * 3);
    links.forEach((idx, k) => { arr[k*3] = positions[idx*3]; arr[k*3+1] = positions[idx*3+1]; arr[k*3+2] = positions[idx*3+2]; });
    return arr;
  }, [positions, links]);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.25, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.25, 0.05);
  });
  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <pointsMaterial size={0.035} color="#5ef2ff" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#5ef2ff" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function ParticleField({ count = 1600, animate = true }: { count?: number; animate?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Stop the render loop entirely while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const frameloop = !visible ? 'never' : animate ? 'always' : 'demand';
  // The hero background layer is pointer-events-none, so pointer tracking is attached to
  // document.body (client coordinates) instead of the canvas parent.
  return (
    <div ref={wrap} style={{ position: 'absolute', inset: 0 }}>
      <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 9], fov: 55 }} frameloop={frameloop}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        eventSource={document.body} eventPrefix="client"
        style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <Network count={count} />
      </Canvas>
    </div>
  );
}
