import { describe, it, expect } from 'vitest';
import { scrambleFrames } from './scrambleFrames';
describe('scrambleFrames', () => {
  it('ends on the target, keeps length and spaces, resolves left to right', () => {
    const frames = scrambleFrames('AB CD', 6, () => 0.5);
    expect(frames.at(-1)).toBe('AB CD');
    for (const f of frames) { expect(f).toHaveLength(5); expect(f[2]).toBe(' '); }
    expect(frames[3].startsWith('AB')).toBe(true);
  });
});
