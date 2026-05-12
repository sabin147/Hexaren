'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceBySlug } from '@/lib/servicesData';
import { 
  Star, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Globe,
  Check,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Users,
  Leaf,
  Calendar,
  Award,
  FileCheck,
  Home,
  Building2,
  Droplets,
  Wind,
  Trash2,
  Brush,
  Package,
  Camera,
  BadgeCheck,
  KeyRound,
  CalendarSync,
  Bed,
  Bath,
  ChefHat,
  Layers,
  Columns,
  DoorOpen,
  Warehouse,
  AlertCircle,
  Flame,
  Grid3X3
} from 'lucide-react';

const WHATSAPP_NUMBER = '+4531862094';

// Icon mapping for features
const iconMap = {
  desk: Layers,
  floor: Grid3X3,
  kitchen: ChefHat,
  bathroom: Bath,
  glass: Droplets,
  window: Droplets,
  trash: Trash2,
  dust: Wind,
  supplies: Package,
  bedroom: Bed,
  deep: Sparkles,
  linen: Bed,
  check: BadgeCheck,
  photo: Camera,
  stair: Columns,
  hallway: DoorOpen,
  entrance: DoorOpen,
  basement: Warehouse,
  oven: Flame,
  limescale: Droplets,
  cabinet: Layers
};

