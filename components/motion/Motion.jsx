'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Lenis from 'lenis';

const premiumEase = [0.16, 1, 0.3, 1];

export function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (reduce || isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let id;
    const raf = (time) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };

    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function ScrollProgress({ color = '#65BC46' }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX, backgroundColor: color, transformOrigin: '0% 50%' }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full"
    />
  );
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.9,
  y = 32,
  className = '',
  once = true,
  as: Tag = 'div',
}) {
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration, delay, ease: premiumEase }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function RevealText({
  text,
  children,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.06,
  as: Tag = 'span',
}) {
  const source = text ?? (typeof children === 'string' ? children : '');
  const words = source.split(/(\s+)/);
  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {words.map((word, index) =>
        /\s+/.test(word) ? (
          <span key={`${word}-${index}`}>{word}</span>
        ) : (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.85, ease: premiumEase },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        )
      )}
    </MotionTag>
  );
}

export function Parallax({ children, offset = 80, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleOnScroll({ children, from = 1, to = 1.15, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.55]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export function CountUp({ to = 100, from = 0, duration = 1.6, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return undefined;

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function MagneticHover({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({ children, max = 6, className = '' }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 18 });

  const onMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max);
    rotateX.set(-py * max);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionIndicator({ sections = [] }) {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!sections.length) return;
    setActive(Math.min(sections.length - 1, Math.floor(latest * sections.length)));
  });

  if (!sections.length) return null;

  return (
    <div className="pointer-events-none fixed bottom-8 left-8 z-40 hidden flex-col gap-2 text-xs uppercase tracking-[0.22em] text-white mix-blend-difference lg:flex">
      <div className="flex items-center gap-3">
        <span className="font-semibold tabular-nums">{String(active + 1).padStart(2, '0')}</span>
        <span className="h-px w-8 bg-current/40" />
        <span className="opacity-60 tabular-nums">{String(sections.length).padStart(2, '0')}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={sections[active]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] tracking-[0.28em] opacity-80"
        >
          {sections[active]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
