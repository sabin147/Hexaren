'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Award,
  Target,
  Heart,
  Zap,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '+4531862094';

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

  const t = translations[lang];

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

  const services = [
    {
      id: 'office',
      slug: 'office-cleaning',
      icon: Building2,
      ...t.services.office,
      image: 'https://images.pexels.com/photos/10567271/pexels-photo-10567271.jpeg'
    },
    {
      id: 'moveout',
      slug: 'move-out-cleaning',
      icon: Sparkles,
      ...t.services.moveout,
      image: 'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg'
    },
    {
      id: 'airbnb',
      slug: 'airbnb-turnover',
      icon: Home,
      ...t.services.airbnb,
      image: 'https://images.pexels.com/photos/6197116/pexels-photo-6197116.jpeg'
    },
    {
      id: 'apartment',
      slug: 'apartment-cleaning',
      icon: Star,
      ...t.services.piccoline,
      image: 'https://images.pexels.com/photos/7876725/pexels-photo-7876725.jpeg'
    },
    {
      id: 'staircase',
      slug: 'staircase-cleaning',
      icon: LayoutGrid,
      ...t.services.staircase,
      image: 'https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg'
    }
  ];

  const values = [
    { icon: Clock, ...t.values.showup },
    { icon: Award, ...t.values.quality },
    { icon: Shield, ...t.values.transparent },
    { icon: Users, ...t.values.professional },
    { icon: Zap, ...t.values.flexible },
    { icon: Heart, ...t.values.care }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Animation Styles */}
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
          transform: scale(1.05);
        }
        .card-lift {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img 
              src="/hexaren-logo.png" 
              alt="Hexaren" 
              className="h-12 w-auto object-contain"
            />
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.services}</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.pricing}</a>
            <a href="/about" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.about}</a>
            <a href="/contact" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.contact}</a>
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
                {lang === 'en' ? 'Get a Quote' : 'Få et Tilbud'}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Fullscreen Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <img 
            src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg" 
            alt="Professional cleaning service"
            className="w-full h-full object-cover"
          />
        </video>
        
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 transition-all duration-500 hover:bg-white/20">
              <Leaf className="w-4 h-4" />
              {t.hero.trustBadge}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              {t.hero.title} <span className="text-[#10B981]">{t.hero.titleAccent}</span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">{t.hero.subtitle}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/contact">
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
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-8 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.secondaryCta}
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Shield className="w-5 h-5 text-[#10B981]" />
                <span className="text-sm text-white">Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Leaf className="w-5 h-5 text-[#10B981]" />
                <span className="text-sm text-white">Svanemærket</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Clock className="w-5 h-5 text-[#10B981]" />
                <span className="text-sm text-white">Same-Day</span>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl mt-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#0F172A] text-sm">6 Owners</p>
                <p className="text-xs text-gray-600">Personally Invested</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 scroll-reveal" data-delay="0">
          <p className="text-center text-gray-500 mb-6">{t.trust.title}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {t.trust.areas.map((area, index) => (
              <div key={area} className="flex items-center gap-2 text-[#0F172A] font-medium scroll-reveal" data-delay={index * 50}>
                <MapPin className="w-4 h-4 text-[#10B981]" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Beautiful Cards */}
      <section id="about" className="py-24 md:py-32 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="0">
              {t.values.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto scroll-reveal" data-delay="50">
              What makes Hexaren different from other cleaning services
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="scroll-reveal card-lift"
                data-delay={100 + index * 100}
              >
                <div className="bg-white rounded-2xl p-8 h-full shadow-lg">
                  <div className="w-16 h-16 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced Grid Layout */}
      <section id="services" className="py-24 md:py-32 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <span className="inline-block text-[#10B981] font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t.services.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="scroll-reveal card-lift group"
                data-delay={100 + index * 100}
              >
                <div className="h-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover image-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="w-14 h-14 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <service.icon className="w-7 h-7 text-[#10B981]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-[#10B981]" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <a
                        href={`/services/${service.slug}`}
                        className="group/btn inline-flex items-center gap-2 text-base font-semibold text-[#10B981] transition-all duration-300 hover:gap-3"
                      >
                        <span className="relative">
                          Discover
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] transition-all duration-300 group-hover/btn:w-full"></span>
                        </span>
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator - Enhanced Design */}
      <section id="pricing" className="py-24 md:py-32 px-4 bg-[#FAFBFC]">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <span className="inline-block text-[#10B981] font-semibold text-sm uppercase tracking-wider mb-4">
              Transparent Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t.pricing.title}</h2>
            <p className="text-xl text-gray-600">{t.pricing.subtitle}</p>
          </div>
          
          <div className="max-w-2xl mx-auto scroll-reveal" data-delay="100">
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-medium">{t.pricing.sqmLabel}</Label>
                    <span className="text-3xl font-bold text-[#10B981]">{sqm} m²</span>
                  </div>
                  <Slider
                    value={[sqm]}
                    onValueChange={(value) => setSqm(value[0])}
                    min={20}
                    max={300}
                    step={5}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>20 m²</span>
                    <span>300 m²</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex justify-between text-gray-600">
                    <span>{t.pricing.basePrice}</span>
                    <span className="font-medium">{BASE_PRICE} DKK</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{sqm} m² × {PRICE_PER_SQM} DKK {t.pricing.perSqm}</span>
                    <span className="font-medium">{sqm * PRICE_PER_SQM} DKK</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Label className="text-lg font-medium">{t.pricing.addons}</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'window', label: t.pricing.windowCleaning, price: ADDON_PRICES.window },
                      { key: 'oven', label: t.pricing.ovenCleaning, price: ADDON_PRICES.oven },
                      { key: 'balcony', label: t.pricing.balcony, price: ADDON_PRICES.balcony },
                      { key: 'carpet', label: t.pricing.carpet, price: ADDON_PRICES.carpet }
                    ].map((addon) => (
                      <div key={addon.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={addons[addon.key]}
                            onCheckedChange={(checked) => setAddons({...addons, [addon.key]: checked})}
                          />
                          <span className="text-sm font-medium">{addon.label}</span>
                        </div>
                        <span className="text-sm font-bold text-[#10B981]">+{addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-[#10B981]/10 rounded-2xl mb-8">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={weekend}
                      onCheckedChange={setWeekend}
                    />
                    <span className="font-medium">{t.pricing.weekend}</span>
                  </div>
                  <Calendar className="w-5 h-5 text-[#10B981]" />
                </div>

                <div className="flex justify-between items-center p-8 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl text-white mb-6">
                  <span className="text-lg font-medium">{t.pricing.total}</span>
                  <span className="text-5xl font-bold">{calculatePrice()}</span>
                </div>

                <p className="text-sm text-gray-500 text-center mb-6">{t.pricing.disclaimer}</p>

                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-lg py-7 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  >
                    {t.pricing.bookNow}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <span className="inline-block text-[#10B981] font-semibold text-sm uppercase tracking-wider mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t.howItWorks.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', ...t.howItWorks.step1, icon: Calendar },
              { step: '02', ...t.howItWorks.step2, icon: Sparkles },
              { step: '03', ...t.howItWorks.step3, icon: Check }
            ].map((item, index) => (
              <div key={index} className="text-center scroll-reveal" data-delay={index * 100}>
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-[#10B981]/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <item.icon className="w-12 h-12 text-[#10B981]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#0F172A] text-white text-lg font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
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
            {lang === 'en' ? 'Ready to Experience Premium Cleaning?' : 'Klar til at Opleve Premium Rengøring?'}
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
            <a href={`tel:+4531862094`}>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-12 py-7 text-lg font-bold rounded-full transition-all duration-500"
              >
                {lang === 'en' ? 'Call Us Now' : 'Ring Til Os Nu'}
                <Phone className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-4 bg-[#0F172A]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <a href="/" className="flex items-center gap-3 mb-4">
                <img 
                  src="/hexaren-logo.png" 
                  alt="Hexaren" 
                  className="h-12 w-auto object-contain"
                />
              </a>
              <p className="text-gray-400">{t.footer.tagline}</p>
              <p className="text-gray-500 text-sm mt-2">{t.footer.cvr}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-[#10B981] transition">{t.services.office.title}</a></li>
                <li><a href="#services" className="hover:text-[#10B981] transition">{t.services.airbnb.title}</a></li>
                <li><a href="#services" className="hover:text-[#10B981] transition">{t.services.moveout.title}</a></li>
                <li><a href="#services" className="hover:text-[#10B981] transition">{t.services.staircase.title}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-[#10B981] transition">{t.footer.about}</a></li>
                <li><Link href="/contact" className="hover:text-[#10B981] transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#10B981]" />
                  +45 31 86 20 94
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#10B981]" />
                  sabinghimire071@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#10B981]" />
                  Copenhagen, Denmark
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Hexaren ApS. {t.footer.rights}.</p>
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
