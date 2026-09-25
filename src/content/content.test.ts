import { describe, it, expect } from 'vitest';
import { hero, services, steps, work, stack } from './index';
import { links } from '../config';
// ?raw reads the file as text via Vite (no @types/node needed for typecheck)
import indexHtml from '../../index.html?raw';

const CZECH = /[ěščřžýáíéůú]/i;
const BANNED = /trefk|simon|iiidm|czechpaygap|drahenice|kraj vyso|elmarce/i;

describe('content', () => {
  it('has three services, four steps, five work cards', () => {
    expect(services).toHaveLength(3); expect(steps).toHaveLength(4); expect(work).toHaveLength(5);
  });
  it('contains no Czech text and no project names', () => {
    const all = JSON.stringify({ hero, services, steps, work, stack }).replace(/Řezková/g, '');
    expect(all).not.toMatch(CZECH); expect(all).not.toMatch(BANNED);
  });
  it('calendar link is a live calendar.app.google URL', () => {
    expect(links.calendar).toMatch(/^https:\/\/calendar\.app\.google\//);
  });
  it('stripe payment link is a live buy.stripe.com URL', () => {
    expect(links.stripe).toMatch(/^https:\/\/buy\.stripe\.com\//);
  });
  it('static hero in index.html matches hero copy verbatim', () => {
    expect(indexHtml).toContain(hero.kicker);
    expect(indexHtml).toContain(hero.title);
    expect(indexHtml).toContain(hero.sub);
  });
});
