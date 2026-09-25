export function TechFoxIcon({ size = 24, className = '', color = '#5ef2ff' }: { size?: number; className?: string; color?: string }) {
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
