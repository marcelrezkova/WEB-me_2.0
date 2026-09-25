import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { makeNetwork } from './particles';

const REVEAL_SECONDS = 3;
const POINT_SIZE = 0.035;
const POINT_OPACITY = 0.9;
const LINE_OPACITY = 0.12;
const easeInOutSine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;

function Network({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointsMat = useRef<THREE.PointsMaterial>(null);
  const linesMat = useRef<THREE.LineBasicMaterial>(null);
  // "Turning the light up": points grow and brighten from black over REVEAL_SECONDS, links follow.
  const elapsed = useRef(animate ? 0 : REVEAL_SECONDS);
  const pointer = useThree((s) => s.pointer);
  const { positions, links } = useMemo(() => makeNetwork(count, 6, 11), [count]);
  const linePositions = useMemo(() => {
    const arr = new Float32Array(links.length * 3);
    links.forEach((idx, k) => { arr[k*3] = positions[idx*3]; arr[k*3+1] = positions[idx*3+1]; arr[k*3+2] = positions[idx*3+2]; });
    return arr;
  }, [positions, links]);
  useFrame((_, dt) => {
    if (!group.current) return;
    if (elapsed.current < REVEAL_SECONDS) {
      elapsed.current = Math.min(elapsed.current + dt, REVEAL_SECONDS);
      const r = easeInOutSine(elapsed.current / REVEAL_SECONDS);
      if (pointsMat.current) { pointsMat.current.opacity = POINT_OPACITY * r; pointsMat.current.size = POINT_SIZE * (0.15 + 0.85 * r); }
      if (linesMat.current) linesMat.current.opacity = LINE_OPACITY * Math.max(0, (r - 0.35) / 0.65);
      group.current.scale.setScalar(0.9 + 0.1 * r);
    }
    group.current.rotation.y += dt * 0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.25, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.25, 0.05);
  });
  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <pointsMaterial ref={pointsMat} size={animate ? 0 : POINT_SIZE} color="#5ef2ff" transparent opacity={animate ? 0 : POINT_OPACITY} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry>
        <lineBasicMaterial ref={linesMat} color="#5ef2ff" transparent opacity={animate ? 0 : LINE_OPACITY} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function ParticleField({ count = 1600, animate = true }: { count?: number; animate?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // The whole layer also fades in from black so the first frame never pops in fully lit.
  const [lit, setLit] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => setLit(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);
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
    <div ref={wrap} style={{ position: 'absolute', inset: 0, opacity: lit ? 1 : 0, transition: animate ? `opacity ${REVEAL_SECONDS}s cubic-bezier(0.4, 0, 0.2, 1)` : 'none' }}>
      <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 9], fov: 55 }} frameloop={frameloop}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        eventSource={document.body} eventPrefix="client"
        style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <Network count={count} animate={animate} />
      </Canvas>
    </div>
  );
}
