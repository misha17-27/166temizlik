export function ClockIcon({ className = "h-4 w-4", strokeWidth = 2.3 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M10 5.8v4.4l3.1 1.9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
