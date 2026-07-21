import React, { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─── Reveal ────────────────────────────────────────────────────────────────────
interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ─────────────────────────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const staggerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

export function Stagger({
  children,
  staggerDelay = 0.1,
  className = "",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ───────────────────────────────────────────────────────────────
interface StaggerItemProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (duration: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function StaggerItem({
  children,
  duration = 0.65,
  className = "",
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      custom={duration}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
