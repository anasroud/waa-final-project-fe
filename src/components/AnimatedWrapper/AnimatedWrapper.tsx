"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedWrapper = ({ children, className }: AnimatedWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
