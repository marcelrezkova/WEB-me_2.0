export function GlowOrb({ color, size, top, left, right, bottom }: {
  color: string; size: number;
  top?: string; left?: string; right?: string; bottom?: string;
}) {
  return (
    <div
      className="glow-orb animate-glow-pulse"
      style={{
        width: size, height: size,
        background: color,
        top, left, right, bottom,
      }}
    />
  );
}

export function GridBackground({ className = '' }: { className?: string }) {
  return <div className={`grid-bg pointer-events-none ${className}`} />;
}

export function SectionDivider() {
  return <div className="section-divider w-full" />;
}

export function TerminalPrompt({ command, className = '' }: { command: string; className?: string }) {
  return (
    <span className={`font-mono text-text-secondary ${className}`}>
      <span className="text-neon-green">$</span> <span className="text-text-primary">{command}</span>
    </span>
  );
}
