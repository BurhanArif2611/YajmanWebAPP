type IconProps = { size?: number; className?: string };

export function HeartPlusIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20.5s-7.5-4.6-9.6-9.3C1.2 8.3 2.7 5 6 5c2 0 3.4 1.2 4 2.3C10.6 6.2 12 5 14 5c3.3 0 4.8 3.3 3.6 6.2C15.5 15.9 12 20.5 12 20.5Z" />
      <path d="M12 8v4M10 10h4" />
    </svg>
  );
}

export function RingsIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M7 9.5 9 5l2 4.5M15 9.5 17 5l2 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LampIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4c1 1.6 1.4 2.8 0 4-1.4-1.2-1-2.4 0-4Z" />
      <path d="M5 11c0 3.5 3 5.5 7 5.5s7-2 7-5.5" />
      <path d="M3 11h18" />
      <path d="M9 19h6" />
    </svg>
  );
}
