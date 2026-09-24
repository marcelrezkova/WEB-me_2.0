import { describe, it, expect } from 'vitest';
import { hero, services, steps, work, stack } from './index';
import { links, bookingUrl } from '../config';

const CZECH = /[ěščřžýáíéůú]/i;
const BANNED = /trefk|simon|iiidm|czechpaygap|drahenice|kraj vyso|elmarce/i;

describe('content', () => {
  it('has three services, four steps, five work cards', () => {
    expect(services).toHaveLength(3); expect(steps).toHaveLength(4); expect(work).toHaveLength(5);
  });
  it('contains no Czech text and no project names', () => {
    const all = JSON.stringify({ hero, services, steps, work, stack });
    expect(all).not.toMatch(CZECH); expect(all).not.toMatch(BANNED);
  });
  it('booking falls back to calendar when stripe is empty', () => {
    expect(links.calendar).toMatch(/^https:\/\/calendar\.app\.google\//);
    expect(bookingUrl()).toBe(links.stripe || links.calendar);
  });
});
