// Smooth scroll animation utilities for 6star website
// Inspired by premium websites like duuo.dk

export const smoothAnimationStyles = `
  /* Base scroll reveal animation */
  .scroll-reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: 
      opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
  }
  
  .scroll-reveal.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Fade only variant */
  .scroll-reveal-fade {
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity;
  }
  
  .scroll-reveal-fade.animate-in {
    opacity: 1;
  }

  /* Scale up variant */
  .scroll-reveal-scale {
    opacity: 0;
    transform: scale(0.95);
    transition: 
      opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
  }
  
  .scroll-reveal-scale.animate-in {
    opacity: 1;
    transform: scale(1);
  }

  /* Slide from left */
  .scroll-reveal-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: 
      opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
  }
  
  .scroll-reveal-left.animate-in {
    opacity: 1;
    transform: translateX(0);
  }

  /* Slide from right */
  .scroll-reveal-right {
    opacity: 0;
    transform: translateX(60px);
    transition: 
      opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
  }
  
  .scroll-reveal-right.animate-in {
    opacity: 1;
    transform: translateX(0);
  }

  /* Image zoom on hover - smooth */
  .image-zoom {
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }
  
  .image-zoom:hover {
    transform: scale(1.05);
  }

  /* Card lift on hover - smooth */
  .card-lift {
    transition: 
      transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      box-shadow 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, box-shadow;
  }
  
  .card-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12);
  }

  /* Button hover effects */
  .btn-smooth {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, box-shadow;
  }
  
  .btn-smooth:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.4);
  }

  /* Link underline animation */
  .link-underline {
    position: relative;
  }
  
  .link-underline::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .link-underline:hover::after {
    width: 100%;
  }

  /* Stagger children animation */
  .stagger-children > * {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .stagger-children.animate-in > *:nth-child(1) { transition-delay: 0ms; }
  .stagger-children.animate-in > *:nth-child(2) { transition-delay: 100ms; }
  .stagger-children.animate-in > *:nth-child(3) { transition-delay: 200ms; }
  .stagger-children.animate-in > *:nth-child(4) { transition-delay: 300ms; }
  .stagger-children.animate-in > *:nth-child(5) { transition-delay: 400ms; }
  .stagger-children.animate-in > *:nth-child(6) { transition-delay: 500ms; }
  .stagger-children.animate-in > *:nth-child(7) { transition-delay: 600ms; }
  .stagger-children.animate-in > *:nth-child(8) { transition-delay: 700ms; }
  
  .stagger-children.animate-in > * {
    opacity: 1;
    transform: translateY(0);
    transition: 
      opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Parallax-like slow reveal */
  .parallax-reveal {
    opacity: 0;
    transform: translateY(80px);
    transition: 
      opacity 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
  }
  
  .parallax-reveal.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hero entrance animation */
  @keyframes heroFadeUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-animate {
    animation: heroFadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .hero-animate-delay-1 {
    animation: heroFadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
    opacity: 0;
  }

  .hero-animate-delay-2 {
    animation: heroFadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
    opacity: 0;
  }

  .hero-animate-delay-3 {
    animation: heroFadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
    opacity: 0;
  }

  .hero-animate-delay-4 {
    animation: heroFadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
    opacity: 0;
  }

  /* Smooth accordion animation */
  [data-state="open"] .accordion-content {
    animation: accordionOpen 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @keyframes accordionOpen {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Number counter animation */
  @keyframes countUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .count-animate {
    animation: countUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .scroll-reveal,
    .scroll-reveal-fade,
    .scroll-reveal-scale,
    .scroll-reveal-left,
    .scroll-reveal-right,
    .parallax-reveal,
    .stagger-children > * {
      opacity: 1;
      transform: none;
      transition: none;
      animation: none;
    }
    
    .image-zoom,
    .card-lift,
    .btn-smooth {
      transition: none;
    }
    
    .image-zoom:hover,
    .card-lift:hover,
    .btn-smooth:hover {
      transform: none;
    }
    
    .hero-animate,
    .hero-animate-delay-1,
    .hero-animate-delay-2,
    .hero-animate-delay-3,
    .hero-animate-delay-4 {
      animation: none;
      opacity: 1;
    }
  }
`;

// Initialize smooth scroll animations
export const initSmoothAnimations = () => {
  if (typeof window === 'undefined') return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show all elements immediately for users who prefer reduced motion
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-fade, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right, .parallax-reveal, .stagger-children').forEach(el => {
      el.classList.add('animate-in');
    });
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = parseInt(element.getAttribute('data-delay') || '0');
          
          setTimeout(() => {
            element.classList.add('animate-in');
          }, delay);
          
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    }
  );

  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-fade, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right, .parallax-reveal, .stagger-children'
  );
  
  revealElements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
};
