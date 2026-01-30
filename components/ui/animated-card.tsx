"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export function AnimatedCard({
  children,
  index = 0,
  className,
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
      }}
      className={cn(
        "glass-card rounded-xl p-6 relative overflow-hidden",
        "hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,119,182,0.15)]",
        "active:scale-[0.98] transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
