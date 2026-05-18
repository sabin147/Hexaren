'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { translations } from '@/lib/translations';
import { 
  Building2, 
  Home, 
  Sparkles, 
  Check, 
  Star, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Calendar,
  Shield,
  Leaf,
  Clock,
  Globe,
  Users,
  Target,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '+4522560070';

export default function HomePage() {
  const [lang, setLang] = useState('en');
  const [sqm, setSqm] = useState(50);
  const [addons, setAddons] = useState({
    window: false,
    oven: false,
    balcony: false,
    carpet: false
  });
  const [weekend, setWeekend] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang];

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pricing calculation
  const BASE_PRICE = 500;
  const PRICE_PER_SQM = 25;
  const ADDON_PRICES = { window: 200, oven: 150, balcony: 100, carpet: 250 };

  const calculatePrice = () => {
    let price = BASE_PRICE + (sqm * PRICE_PER_SQM);
    Object.keys(addons).forEach(key => {
      if (addons[key]) price += ADDON_PRICES[key];
    });
    if (weekend) price *= 1.2;
    return Math.round(price);
  };

  // Global Intersection Observer for smooth scroll animations
  useEffect(() => {
    const revealSelector = '.scroll-reveal';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.querySelectorAll(revealSelector).forEach(el => {
        el.classList.add('animate-in');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const delay = parseInt(element.getAttribute('data-delay') || '0');
            
            requestAnimationFrame(() => {
              setTimeout(() => {
                element.classList.add('animate-in');
              }, delay);
            });
            
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const revealElements = document.querySelectorAll(revealSelector);
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 'office',
      slug: 'office-cleaning',
      icon: Building2,
      category: lang === 'en' ? 'B2B facility' : 'B2B facilitet',
      ...t.services.office,
      image: 'https://images.pexels.com/photos/10567271/pexels-photo-10567271.jpeg'
    },
    {
      id: 'apartment',
      slug: 'apartment-cleaning',
      icon: Sparkles,
      category: lang === 'en' ? 'Residential' : 'Bolig',
      ...t.services.apartment,
      image: 'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg'
    },
    {
      id: 'airbnb',
      slug: 'airbnb-turnover',
      icon: Home,
      category: lang === 'en' ? 'Hospitality' : 'Hospitality',
      ...t.services.airbnb,
      image: 'https://images.pexels.com/photos/6197116/pexels-photo-6197116.jpeg'
    },
    {
      id: 'piccoline',
      slug: 'piccoline-office-support',
      icon: Star,
      category: lang === 'en' ? 'Workplace support' : 'Arbejdsplads support',
      ...t.services.piccoline,
      image: 'https://images.pexels.com/photos/7876725/pexels-photo-7876725.jpeg'
    },
    {
      id: 'staircase',
      slug: 'staircase-cleaning',
      icon: LayoutGrid,
      category: lang === 'en' ? 'Common areas' : 'Fællesarealer',
      ...t.services.staircase,
      image: 'https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg'
    },
    {
      id: 'moveout',
      slug: 'move-out-cleaning',
      icon: Sparkles,
      category: lang === 'en' ? 'Moving' : 'Flytning',
      ...t.services.moveout,
      image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg'
    },
    {
      id: 'temporary',
      slug: 'temporary-staff',
      icon: Users,
      category: lang === 'en' ? 'Temporary team' : 'Midlertidigt team',
      title: lang === 'en' ? 'Temporary Cleaning Staff' : 'Midlertidig Rengøringspersonale',
      description: lang === 'en' ? 'Professional temporary cleaning workers to support your business during busy periods, staff shortages, or special events.' : 'Professionelle midlertidige rengøringsarbejdere til at støtte din virksomhed i travle perioder, personalemangel eller særlige begivenheder.',
      features: [
        lang === 'en' ? 'Vetted professionals' : 'Godkendte fagfolk',
        lang === 'en' ? 'Fast placement' : 'Hurtig placering',
        lang === 'en' ? 'Flexible duration' : 'Fleksibel varighed'
      ],
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Animation Styles */}
      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .image-zoom {
          transition: transform 0.7s ease-out;
        }
        .image-zoom:hover {
          transform: scale(1.04);
        }
        .card-lift {
          transition: transform 0.7s ease-out, box-shadow 0.7s ease-out;
        }
        .card-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal, .image-zoom, .card-lift {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* Navigation - Fully Responsive with Mobile Menu */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-b from-black/30 to-transparent'
      }`}>
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="relative z-50 -my-2 flex items-center transition-transform duration-300 hover:scale-105 md:-my-3 lg:-my-4"
          >
            <img 
              src="/hexaren-logo-header.png" 
              alt="Hexaren" 
              className="h-16 w-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:h-[72px] md:h-20 lg:h-24"
            />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="/" className={`transition-all duration-300 font-medium ${
              scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
            }`}>Home</a>
            <a href="#services" className={`transition-all duration-300 font-medium ${
              scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
            }`}>{t.nav.services}</a>
            <a href="#pricing" className={`transition-all duration-300 font-medium ${
              scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
            }`}>{t.nav.pricing}</a>
            <a href="/about" className={`transition-all duration-300 font-medium ${
              scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
            }`}>{t.nav.about}</a>
            <a href="/contact" className={`transition-all duration-300 font-medium ${
              scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
            }`}>{t.nav.contact}</a>
          </div>

          {/* Right Side - Language + CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'da' : 'en')}
              className={`hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all duration-300 text-sm font-semibold ${
                scrolled 
                  ? 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200' 
                  : 'bg-white/90 hover:bg-white text-gray-700 border border-white shadow-lg'
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'DA' : 'EN'}
            </button>
            
            {/* CTA Button */}
            <Link href="/contact" className="hidden sm:block">
              <Button className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-4 md:px-6 py-2 md:py-3 text-sm rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                {lang === 'en' ? 'Get a Quote' : 'Få et Tilbud'}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-all duration-300 ${
                scrolled ? 'bg-gray-100' : 'bg-white/90 shadow-lg'
              }`}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } ${scrolled ? 'bg-white' : 'bg-gray-900/95 backdrop-blur-lg'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981]'}`}
            >
              Home
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981]'}`}
            >
              {t.nav.services}
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981]'}`}
            >
              {t.nav.pricing}
            </a>
            <a 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981]'}`}
            >
              {t.nav.about}
            </a>
            <a 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-[#10B981]' : 'text-white hover:text-[#10B981]'}`}
            >
              {t.nav.contact}
            </a>
            
            {/* Service Pages in Mobile Menu */}
            <div className={`mt-4 pt-4 border-t ${scrolled ? 'border-gray-200' : 'border-white/20'}`}>
              <p className={`text-sm font-semibold mb-3 ${scrolled ? 'text-gray-500' : 'text-white/60'}`}>
                Our Services
              </p>
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 py-2.5 transition-colors ${
                    scrolled ? 'text-gray-600 hover:text-[#10B981]' : 'text-white/90 hover:text-[#10B981]'
                  }`}
                >
                  <service.icon className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span className="text-base">{service.title}</span>
                </a>
              ))}
            </div>
            
            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'da' : 'en')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold mt-2 ${
                scrolled ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'Switch to Danish' : 'Switch to English'}
            </button>

            {/* Mobile CTA */}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white py-4 text-base rounded-full font-semibold shadow-lg">
                {lang === 'en' ? 'Get a Quote' : 'Få et Tilbud'}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Fullscreen Video with Navbar Overlay */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <img 
            src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg" 
            alt="Professional cleaning service"
            className="w-full h-full object-cover"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/58 to-black/66" />
        
        {/* Vertical Service Navigation - Only visible on hero landing screen */}
        <div className={`hidden lg:block fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
          scrolled ? 'opacity-0 pointer-events-none translate-x-8' : 'opacity-100'
        }`}>
          <div className="flex w-[330px] flex-col gap-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex items-center gap-5 rounded-lg bg-[#24262B]/78 px-6 py-4 shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-x-1 hover:bg-[#202226]/90"
                title={service.title}
              >
                <service.icon className="h-6 w-6 flex-shrink-0 text-[#65F0B1]" />
                <span className="text-base font-semibold text-white">{service.title}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in space-y-7 pt-16 text-left">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#65F0B1]/90">
              Hexaren Facility Services ApS
            </p>
            <h1 className="text-4xl font-semibold leading-[1.04] text-white md:text-5xl lg:text-6xl">
              <span className="block">{lang === 'en' ? 'Founder-Led Professional' : 'Stifterledet Professionel'} {t.hero.titleAccent}</span>
              <span className="block">
                {lang === 'en' ? (
                  <>Services in <span className="text-[#9FD47B]">Copenhagen</span></>
                ) : (
                  <>Service i <span className="text-[#9FD47B]">København</span></>
                )}
              </span>
            </h1>
            
            <p className="max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-lg border-0 bg-[#007A4D] px-10 py-7 text-lg font-semibold text-white transition-all duration-500 hover:scale-105 hover:bg-[#00633F]"
                onClick={() => window.location.href = '/contact'}
              >
                {t.hero.cta}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-lg border border-white/25 bg-white/14 px-10 py-7 text-lg font-semibold text-white transition-all duration-500 hover:scale-105 hover:bg-white hover:text-[#0F172A]"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.secondaryCta}
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-10 pt-8">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#10B981]" />
                <span className="text-base text-white">Insured</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-[#10B981]" />
                <span className="text-base text-white">Svanemærket</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#10B981]" />
                <span className="text-base text-white">Same-Day</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copenhagen Coverage */}
      <section className="bg-[#F4F1E8] px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-10 border-y border-[#0F3D2E]/15 py-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="scroll-reveal" data-delay="0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#0F3D2E]/60">Copenhagen coverage</p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#0B1F1A] md:text-5xl">
                Facility care for Copenhagen spaces that cannot afford to feel ordinary.
              </h2>
            </div>
            <div className="scroll-reveal" data-delay="80">
              <div className="mb-6 grid grid-cols-3 border border-[#0F3D2E]/15 bg-white/55">
                {[
                  ['6', 'owners'],
                  ['24h', 'reply aim'],
                  ['100%', 'insured']
                ].map(([value, label]) => (
                  <div key={label} className="border-r border-[#0F3D2E]/15 p-4 last:border-r-0">
                    <p className="text-2xl font-semibold text-[#004B93] md:text-3xl">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#0F3D2E]/55">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {t.trust.areas.map((area) => (
                  <span key={area} className="inline-flex items-center gap-2 border border-[#0F3D2E]/15 bg-white/65 px-4 py-2 text-sm font-medium text-[#0B1F1A]">
                    <MapPin className="h-3.5 w-3.5 text-[#65BC46]" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Standard */}
      <section className="bg-[#0B1F1A] px-4 py-24 text-white md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="scroll-reveal lg:sticky lg:top-28" data-delay="0">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#65BC46]">Hexaren Facility Services ApS</p>
              <h2 className="text-4xl font-semibold leading-[1.05] md:text-6xl">
                Where six promises meet one standard.
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
                We design every clean around one idea: quiet reliability. The kind clients notice because nothing feels missed, rushed, or improvised.
              </p>
              <img
                src="/hexaren-logo-header.png"
                alt="Hexaren"
                className="mt-12 h-44 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)] sm:h-56"
              />
            </div>

            <div className="border-y border-white/12">
              {[
                ['H', 'Honesty', 'Transparent communication, reliable agreements, and clear expectations from the first message.'],
                ['E', 'Efficiency', 'Structured teams, precise routines, and dependable results without unnecessary disruption.'],
                ['X', 'Xcellence', 'Professional detail standards that go beyond surface-level clean.'],
                ['A', 'Accountability', 'Ownership over every shift, every checklist, and every client experience.'],
                ['R', 'Respect', 'Care for workplaces, homes, people, materials, and shared environments.'],
                ['E', 'Eco-conscious', 'Responsible methods and supplies chosen with your space and the planet in mind.'],
                ['N', 'Nordic Standard', 'The standard that binds every Hexaren promise together.']
              ].map(([letter, title, description], index) => (
                <div
                  key={title}
                  className="scroll-reveal grid gap-5 border-t border-white/12 py-7 first:border-t-0 sm:grid-cols-[88px_1fr]"
                  data-delay={index * 60}
                >
                  <div className="text-5xl font-semibold text-white/20">{letter}</div>
                  <div className="grid gap-3 md:grid-cols-[0.45fr_1fr]">
                    <h3 className="text-2xl font-semibold text-white">{title}</h3>
                    <p className="leading-relaxed text-white/66">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#F7F8FA] px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-[0.95fr_0.75fr] lg:items-end">
            <div>
              <p className="scroll-reveal mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#007A4D]" data-delay="0">
                Our expertise
              </p>
              <h2 className="scroll-reveal max-w-3xl text-4xl font-semibold leading-[1.05] text-[#111418] md:text-6xl" data-delay="70">
                Curated Solutions for Discerning Clients.
              </h2>
            </div>
            <p className="scroll-reveal max-w-xl text-lg leading-relaxed text-[#111418]/68 lg:justify-self-end" data-delay="120">
              Whether it&apos;s a high-traffic office, a boutique rental, or a residential building, our teams are trained to deliver care that exceeds standard cleaning protocols.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="scroll-reveal group block overflow-hidden rounded-[6px] border border-[#111418]/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#007A4D]/28 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
                data-delay={index * 70}
              >
                <div className="relative aspect-[1.08] overflow-hidden bg-[#0B1114]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="image-zoom h-full w-full object-cover contrast-[1.03] saturate-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-transparent to-black/28" />
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-[4px] border border-white/10 bg-[#05080A] text-[#65F0B1] shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                    <service.icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="p-7 md:p-8">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111418]/55">
                    {service.category}
                  </p>
                  <h3 className="text-2xl font-medium leading-tight text-[#111418]">{service.title}</h3>
                  <p className="mt-5 min-h-[96px] text-base leading-relaxed text-[#111418]/68">
                    {service.description}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#111418] transition-colors group-hover:text-[#007A4D]">
                    Discover service
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Concierge */}
      <section id="pricing" className="bg-white px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="scroll-reveal" data-delay="0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#0F3D2E]/55">Service concierge</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#0B1F1A] md:text-6xl">{t.pricing.title}</h2>
            </div>
            <p className="scroll-reveal max-w-2xl text-lg leading-relaxed text-[#0B1F1A]/62" data-delay="80">
              {t.pricing.subtitle} Adjust the scope and see a clear estimate before you book.
            </p>
          </div>

          <div className="scroll-reveal grid overflow-hidden border border-[#0F3D2E]/12 bg-[#F4F1E8] lg:grid-cols-[1.05fr_0.95fr]" data-delay="120">
            <div className="space-y-8 p-6 md:p-10">
              <div>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <Label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1F1A]/55">{t.pricing.sqmLabel}</Label>
                  <span className="text-4xl font-semibold text-[#004B93]">{sqm} m²</span>
                </div>
                <Slider
                  value={[sqm]}
                  onValueChange={(value) => setSqm(value[0])}
                  min={20}
                  max={300}
                  step={5}
                  className="py-4"
                />
                <div className="flex justify-between text-xs uppercase tracking-[0.18em] text-[#0B1F1A]/45">
                  <span>20 m²</span>
                  <span>300 m²</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: 'window', label: t.pricing.windowCleaning, price: ADDON_PRICES.window },
                  { key: 'oven', label: t.pricing.ovenCleaning, price: ADDON_PRICES.oven },
                  { key: 'balcony', label: t.pricing.balcony, price: ADDON_PRICES.balcony },
                  { key: 'carpet', label: t.pricing.carpet, price: ADDON_PRICES.carpet }
                ].map((addon) => (
                  <label key={addon.key} className="flex items-center justify-between gap-4 border border-[#0F3D2E]/12 bg-white/70 p-4">
                    <span className="flex items-center gap-3">
                      <Switch
                        checked={addons[addon.key]}
                        onCheckedChange={(checked) => setAddons({...addons, [addon.key]: checked})}
                      />
                      <span className="text-sm font-medium text-[#0B1F1A]">{addon.label}</span>
                    </span>
                    <span className="text-sm font-semibold text-[#0F3D2E]">+{addon.price}</span>
                  </label>
                ))}
              </div>

              <label className="flex items-center justify-between gap-4 border border-[#0F3D2E]/12 bg-white/70 p-5">
                <span className="flex items-center gap-3">
                  <Switch checked={weekend} onCheckedChange={setWeekend} />
                  <span className="font-medium text-[#0B1F1A]">{t.pricing.weekend}</span>
                </span>
                <Calendar className="h-5 w-5 text-[#65BC46]" />
              </label>
            </div>

            <div className="bg-[#0B1F1A] p-6 text-white md:p-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#65BC46]">Service summary</p>
                  <div className="mt-8 space-y-4 border-y border-white/12 py-6">
                    <div className="flex justify-between gap-6 text-white/70">
                      <span>{t.pricing.basePrice}</span>
                      <span>{BASE_PRICE} DKK</span>
                    </div>
                    <div className="flex justify-between gap-6 text-white/70">
                      <span>{sqm} m² × {PRICE_PER_SQM} DKK {t.pricing.perSqm}</span>
                      <span>{sqm * PRICE_PER_SQM} DKK</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.22em] text-white/45">{t.pricing.total}</p>
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-semibold md:text-7xl">{calculatePrice()}</span>
                    <span className="pb-3 text-lg text-white/55">DKK</span>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white/55">{t.pricing.disclaimer}</p>
                  <Link href="/contact" className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-[#65BC46] px-6 py-4 font-semibold text-[#0B1F1A] transition-colors hover:bg-white">
                    {t.pricing.bookNow}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F4F1E8] px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div className="scroll-reveal" data-delay="0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#0F3D2E]/55">Process</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#0B1F1A] md:text-6xl">{t.howItWorks.title}</h2>
            </div>
            <p className="scroll-reveal max-w-2xl text-lg leading-relaxed text-[#0B1F1A]/62" data-delay="80">
              A calm, accountable workflow from first request to finished space.
            </p>
          </div>

          <div className="grid border-y border-[#0F3D2E]/15 md:grid-cols-3">
            {[
              { step: '01', ...t.howItWorks.step1, icon: Calendar },
              { step: '02', ...t.howItWorks.step2, icon: Sparkles },
              { step: '03', ...t.howItWorks.step3, icon: Check }
            ].map((item, index) => (
              <div key={item.step} className="scroll-reveal border-b border-[#0F3D2E]/15 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" data-delay={index * 100}>
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0F3D2E]/45">{item.step}</span>
                  <item.icon className="h-7 w-7 text-[#65BC46]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#0B1F1A]">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-[#0B1F1A]/62">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Beautiful */}
      <section className="relative py-32 md:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/6197116/pexels-photo-6197116.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 to-[#0F172A]/75" />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 scroll-reveal" data-delay="0">
            {lang === 'en' ? 'Ready to Experience Professional Cleaning?' : 'Klar til at Opleve Professionel Rengøring?'}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto scroll-reveal" data-delay="100">
            {lang === 'en' 
              ? 'Join businesses and homes across Copenhagen that trust Hexaren. Get your free quote today.' 
              : 'Slut dig til virksomheder og hjem i hele København der stoler på Hexaren. Få dit gratis tilbud i dag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal" data-delay="200">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-[#10B981] hover:bg-[#059669] text-white px-12 py-7 text-lg font-bold rounded-full transition-all duration-500 hover:scale-105"
              >
                {lang === 'en' ? 'Get Your Free Quote' : 'Få Dit Gratis Tilbud'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-12 py-7 text-lg font-bold rounded-full transition-all duration-500"
              >
                {lang === 'en' ? 'Contact Us' : 'Kontakt Os'}
                <Phone className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-4 bg-[#0F172A]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <a href="/" className="-my-3 mb-4 inline-flex items-center">
                <img 
                  src="/hexaren-logo-header.png" 
                  alt="Hexaren" 
                  className="h-20 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-24"
                />
              </a>
              <p className="text-gray-400">{t.footer.tagline}</p>
              <p className="text-gray-500 text-sm mt-2">{t.footer.cvr}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/office-cleaning" className="hover:text-[#10B981] transition">{t.services.office.title}</Link></li>
                <li><Link href="/services/apartment-cleaning" className="hover:text-[#10B981] transition">{t.services.apartment.title}</Link></li>
                <li><Link href="/services/airbnb-turnover" className="hover:text-[#10B981] transition">{t.services.airbnb.title}</Link></li>
                <li><Link href="/services/piccoline-office-support" className="hover:text-[#10B981] transition">{t.services.piccoline.title}</Link></li>
                <li><Link href="/services/staircase-cleaning" className="hover:text-[#10B981] transition">{t.services.staircase.title}</Link></li>
                <li><Link href="/services/move-out-cleaning" className="hover:text-[#10B981] transition">{t.services.moveout.title}</Link></li>
                <li><Link href="/services/temporary-staff" className="hover:text-[#10B981] transition">{lang === 'en' ? 'Temporary Cleaning Staff' : 'Midlertidig Rengøringspersonale'}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-[#10B981] transition">{t.footer.about}</a></li>
                <li><Link href="/contact" className="hover:text-[#10B981] transition">{t.footer.contact}</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-[#10B981] transition">{lang === 'en' ? 'Privacy Policy' : 'Privatlivspolitik'}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#10B981]" />
                  +45 22560070
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#10B981]" />
                  hello@hexaren.dk
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#10B981]" />
                  Copenhagen, Denmark
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Hexaren Facility Services ApS. {t.footer.rights}.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium hidden md:inline">{t.whatsapp}</span>
      </a>
    </div>
  );
}
