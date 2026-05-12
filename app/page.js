'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  Smartphone,
  FileCheck,
  LayoutGrid,
  Award,
  Target,
  Heart,
  Zap
} from 'lucide-react';

const WHATSAPP_NUMBER = '+4531862094';

export default function SixStarPage() {
  const [lang, setLang] = useState('en');
  const [sqm, setSqm] = useState(50);
  const [addons, setAddons] = useState({
    window: false,
    oven: false,
    balcony: false,
    carpet: false
  });
  const [weekend, setWeekend] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'office',
    sqm: 50,
    address: '',
    date: '',
    notes: ''
  });
  const [bookingStatus, setBookingStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingForm,
          addons: Object.keys(addons).filter(k => addons[k]),
          weekend,
          totalPrice: calculatePrice()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setBookingStatus({ type: 'success', message: t.booking.success });
        setBookingForm({ name: '', email: '', phone: '', service: 'office', sqm: 50, address: '', date: '', notes: '' });
        setTimeout(() => setBookingOpen(false), 2000);
      } else {
        setBookingStatus({ type: 'error', message: data.error || t.booking.error });
      }
    } catch (error) {
      setBookingStatus({ type: 'error', message: t.booking.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Global Intersection Observer for smooth scroll animations
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all elements immediately for users who prefer reduced motion
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
            
            // Apply animation after delay with requestAnimationFrame for smoother rendering
            requestAnimationFrame(() => {
              setTimeout(() => {
                element.classList.add('animate-in');
              }, delay);
            });
            
            // Unobserve after triggering animation
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all elements with scroll-reveal classes
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
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'da' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'DA' : 'EN'}
            </button>
            
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
                  {t.nav.bookOnline}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#0F172A]">{t.booking.title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.booking.name}</Label>
                      <Input 
                        id="name" 
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.booking.phone}</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.booking.email}</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t.booking.service}</Label>
                      <Select 
                        value={bookingForm.service}
                        onValueChange={(value) => setBookingForm({...bookingForm, service: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">{lang === 'en' ? 'Office Cleaning' : 'Kontorrengøring'}</SelectItem>
                          <SelectItem value="airbnb">{lang === 'en' ? 'Airbnb & Turnover' : 'Airbnb & Skifterengøring'}</SelectItem>
                          <SelectItem value="moveout">{lang === 'en' ? 'Move-out Cleaning' : 'Flytterengøring'}</SelectItem>
                          <SelectItem value="staircase">{lang === 'en' ? 'Staircase Cleaning' : 'Trapperengøring'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sqm">{t.booking.sqm}</Label>
                      <Input 
                        id="sqm" 
                        type="number"
                        min="10"
                        value={bookingForm.sqm}
                        onChange={(e) => setBookingForm({...bookingForm, sqm: parseInt(e.target.value) || 50})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t.booking.address}</Label>
                    <Input 
                      id="address" 
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">{t.booking.date}</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">{t.booking.notes}</Label>
                    <Textarea 
                      id="notes" 
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  {bookingStatus.message && (
                    <div className={`p-3 rounded-lg ${bookingStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {bookingStatus.message}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '...' : t.booking.submit}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section - Fullscreen Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img 
            src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg" 
            alt="Professional cleaning service"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Animated Content */}
          <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 transition-all duration-500 hover:bg-white/20">
              <Leaf className="w-4 h-4" />
              {t.hero.trustBadge}
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              {t.hero.title} <span className="text-[#10B981]">{t.hero.titleAccent}</span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">{t.hero.subtitle}</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-white text-[#0F172A] hover:bg-white/90 px-8 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                onClick={() => setBookingOpen(true)}
              >
                {t.hero.cta}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0F172A] px-8 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.secondaryCta}
              </Button>
            </div>
            
            {/* Trust Badges */}
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
            
            {/* 6 Owners Badge */}
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

      {/* Values Section - The Hexaren Promise */}
      <section id="about" className="py-20 px-4 bg-[#0F172A]">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <h2 className="text-4xl font-bold text-white mb-4">{t.values.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center scroll-reveal" data-delay={index * 100}>
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                  <value.icon className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Modern Grid Layout */}
      <section id="services" className="py-24 px-4 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t.services.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          
          {/* Service Cards - 2 per row */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="scroll-reveal group"
                data-delay={index * 100}
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-transparent to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-14 h-14 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="w-7 h-7 text-[#10B981]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 lg:p-8 space-y-4">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Features List */}
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
                    
                    {/* Discover Button */}
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

      {/* Pricing Calculator */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">{t.pricing.title}</h2>
            <p className="text-xl text-gray-600">{t.pricing.subtitle}</p>
          </div>
          
          <div className="max-w-2xl mx-auto scroll-reveal" data-delay="100">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {/* Square meters slider */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-medium">{t.pricing.sqmLabel}</Label>
                    <span className="text-2xl font-bold text-[#10B981]">{sqm} m²</span>
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

                {/* Price breakdown */}
                <div className="space-y-3 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-gray-600">
                    <span>{t.pricing.basePrice}</span>
                    <span>{BASE_PRICE} DKK</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{sqm} m² × {PRICE_PER_SQM} DKK {t.pricing.perSqm}</span>
                    <span>{sqm * PRICE_PER_SQM} DKK</span>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-4 mb-8">
                  <Label className="text-lg font-medium">{t.pricing.addons}</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'window', label: t.pricing.windowCleaning, price: ADDON_PRICES.window },
                      { key: 'oven', label: t.pricing.ovenCleaning, price: ADDON_PRICES.oven },
                      { key: 'balcony', label: t.pricing.balcony, price: ADDON_PRICES.balcony },
                      { key: 'carpet', label: t.pricing.carpet, price: ADDON_PRICES.carpet }
                    ].map((addon) => (
                      <div key={addon.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={addons[addon.key]}
                            onCheckedChange={(checked) => setAddons({...addons, [addon.key]: checked})}
                          />
                          <span className="text-sm">{addon.label}</span>
                        </div>
                        <span className="text-sm font-medium">+{addon.price} DKK</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekend toggle */}
                <div className="flex items-center justify-between p-4 bg-[#10B981]/5 rounded-lg mb-8">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={weekend}
                      onCheckedChange={setWeekend}
                    />
                    <span className="font-medium">{t.pricing.weekend}</span>
                  </div>
                  <Calendar className="w-5 h-5 text-[#10B981]" />
                </div>

                {/* Total */}
                <div className="flex justify-between items-center p-6 bg-[#0F172A] rounded-xl text-white mb-6">
                  <span className="text-lg">{t.pricing.total}</span>
                  <span className="text-4xl font-bold">{calculatePrice()} DKK</span>
                </div>

                <p className="text-sm text-gray-500 text-center mb-6">{t.pricing.disclaimer}</p>

                <Button 
                  size="lg" 
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-lg py-6"
                  onClick={() => {
                    setBookingForm({...bookingForm, sqm});
                    setBookingOpen(true);
                  }}
                >
                  {t.pricing.bookNow}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal" data-delay="0">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">{t.howItWorks.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', ...t.howItWorks.step1, icon: Calendar },
              { step: '02', ...t.howItWorks.step2, icon: Sparkles },
              { step: '03', ...t.howItWorks.step3, icon: Check }
            ].map((item, index) => (
              <div key={index} className="text-center scroll-reveal" data-delay={index * 100}>
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <item.icon className="w-10 h-10 text-[#10B981]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0F172A] text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#10B981] to-[#059669]">
        <div className="container mx-auto text-center scroll-reveal" data-delay="0">
          <h2 className="text-4xl font-bold text-white mb-4">
            {lang === 'en' ? 'Ready for a Spotless Space?' : 'Klar til et pletfrit rum?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Book your cleaning today and experience the Hexaren difference. 6 owners personally invested in every job.' 
              : 'Book din rengøring i dag og oplev Hexaren-forskellen. 6 ejere personligt investeret i hvert job.'}
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#10B981] hover:bg-gray-100 px-12 py-6 text-lg font-bold"
            onClick={() => setBookingOpen(true)}
          >
            {t.nav.bookOnline}
          </Button>
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
                <li><a href="#about" className="hover:text-[#10B981] transition">{t.footer.about}</a></li>
                <li><a href="#" className="hover:text-[#10B981] transition">{t.footer.careers}</a></li>
                <li><a href="#" className="hover:text-[#10B981] transition">{t.footer.blog}</a></li>
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
