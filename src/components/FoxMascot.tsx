interface TechFoxProps {
  size?: number;
  className?: string;
  color?: string;
  animated?: boolean;
}

export function TechFox({ size = 40, className = '', color = '#00ffff', animated = false }: TechFoxProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Geometric fox head - sharp lines, tech aesthetic */}
      {/* Left ear */}
      <polygon
        points="25,15 15,45 35,40"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.9"
      />
      <polygon
        points="27,22 20,40 33,37"
        stroke={color}
        strokeWidth="1"
        fill={color}
        opacity="0.1"
      />

      {/* Right ear */}
      <polygon
        points="75,15 85,45 65,40"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.9"
      />
      <polygon
        points="73,22 80,40 67,37"
        stroke={color}
        strokeWidth="1"
        fill={color}
        opacity="0.1"
      />

      {/* Head outline - angular/geometric */}
      <polygon
        points="50,20 20,50 30,78 50,85 70,78 80,50"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />

      {/* Inner face structure */}
      <polygon
        points="50,35 30,55 40,75 50,78 60,75 70,55"
        stroke={color}
        strokeWidth="1"
        fill={color}
        opacity="0.05"
      />

      {/* Eyes - like terminal cursors */}
      {animated ? (
        <>
          <rect x="36" y="48" width="8" height="3" fill={color} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="56" y="48" width="8" height="3" fill={color} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
          </rect>
        </>
      ) : (
        <>
          <rect x="36" y="48" width="8" height="3" fill={color} opacity="0.9" />
          <rect x="56" y="48" width="8" height="3" fill={color} opacity="0.9" />
        </>
      )}

      {/* Nose - small diamond */}
      <polygon
        points="50,58 47,62 50,65 53,62"
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        opacity="0.6"
      />

      {/* Jaw lines */}
      <line x1="47" y1="65" x2="40" y2="72" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="53" y1="65" x2="60" y2="72" stroke={color} strokeWidth="1" opacity="0.4" />

      {/* Circuit/data lines - tech detail */}
      <line x1="15" y1="45" x2="10" y2="45" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="8" cy="45" r="2" fill={color} opacity="0.3" />
      <line x1="85" y1="45" x2="90" y2="45" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="92" cy="45" r="2" fill={color} opacity="0.3" />

      {/* Forehead circuit */}
      <line x1="50" y1="20" x2="50" y2="12" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="50" cy="10" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

export function TechFoxIcon({ size = 24, className = '', color = '#00ffff' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minimal geometric fox for nav */}
      <polygon points="12,3 4,12 7,19 12,21 17,19 20,12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <polygon points="4,12 1,5 8,10" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <polygon points="20,12 23,5 16,10" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <rect x="8" y="11" width="3" height="1.5" fill={color} opacity="0.9" />
      <rect x="13" y="11" width="3" height="1.5" fill={color} opacity="0.9" />
      <polygon points="12,14 11,15.5 12,17 13,15.5" fill={color} opacity="0.5" />
    </svg>
  );
}