export default function ServiceDetailPage() {
  const params = useParams();
  const [lang, setLang] = useState('en');
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params?.slug;
    if (slug) {
      const serviceData = getServiceBySlug(slug);
      setService(serviceData);
    }
    setLoading(false);
  }, [params?.slug]);

  // Scroll animation observer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('animate-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const delay = parseInt(element.getAttribute('data-delay') || '0');
            setTimeout(() => element.classList.add('animate-in'), delay);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [service]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin w-8 h-8 border-4 border-[#10B981] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Service not found</h1>
        <Link href="/">
          <Button className="bg-[#10B981] hover:bg-[#059669]">Back to Home</Button>
        </Link>
      </div>
    );
  }

  // Helper function for translations
  const t = (en, da) => lang === 'da' && da ? da : en;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Animation styles */}
      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .image-zoom {
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .image-zoom:hover {
          transform: scale(1.03);
        }
        .card-lift {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12);
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal, .image-zoom, .card-lift {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/hexaren-logo.png" 
              alt="Hexaren" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-gray-600 hover:text-[#0F172A] transition">{lang === 'da' ? 'Ydelser' : 'Services'}</Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-[#0F172A] transition">{lang === 'da' ? 'Priser' : 'Pricing'}</Link>
            <Link href="/about" className="text-gray-600 hover:text-[#0F172A] transition">{lang === 'da' ? 'Om os' : 'About'}</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#0F172A] transition">{lang === 'da' ? 'Kontakt' : 'Contact'}</Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'da' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'DA' : 'EN'}
            </button>
            
            <Link href="/contact">
              <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
                {lang === 'da' ? 'Få et Tilbud' : 'Get a Quote'}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src={service.heroImage}
            alt={t(service.title, service.titleDa)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/70 to-[#0F172A]/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              {service.category}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {t(service.title, service.titleDa)}
            </h1>
            
            <p className="text-xl md:text-2xl text-[#10B981] font-medium mb-4">
              {t(service.tagline, service.taglineDa)}
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
              {t(service.description, service.descriptionDa)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105"
                >
                  {lang === 'da' ? 'Få Gratis Tilbud' : 'Get Free Quote'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-8 py-6 text-lg rounded-full transition-all duration-500"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {lang === 'da' ? 'Se Detaljer' : 'View Details'}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. INTRO / SERVICE OVERVIEW SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal" data-delay="0">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={service.overview.image}
                  alt={t(service.overview.title, service.overview.titleDa)}
                  className="w-full h-[450px] object-cover image-zoom"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] scroll-reveal" data-delay="100">
                {t(service.overview.title, service.overview.titleDa)}
              </h2>
              
              <div className="space-y-4">
                {(lang === 'da' ? service.overview.paragraphsDa : service.overview.paragraphs).map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed scroll-reveal" data-delay={150 + i * 50}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="py-24 px-4 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] scroll-reveal" data-delay="0">
                {t(service.benefits.title, service.benefits.titleDa)}
              </h2>
              
              <p className="text-lg text-[#10B981] font-medium scroll-reveal" data-delay="50">
                {t(service.benefits.subtitle, service.benefits.subtitleDa)}
              </p>
              
              <div className="space-y-4">
                {(lang === 'da' ? service.benefits.paragraphsDa : service.benefits.paragraphs).map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed scroll-reveal" data-delay={100 + i * 50}>
                    {para}
                  </p>
                ))}
              </div>
              
              <div className="pt-4 scroll-reveal" data-delay="200">
                <Link href="/contact">
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-6 rounded-full">
                    {lang === 'da' ? 'Kontakt Os' : 'Contact Us'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 scroll-reveal" data-delay="100">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={service.benefits.image}
                  alt={t(service.benefits.title, service.benefits.titleDa)}
                  className="w-full h-[450px] object-cover image-zoom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE FEATURES GRID */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
              {lang === 'da' ? 'Hvad Er Inkluderet' : 'What\'s Included'}
            </h2>
            <p className="text-lg text-gray-600 scroll-reveal" data-delay="50">
              {lang === 'da' ? 'Omfattende service tilpasset dine behov' : 'Comprehensive service tailored to your needs'}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Sparkles;
              return (
                <div 
                  key={index}
                  className="scroll-reveal card-lift"
                  data-delay={100 + index * 50}
                >
                  <div className="bg-[#FAFBFC] rounded-2xl p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                      {t(feature.title, feature.titleDa)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(feature.description, feature.descriptionDa)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-24 px-4 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
              {lang === 'da' ? 'Hvorfor Vælge Hexaren' : 'Why Choose Hexaren'}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.whyUs.map((item, index) => (
              <div 
                key={index}
                className="scroll-reveal"
                data-delay={100 + index * 75}
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    {t(item.title, item.titleDa)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(item.description, item.descriptionDa)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. QUALITY / STANDARDS SECTION */}
      <section className="py-24 px-4 bg-[#0F172A]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal" data-delay="0">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={service.quality.image}
                  alt={t(service.quality.title, service.quality.titleDa)}
                  className="w-full h-[400px] object-cover image-zoom"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white scroll-reveal" data-delay="50">
                {t(service.quality.title, service.quality.titleDa)}
              </h2>
              
              <p className="text-white/80 leading-relaxed scroll-reveal" data-delay="100">
                {t(service.quality.description, service.quality.descriptionDa)}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {service.quality.stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 scroll-reveal"
                    data-delay={150 + index * 50}
                  >
                    <div className="text-2xl font-bold text-[#10B981]">{stat.value}</div>
                    <div className="text-white/60 text-sm">{t(stat.label, stat.labelDa)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
            {t(service.pricing.title, service.pricing.titleDa)}
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 scroll-reveal" data-delay="50">
            {t(service.pricing.description, service.pricing.descriptionDa)}
          </p>
          
          <div className="inline-block bg-[#10B981]/10 rounded-full px-6 py-3 mb-8 scroll-reveal" data-delay="100">
            <span className="text-2xl font-bold text-[#10B981]">
              {t(service.pricing.startingFrom, service.pricing.startingFromDa)}
            </span>
          </div>
          
          <div className="scroll-reveal" data-delay="150">
            <Link href="/#pricing">
              <Button 
                size="lg"
                className="bg-[#10B981] hover:bg-[#059669] text-white px-10 py-6 text-lg rounded-full"
              >
                {t(service.pricing.ctaText, service.pricing.ctaTextDa)}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. COVERAGE / SERVICE AREA SECTION */}
      <section className="py-24 px-4 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
              {t(service.coverage.title, service.coverage.titleDa)}
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto scroll-reveal" data-delay="50">
              {t(service.coverage.description, service.coverage.descriptionDa)}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 scroll-reveal" data-delay="100">
            {service.coverage.areas.map((area, index) => (
              <div 
                key={index}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-sm text-[#0F172A] font-medium"
              >
                <MapPin className="w-4 h-4 text-[#10B981]" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
              {lang === 'da' ? 'Ofte Stillede Spørgsmål' : 'Frequently Asked Questions'}
            </h2>
          </div>
          
          <div className="scroll-reveal" data-delay="100">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faq.map((item, index) => (
                <AccordionItem 
                  key={index}
                  value={`faq-${index}`}
                  className="bg-[#FAFBFC] rounded-2xl border-0 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left py-5 text-[#0F172A] font-semibold hover:no-underline hover:text-[#10B981] transition-colors [&[data-state=open]]:text-[#10B981]">
                    {t(item.question, item.questionDa)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-gray-600 leading-relaxed">
                    {t(item.answer, item.answerDa)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={service.heroImage}
            alt="CTA background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 scroll-reveal" data-delay="0">
            {t(service.cta.title, service.cta.titleDa)}
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto scroll-reveal" data-delay="50">
            {t(service.cta.subtitle, service.cta.subtitleDa)}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal" data-delay="100">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#10B981] hover:bg-[#059669] text-white px-10 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105"
              >
                {lang === 'da' ? 'Kontakt Os' : 'Contact Us'}
                <Mail className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <a href={`tel:${WHATSAPP_NUMBER.replace(/[^0-9+]/g, '')}`}>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-10 py-6 text-lg rounded-full transition-all duration-500"
              >
                {lang === 'da' ? 'Ring Til Os' : 'Call Us'}
                <Phone className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-[#0F172A]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img 
                  src="/hexaren-logo.png" 
                  alt="Hexaren" 
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-gray-400">
                {lang === 'da' ? 'Premium rengøring i København' : 'Premium cleaning in Copenhagen'}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{lang === 'da' ? 'Ydelser' : 'Services'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/office-cleaning" className="hover:text-[#10B981] transition">Office Cleaning</Link></li>
                <li><Link href="/services/apartment-cleaning" className="hover:text-[#10B981] transition">Apartment Cleaning</Link></li>
                <li><Link href="/services/airbnb-turnover" className="hover:text-[#10B981] transition">Airbnb & Turnover</Link></li>
                <li><Link href="/services/staircase-cleaning" className="hover:text-[#10B981] transition">Staircase Cleaning</Link></li>
                <li><Link href="/services/move-out-cleaning" className="hover:text-[#10B981] transition">Move-out Cleaning</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{lang === 'da' ? 'Firma' : 'Company'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-[#10B981] transition">{lang === 'da' ? 'Om Os' : 'About Us'}</Link></li>
                <li><Link href="/contact" className="hover:text-[#10B981] transition">{lang === 'da' ? 'Kontakt' : 'Contact'}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{lang === 'da' ? 'Kontakt' : 'Contact'}</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#10B981]" />
                  +45 31 86 20 94
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
            <p>© {new Date().getFullYear()} Hexaren ApS. {lang === 'da' ? 'Alle rettigheder forbeholdes' : 'All rights reserved'}.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium hidden md:inline">{lang === 'da' ? 'Chat med os' : 'Chat with us'}</span>
      </a>
    </div>
  );
}
