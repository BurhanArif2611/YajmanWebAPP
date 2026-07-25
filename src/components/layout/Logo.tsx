import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 shrink-0 ${className}`}
      aria-label="Yajman home"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="34" height="34" rx="8" fill="#fb6000" />
        <path
          d="M17 8c-1.4 1.6-2.4 3-2.4 4.4a2.4 2.4 0 0 0 4.8 0C19.4 11 18.4 9.6 17 8Z"
          fill="#fff"
        />
        <path
          d="M11 14.5h12c.4 3-1 5-1.6 7.2-.5 1.8-.2 3.3-.2 3.3H12.8s.3-1.5-.2-3.3c-.6-2.2-2-4.2-1.6-7.2Z"
          fill="#fff"
        />
      </svg>
      <span className="font-sans text-2xl font-extrabold tracking-tight text-brand-saffron-400">
        yajman
      </span>
    </Link>
  );
}
