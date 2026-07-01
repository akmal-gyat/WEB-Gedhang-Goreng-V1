import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Set up layout scroll tracking for the specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.4"]
  });

  // Split into characters (retaining spaces beautifully via word spacing wrapper)
  const characters = text.split("");
  const totalChars = characters.length;

  return (
    <p 
      ref={containerRef} 
      className={`flex flex-wrap justify-center select-none ${className}`}
    >
      {characters.map((char, index) => {
        // Compute individual character fade-in boundaries
        const start = index / totalChars;
        const end = Math.min(1, (index + 3) / totalChars); // slightly overlap to make reading smoother
        
        // Map viewport scroll progress to character opacity (0.2 -> 1)
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span
            key={index}
            style={{ opacity }}
            className={`inline-block ${char === " " ? "w-[0.25em]" : ""}`}
          >
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}
