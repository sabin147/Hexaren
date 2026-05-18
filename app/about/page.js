'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Globe,
  Users,
  Target,
  Heart,
  Award,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Quote,
  Linkedin,
  Twitter
} from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '+4522560070';

// Translations for About page
const aboutTranslations = {
  en: {
    nav: {
      services: 'Services',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      bookOnline: 'Book Online'
    },
    hero: {
      badge: 'Our Story',
      title: 'Building Trust,',
      titleAccent: 'One Clean at a Time',
      description: 'We started Hexaren with a simple belief: every space deserves premium care, and every client deserves complete reliability. Meet the team making it happen.',
      cta: 'Work With Us',
      secondaryCta: 'Meet the Team'
    },
    intro: {
      label: 'Who We Are',
      title: 'A Small Team with Big Standards',
      paragraph1: 'Founded in Copenhagen, Hexaren Facility Services ApS was born from a shared frustration with unreliable cleaning services. We knew there had to be a better way—one built on accountability, transparency, and genuine care for the spaces we maintain.',
      paragraph2: 'Today, Hexaren is led by three founders who work directly in the business and stay close to every client relationship. No middlemen, no excuses. Just professional cleaning delivered with the attention it deserves.',
      paragraph3: 'We serve offices, apartments, Airbnb properties, and residential buildings across Copenhagen. Our approach is simple: show up, deliver excellence, and build lasting relationships with clients who value quality over shortcuts.',
      experience: 'Our founders each bring 5+ years of hands-on cleaning experience, shaping Hexaren from real work in the field.'
    },
    mission: {
      title: 'What Drives Us',
      subtitle: 'Our commitment goes beyond cleaning',
      cards: [
        {
          title: 'Our Mission',
          description: 'To redefine what reliable cleaning looks like in Copenhagen. We believe every client deserves a service they can count on—every single time.',
          image: 'https://images.pexels.com/photos/8353783/pexels-photo-8353783.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'Our Vision',
          description: 'To become Copenhagen\'s most trusted cleaning partner for businesses and homes alike, known for our unwavering standards and personal accountability.',
          image: 'https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'Our Values',
          description: 'Reliability, transparency, and care are not just words to us—they\'re promises. We use eco-certified products because we care about your space and our planet.',
          image: 'https://images.pexels.com/photos/6197116/pexels-photo-6197116.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    team: {
      label: 'The People Behind Hexaren',
      title: 'Meet Our Founders',
      subtitle: 'Three founders working hands-on and leading the team themselves',
      experience: 'Each founder brings 5+ years of hands-on cleaning experience.',
      members: [
        { name: 'Sumi Basnet', role: 'Co-Founder' },
        { name: 'Ravi Paudel', role: 'Co-Founder' },
        { name: 'Ruska Shrestha', role: 'Co-Founder' }
      ]
    },
    stats: {
      title: 'Built for Long-Term Trust',
      items: [
        { number: '01', label: 'Owner-Led Service', sublabel: 'founders stay close to the work' },
        { number: '02', label: 'Clear Communication', sublabel: 'simple updates and direct contact' },
        { number: '03', label: 'Consistent Standards', sublabel: 'checklists shaped around each space' },
        { number: '04', label: 'Careful Growth', sublabel: 'quality first as the company grows' }
      ]
    },
    founder: {
      quote: '"We are building Hexaren from the ground up with one clear promise: reliable cleaning, honest communication, and founders who take responsibility for the details."',
      name: 'Sumi Basnet, Ravi Paudel & Ruska Shrestha',
      title: 'Founders, Hexaren Rengøring',
      story: 'As a new company, we are focused on doing the fundamentals exceptionally well: arriving prepared, listening carefully, cleaning with consistency, and building trust one client at a time.'
    },
    cta: {
      title: 'Ready to Experience the Difference?',
      subtitle: 'Join the businesses and homes across Copenhagen that trust Hexaren for their cleaning needs.',
      button: 'Get Your Free Quote',
      secondaryButton: 'Contact Us'
    },
    footer: {
      tagline: 'Hexaren Facility Services ApS - Premium cleaning in Copenhagen',
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
      about: 'About Us',
      careers: 'Careers',
      blog: 'Blog',
      rights: 'All rights reserved',
      cvr: 'CVR: Registration ready in about one week'
    },
    whatsapp: 'Chat with us'
  },
  da: {
    nav: {
      services: 'Ydelser',
      pricing: 'Priser',
      about: 'Om os',
      contact: 'Kontakt',
      bookOnline: 'Book Online'
    },
    hero: {
      badge: 'Vores Historie',
      title: 'Opbygger Tillid,',
      titleAccent: 'Én Rengøring ad Gangen',
      description: 'Vi startede Hexaren med en simpel overbevisning: hvert rum fortjener premium pleje, og hver kunde fortjener komplet pålidelighed. Mød teamet der gør det muligt.',
      cta: 'Arbejd Med Os',
      secondaryCta: 'Mød Teamet'
    },
    intro: {
      label: 'Hvem Vi Er',
      title: 'Et Lille Team med Store Standarder',
      paragraph1: 'Grundlagt i København, Hexaren Facility Services ApS blev født fra en fælles frustration over upålidelige rengøringsservices. Vi vidste, at der måtte være en bedre måde—en bygget på ansvarlighed, gennemsigtighed og ægte omsorg for de rum vi vedligeholder.',
      paragraph2: 'I dag ledes Hexaren af tre stiftere, der arbejder direkte i virksomheden og holder sig tæt på hver kunderelation. Ingen mellemled, ingen undskyldninger. Bare professionel rengøring leveret med den opmærksomhed den fortjener.',
      paragraph3: 'Vi servicerer kontorer, lejligheder, Airbnb-ejendomme og boligejendomme i hele København. Vores tilgang er simpel: mød op, lever excellence, og byg varige relationer med kunder der værdsætter kvalitet over genveje.',
      experience: 'Vores stiftere har hver 5+ års praktisk rengøringserfaring, som former Hexaren fra arbejdet i felten.'
    },
    mission: {
      title: 'Hvad Der Driver Os',
      subtitle: 'Vores engagement går ud over rengøring',
      cards: [
        {
          title: 'Vores Mission',
          description: 'At omdefinere hvad pålidelig rengøring betyder i København. Vi mener hver kunde fortjener en service de kan stole på—hver eneste gang.',
          image: 'https://images.pexels.com/photos/8353783/pexels-photo-8353783.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'Vores Vision',
          description: 'At blive Københavns mest betroede rengøringspartner for virksomheder og hjem, kendt for vores urokkellige standarder og personlige ansvarlighed.',
          image: 'https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'Vores Værdier',
          description: 'Pålidelighed, gennemsigtighed og omsorg er ikke bare ord for os—de er løfter. Vi bruger miljøcertificerede produkter fordi vi bekymrer os om dit rum og vores planet.',
          image: 'https://images.pexels.com/photos/6197116/pexels-photo-6197116.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    team: {
      label: 'Folkene Bag Hexaren',
      title: 'Mød Vores Stiftere',
      subtitle: 'Tre stiftere, der arbejder hands-on og selv leder teamet',
      experience: 'Hver stifter har 5+ års praktisk rengøringserfaring.',
      members: [
        { name: 'Sumi Basnet', role: 'Medstifter' },
        { name: 'Ravi Paudel', role: 'Medstifter' },
        { name: 'Ruska Shrestha', role: 'Medstifter' }
      ]
    },
    stats: {
      title: 'Bygget til Langvarig Tillid',
      items: [
        { number: '01', label: 'Ejerledet Service', sublabel: 'stifterne er tæt på arbejdet' },
        { number: '02', label: 'Klar Kommunikation', sublabel: 'enkle opdateringer og direkte kontakt' },
        { number: '03', label: 'Faste Standarder', sublabel: 'tjeklister tilpasset hvert rum' },
        { number: '04', label: 'Ansvarlig Vækst', sublabel: 'kvalitet først mens virksomheden vokser' }
      ]
    },
    founder: {
      quote: '"Vi bygger Hexaren fra bunden med ét klart løfte: pålidelig rengøring, ærlig kommunikation og stiftere, der tager ansvar for detaljerne."',
      name: 'Sumi Basnet, Ravi Paudel & Ruska Shrestha',
      title: 'Stiftere, Hexaren Rengøring',
      story: 'Som ny virksomhed fokuserer vi på at gøre det grundlæggende ekstra godt: møde forberedt op, lytte grundigt, gøre rent med faste standarder og opbygge tillid én kunde ad gangen.'
    },
    cta: {
      title: 'Klar til at Opleve Forskellen?',
      subtitle: 'Slut dig til virksomhederne og hjemmene i hele København, der stoler på Hexaren til deres rengøringsbehov.',
      button: 'Få Dit Gratis Tilbud',
      secondaryButton: 'Kontakt Os'
    },
    footer: {
      tagline: 'Hexaren Facility Services ApS - Premium rengøring i København',
      services: 'Ydelser',
      company: 'Firma',
      contact: 'Kontakt',
      about: 'Om Os',
      careers: 'Karriere',
      blog: 'Blog',
      rights: 'Alle rettigheder forbeholdes',
      cvr: 'CVR: Registrering klar om cirka en uge'
    },
    whatsapp: 'Chat med os'
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState('en');
  const t = aboutTranslations[lang];

  // Scroll animation observer - smooth animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-fade, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right, .parallax-reveal, .stagger-children').forEach(el => {
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

    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-fade, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right, .parallax-reveal, .stagger-children');
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Navigation - Enhanced */}
      <nav className="fixed top-0 w-full bg-gradient-to-b from-white via-white/98 to-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="relative z-50 -my-2 flex items-center transition-transform duration-300 hover:scale-105 md:-my-3 lg:-my-4">
            <img 
              src="/hexaren-logo-header.png" 
              alt="Hexaren" 
              className="h-16 w-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:h-[72px] md:h-20 lg:h-24"
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-gray-700 hover:text-[#10B981] transition-colors duration-200 font-medium">Home</Link>
            <Link href="/#services" className="text-gray-700 hover:text-[#10B981] transition-colors duration-200 font-medium">{t.nav.services}</Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-[#10B981] transition-colors duration-200 font-medium">{t.nav.pricing}</Link>
            <Link href="/about" className="text-[#10B981] font-semibold">{t.nav.about}</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#10B981] transition-colors duration-200 font-medium">{t.nav.contact}</Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'da' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-sm font-semibold text-gray-700 border border-gray-200"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'DA' : 'EN'}
            </button>
            
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                {lang === 'en' ? 'Get a Quote' : 'Få et Tilbud'}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/8117466/pexels-photo-8117466.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/50 to-[#0F172A]/80" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              {t.hero.badge}
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              {t.hero.title}
              <br />
              <span className="text-[#10B981]">{t.hero.titleAccent}</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-white text-[#0F172A] hover:bg-white/90 px-8 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {t.hero.cta}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-8 py-6 text-lg rounded-full transition-all duration-500"
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* COMPANY INTRO SECTION */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="scroll-reveal" data-delay="0">
            <span className="inline-block text-[#10B981] font-semibold text-sm uppercase tracking-wider mb-4">
              {t.intro.label}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-8 leading-tight scroll-reveal" data-delay="100">
            {t.intro.title}
          </h2>
          
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p className="scroll-reveal" data-delay="200">{t.intro.paragraph1}</p>
            <p className="scroll-reveal" data-delay="300">{t.intro.paragraph2}</p>
            <p className="scroll-reveal" data-delay="400">{t.intro.paragraph3}</p>
          </div>

          <div className="mt-10 scroll-reveal" data-delay="500">
            <div className="border-l-4 border-[#10B981] bg-[#10B981]/8 px-6 py-5">
              <p className="text-lg font-semibold leading-relaxed text-[#047857]">
                {t.intro.experience}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES SECTION */}
      <section className="py-24 px-4 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
              {t.mission.title}
            </h2>
            <p className="text-lg text-gray-600 scroll-reveal" data-delay="100">
              {t.mission.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.mission.cards.map((card, index) => (
              <div 
                key={index}
                className="scroll-reveal card-lift"
                data-delay={150 + index * 100}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover image-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 to-transparent" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-24 md:py-32 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block text-[#10B981] font-semibold text-sm uppercase tracking-wider mb-4 scroll-reveal" data-delay="0">
              {t.team.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="100">
              {t.team.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto scroll-reveal" data-delay="200">
              {t.team.subtitle}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.team.members.map((member, index) => (
              <div 
                key={index}
                className="scroll-reveal card-lift"
                data-delay={250 + index * 80}
              >
                <div className="bg-[#FAFBFC] rounded-2xl p-6 text-center group">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-white to-emerald-50 flex items-center justify-center">
                      <Users className="w-12 h-12 text-[#10B981]/45" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-1">{member.name}</h3>
                  <p className="text-[#10B981] font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center scroll-reveal" data-delay="520">
            <p className="inline-flex items-center justify-center rounded-full border border-[#10B981]/20 bg-[#10B981]/8 px-5 py-3 text-sm font-semibold text-[#047857]">
              <CheckCircle className="mr-2 h-4 w-4" />
              {t.team.experience}
            </p>
          </div>
        </div>
      </section>

      {/* STATS / HIGHLIGHTS SECTION */}
      <section className="py-24 px-4 bg-[#0F172A]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 scroll-reveal" data-delay="0">
            {t.stats.title}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.items.map((stat, index) => (
              <div 
                key={index}
                className="scroll-reveal"
                data-delay={100 + index * 100}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-500">
                  <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-white/50 text-sm">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER / STORY SECTION */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="scroll-reveal" data-delay="0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#F8FAFC] via-white to-emerald-50 border border-gray-100">
                <div className="w-full h-[500px] flex flex-col items-center justify-center px-8 text-center">
                  <div className="w-32 h-32 rounded-full bg-white shadow-lg ring-4 ring-emerald-50 flex items-center justify-center mb-6">
                    <Users className="w-14 h-14 text-[#10B981]/50" />
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#10B981] mb-2">
                    {lang === 'en' ? 'Founder photo space' : 'Plads til stifterfoto'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quote & Story */}
            <div className="space-y-8">
              <div className="scroll-reveal" data-delay="100">
                <Quote className="w-12 h-12 text-[#10B981]/30 mb-4" />
                <blockquote className="text-xl md:text-2xl text-[#0F172A] leading-relaxed font-medium italic">
                  {t.founder.quote}
                </blockquote>
              </div>
              
              <div className="scroll-reveal" data-delay="200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A] text-lg">{t.founder.name}</div>
                    <div className="text-gray-500">{t.founder.title}</div>
                  </div>
                </div>
              </div>
              
              <div className="scroll-reveal pt-4" data-delay="300">
                <p className="text-gray-600 leading-relaxed border-l-4 border-[#10B981] pl-6">
                  {t.founder.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Cleaning service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 scroll-reveal" data-delay="0">
            {t.cta.title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 scroll-reveal" data-delay="100">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal" data-delay="200">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-[#10B981] hover:bg-[#059669] text-white px-10 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105"
              >
                {t.cta.button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/#contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-10 py-6 text-lg rounded-full transition-all duration-500"
              >
                {t.cta.secondaryButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-[#0F172A]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="-my-3 mb-4 inline-flex items-center">
                <img 
                  src="/hexaren-logo-header.png" 
                  alt="Hexaren" 
                  className="h-20 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-24"
                />
              </Link>
              <p className="text-gray-400">{t.footer.tagline}</p>
              <p className="text-gray-500 text-sm mt-2">{t.footer.cvr}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/office-cleaning" className="hover:text-[#10B981] transition">Office Cleaning</Link></li>
                <li><Link href="/services/apartment-cleaning" className="hover:text-[#10B981] transition">Apartment Cleaning</Link></li>
                <li><Link href="/services/airbnb-turnover" className="hover:text-[#10B981] transition">Airbnb & Turnover</Link></li>
                <li><Link href="/services/piccoline-office-support" className="hover:text-[#10B981] transition">Piccoline / Office Support</Link></li>
                <li><Link href="/services/staircase-cleaning" className="hover:text-[#10B981] transition">Staircase Cleaning</Link></li>
                <li><Link href="/services/move-out-cleaning" className="hover:text-[#10B981] transition">Move-out Cleaning</Link></li>
                <li><Link href="/services/temporary-staff" className="hover:text-[#10B981] transition">Temporary Cleaning Staff</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-[#10B981] transition">{t.footer.about}</Link></li>
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
