const GLYPHS = '#%&/<>=+*_-01';
export function scrambleFrames(target: string, frames: number, rnd: () => number = Math.random): string[] {
  const out: string[] = [];
  for (let f = 1; f <= frames; f++) {
    const resolved = Math.round((f / frames) * target.length);
    let s = '';
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      s += ch === ' ' || i < resolved ? ch : GLYPHS[Math.floor(rnd() * GLYPHS.length)];
    }
    out.push(s);
  }
  out[out.length - 1] = target;
  return out;
}
