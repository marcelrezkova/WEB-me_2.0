function mulberry32(seed: number) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function makeNetwork(count: number, radius: number, seed = 1) {
  const rnd = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rnd(), v = rnd();
    const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(rnd());
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
  }
  const out: number[] = [];
  const maxD2 = (radius * 0.35) ** 2;
  for (let i = 0; i < count; i++) {
    let made = 0;
    for (let j = i + 1; j < count && made < 2; j++) {
      const dx = positions[i*3]-positions[j*3], dy = positions[i*3+1]-positions[j*3+1], dz = positions[i*3+2]-positions[j*3+2];
      if (dx*dx+dy*dy+dz*dz < maxD2) { out.push(i, j); made++; }
    }
  }
  return { positions, links: Uint16Array.from(out) };
}
