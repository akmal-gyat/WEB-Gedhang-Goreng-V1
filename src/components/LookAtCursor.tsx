import { useRef, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface LookAtCursorProps {
  children: ReactNode;
  className?: string;
}

export default function LookAtCursor({ children, className = "" }: LookAtCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth springs for fluid 3D rotations
  const springX = useSpring(rotateX, { damping: 25, stiffness: 220 });
  const springY = useSpring(rotateY, { damping: 25, stiffness: 220 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Find the absolute center of the container element
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      // Measure cursor offset from the element center
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // Map offset to maximum degrees of rotation (e.g., maximum 20 degrees tilt)
      // Normalizing based on window boundaries ensures a smooth and non-erratic sweep
      const rY = (offsetX / (window.innerWidth / 2)) * 22;
      const rX = -(offsetY / (window.innerHeight / 2)) * 22;

      rotateX.set(rX);
      rotateY.set(rY);
    };

    const handleMouseLeave = () => {
      // Re-center beautifully
      rotateX.set(0);
      rotateY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rotateX, rotateY]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
