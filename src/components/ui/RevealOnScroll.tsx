"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  animation = "animate-fade-in-up",
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Tag = Component as "div";
  const visibleClass = reduced ? "opacity-100 translate-y-0" : animation;

  return (
    <Tag
      ref={ref}
      className={cn(className, isVisible ? visibleClass : "opacity-0 translate-y-4")}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
