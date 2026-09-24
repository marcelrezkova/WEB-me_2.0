import { describe, it, expect } from 'vitest';
import { makeNetwork } from './particles';
describe('makeNetwork', () => {
  it('returns count*3 positions inside the radius and pairs of valid indices', () => {
    const { positions, links } = makeNetwork(200, 5, 42);
    expect(positions).toHaveLength(600);
    for (let i = 0; i < 200; i++) {
      const r = Math.hypot(positions[i*3], positions[i*3+1], positions[i*3+2]);
      expect(r).toBeLessThanOrEqual(5.0001);
    }
    expect(links.length % 2).toBe(0);
    for (const idx of links) expect(idx).toBeLessThan(200);
  });
  it('is deterministic for a seed', () => {
    expect(makeNetwork(50, 3, 7).positions).toEqual(makeNetwork(50, 3, 7).positions);
  });
});
