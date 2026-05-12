'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Star, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Globe,
  Send,
  Clock,
  CheckCircle,
  Building2,
  Home,
  Sparkles,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Calendar,
  PhoneCall,
  Users,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '+4531862094';

// Translations for Contact page
const contactTranslations = {
  en: {
    nav: {
      services: 'Services',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      bookOnline: 'Book Online'
    },
    hero: {
      title: 'You have questions,',
      titleAccent: 'we have answers',
      description: 'Whether you need a quote, have questions about our services, or want to discuss a custom cleaning solution—we\'re here to help.',
      email: 'sabinghimire071@gmail.com',
      phone: '+45 31 86 20 94',
      hours: 'Mon-Fri: 8:00 - 18:00',
      response: 'We respond within 2 hours',
      bookMeeting: 'Book a meeting',
      scheduleCall: 'Schedule a call'
    },
    quickActions: {
      job: 'Looking for a job as a Cleaning specialist?',
      jobLink: 'Click here to apply',
      partner: 'Want to work at Hexaren?',
      partnerLink: 'Click here to see our job listings'
    },
    form: {
      title: 'Send us a message',
      subtitle: 'Fill out the form and we\'ll get back to you shortly',
      name: 'Full Name',
      namePlaceholder: 'Your name',
      email: 'Email Address',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone Number',
      phonePlaceholder: '+45 XX XX XX XX',
      company: 'Company (Optional)',
      companyPlaceholder: 'Your company name',
      service: 'What service are you interested in?',
      message: 'Your Message',
      messagePlaceholder: 'Tell us about your cleaning needs, property size, or any questions you have...',
      submit: 'Send Message',
      submitting: 'Sending...',
      success: 'Message sent! We\'ll get back to you within 2 hours.',
      error: 'Something went wrong. Please try again.',
      services: {
        office: 'Office Cleaning',
        apartment: 'Apartment Cleaning',
        airbnb: 'Airbnb & Turnover',
        staircase: 'Staircase Cleaning',
        other: 'Other'
      }
    },
    faq: {
      label: 'Got Questions?',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our cleaning services',
      items: [
        {
          question: 'How do I book a cleaning service?',
          answer: 'Booking is easy! You can use our online booking form, send us a message through this contact page, or simply call us at +45 31 86 20 94. We\'ll get back to you within 2 hours to confirm your booking and discuss any specific requirements.'
        },
        {
          question: 'What areas in Copenhagen do you cover?',
          answer: 'We serve all of Copenhagen including Nordhavn, Østerbro, Frederiksberg, Nørrebro, Vesterbro, Amager, and surrounding areas. If you\'re unsure whether we cover your location, just reach out and we\'ll let you know.'
        },
        {
          question: 'What cleaning products do you use?',
          answer: 'We exclusively use Svanemærket (Nordic Swan) eco-certified cleaning products. These are environmentally friendly, non-toxic, and safe for your family, pets, and the planet—without compromising on cleaning power.'
        },
        {
          question: 'How is pricing determined?',
          answer: 'Our pricing is transparent and based on square meters, the type of service you need, and any add-ons (like window cleaning or oven cleaning). Use our online pricing calculator for an instant estimate, or contact us for a custom quote.'
        },
        {
          question: 'Can I reschedule or cancel a booking?',
          answer: 'Yes, we understand plans can change. You can reschedule or cancel your booking up to 24 hours before the scheduled time at no extra cost. Just give us a call or send us a message.'
        },
        {
          question: 'Do I need to be home during the cleaning?',
          answer: 'Not at all. Many of our clients provide us with a key or access code. We\'re fully insured and all our team members are thoroughly vetted. You can trust us to take care of your space while you\'re away.'
        },
        {
          question: 'What makes Hexaren different from other cleaning services?',
          answer: 'We\'re a collective of 6 dedicated owners who personally invest in every job. This means no middlemen, no excuses—just premium quality and genuine accountability. We never miss a shift, and we treat every space like it\'s our own.'
        },
        {
          question: 'Do you offer recurring cleaning services?',
          answer: 'Absolutely! We offer flexible scheduling options including weekly, bi-weekly, and monthly cleaning plans. Recurring clients enjoy priority booking and consistent quality from a familiar team.'
        }
      ]
    },
    cta: {
      title: 'Ready to experience premium cleaning?',
      subtitle: 'Join businesses and homes across Copenhagen that trust Hexaren.',
      button: 'Get Your Free Quote'
    },
    footer: {
      tagline: 'Hexaren ApS - Premium cleaning in Copenhagen',
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
      about: 'About Us',
      careers: 'Careers',
      blog: 'Blog',
      rights: 'All rights reserved',
      cvr: 'CVR: Coming Soon'
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
      title: 'Du har spørgsmål,',
      titleAccent: 'vi har svar',
      description: 'Uanset om du har brug for et tilbud, har spørgsmål om vores services, eller ønsker at diskutere en tilpasset rengøringsløsning—vi er her for at hjælpe.',
      email: 'sabinghimire071@gmail.com',
      phone: '+45 31 86 20 94',
      hours: 'Man-Fre: 8:00 - 18:00',
      response: 'Vi svarer inden for 2 timer',
      bookMeeting: 'Book et møde',
      scheduleCall: 'Planlæg et opkald'
    },
    quickActions: {
      job: 'Leder du efter job som rengøringsspecialist?',
      jobLink: 'Klik her for at ansøge',
      partner: 'Vil du arbejde hos Hexaren?',
      partnerLink: 'Klik her for at se vores job annoncer'
    },
    form: {
      title: 'Send os en besked',
      subtitle: 'Udfyld formularen og vi vender tilbage hurtigst muligt',
      name: 'Fulde Navn',
      namePlaceholder: 'Dit navn',
      email: 'Email Adresse',
      emailPlaceholder: 'din@email.dk',
      phone: 'Telefonnummer',
      phonePlaceholder: '+45 XX XX XX XX',
      company: 'Firma (Valgfrit)',
      companyPlaceholder: 'Dit firmanavn',
      service: 'Hvilken service er du interesseret i?',
      message: 'Din Besked',
      messagePlaceholder: 'Fortæl os om dine rengøringsbehov, ejendomsstørrelse, eller eventuelle spørgsmål...',
      submit: 'Send Besked',
      submitting: 'Sender...',
      success: 'Besked sendt! Vi vender tilbage inden for 2 timer.',
      error: 'Noget gik galt. Prøv igen.',
      services: {
        office: 'Kontorrengøring',
        apartment: 'Lejlighedsrengøring',
        airbnb: 'Airbnb & Skifterengøring',
        staircase: 'Trapperengøring',
        other: 'Andet'
      }
    },
    quickActions: {
      job: 'Leder du efter job som rengøringsspecialist?',
      jobLink: 'Klik her for at ansøge',
      partner: 'Vil du arbejde hos Hexaren?',
      partnerLink: 'Klik her for at se vores job annoncer'
    },
    faq: {
      label: 'Har Du Spørgsmål?',
      title: 'Ofte Stillede Spørgsmål',
      subtitle: 'Alt hvad du behøver at vide om vores rengøringsservices',
      items: [
        {
          question: 'Hvordan booker jeg en rengøringsservice?',
          answer: 'Det er nemt at booke! Du kan bruge vores online bookingformular, sende os en besked via denne kontaktside, eller bare ringe til os på +45 31 86 20 94. Vi vender tilbage inden for 2 timer for at bekræfte din booking og diskutere eventuelle specifikke krav.'
        },
        {
          question: 'Hvilke områder i København dækker I?',
          answer: 'Vi dækker hele København inklusive Nordhavn, Østerbro, Frederiksberg, Nørrebro, Vesterbro, Amager og omegn. Hvis du er usikker på om vi dækker din lokation, så kontakt os og vi fortæller dig det.'
        },
        {
          question: 'Hvilke rengøringsprodukter bruger I?',
          answer: 'Vi bruger udelukkende Svanemærket miljøcertificerede rengøringsprodukter. Disse er miljøvenlige, ugiftige og sikre for din familie, kæledyr og planeten—uden at gå på kompromis med rengøringskraften.'
        },
        {
          question: 'Hvordan bestemmes prisen?',
          answer: 'Vores priser er gennemsigtige og baseret på kvadratmeter, den type service du har brug for, og eventuelle tilvalg (som vinduespolering eller ovnrengøring). Brug vores online prisberegner for et øjeblikkeligt estimat, eller kontakt os for et tilpasset tilbud.'
        },
        {
          question: 'Kan jeg ændre eller aflyse en booking?',
          answer: 'Ja, vi forstår at planer kan ændre sig. Du kan ændre eller aflyse din booking op til 24 timer før det planlagte tidspunkt uden ekstra omkostninger. Bare ring til os eller send en besked.'
        },
        {
          question: 'Skal jeg være hjemme under rengøringen?',
          answer: 'Slet ikke. Mange af vores kunder giver os en nøgle eller adgangskode. Vi er fuldt forsikrede og alle vores teammedlemmer er grundigt godkendte. Du kan stole på os til at passe på dit rum mens du er væk.'
        },
        {
          question: 'Hvad gør Hexaren anderledes fra andre rengøringsservices?',
          answer: 'Vi er et kollektiv af 6 dedikerede ejere der personligt investerer i hvert job. Det betyder ingen mellemled, ingen undskyldninger—bare premium kvalitet og ægte ansvarlighed. Vi misser aldrig en vagt, og vi behandler hvert rum som om det var vores eget.'
        },
        {
          question: 'Tilbyder I tilbagevendende rengøringsservices?',
          answer: 'Absolut! Vi tilbyder fleksible planlægningsmuligheder inklusive ugentlige, hver anden uge og månedlige rengøringsplaner. Tilbagevendende kunder nyder prioritetsbooking og konsistent kvalitet fra et velkendt team.'
        }
      ]
    },
    cta: {
      title: 'Klar til at opleve premium rengøring?',
      subtitle: 'Slut dig til virksomheder og hjem i hele København der stoler på Hexaren.',
      button: 'Få Dit Gratis Tilbud'
    },
    footer: {
      tagline: 'Hexaren ApS - Premium rengøring i København',
      services: 'Ydelser',
      company: 'Firma',
      contact: 'Kontakt',
      about: 'Om Os',
      careers: 'Karriere',
      blog: 'Blog',
      rights: 'Alle rettigheder forbeholdes',
      cvr: 'CVR: Kommer snart'
    },
    whatsapp: 'Chat med os'
  }
};

export default function ContactPage() {
  const [lang, setLang] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const t = contactTranslations[lang];

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

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: selectedServices
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setFormStatus({ type: 'success', message: t.form.success });
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        setSelectedServices([]);
      } else {
        setFormStatus({ type: 'error', message: data.error || t.form.error });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: t.form.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { key: 'office', icon: Building2 },
    { key: 'apartment', icon: Home },
    { key: 'airbnb', icon: Sparkles },
    { key: 'staircase', icon: Building2 },
    { key: 'other', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Custom styles */}
      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .service-tag {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-tag:hover {
          transform: translateY(-2px);
        }
        .service-tag.selected {
          background: #10B981;
          color: white;
          border-color: #10B981;
        }
        .form-input {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input:focus {
          border-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal {
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
            <Link href="/" className="text-gray-600 hover:text-[#0F172A] transition">Home</Link>
            <Link href="/#services" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.services}</Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.pricing}</Link>
            <Link href="/about" className="text-gray-600 hover:text-[#0F172A] transition">{t.nav.about}</Link>
            <Link href="/contact" className="text-[#10B981] font-medium">{t.nav.contact}</Link>
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

      {/* CONTACT + FORM SECTION */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#0F172A]/80 to-[#0F172A]/90" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* LEFT - Contact Info */}
            <div className="space-y-8">
              <div className="scroll-reveal" data-delay="0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  {t.hero.title}
                  <br />
                  <span className="text-[#10B981]">{t.hero.titleAccent}</span>
                </h1>
                <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                  {t.hero.description}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 scroll-reveal" data-delay="100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <a href={`mailto:${t.hero.email}`} className="text-white font-medium hover:text-[#10B981] transition">
                      {t.hero.email}
                    </a>
                    <p className="text-white/60 text-sm">{t.hero.response}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <a href={`tel:${t.hero.phone.replace(/\s/g, '')}`} className="text-white font-medium hover:text-[#10B981] transition">
                      {t.hero.phone}
                    </a>
                    <p className="text-white/60 text-sm">{t.hero.hours}</p>
                  </div>
                </div>
              </div>

              {/* Book Meeting / Schedule Call Buttons */}
              <div className="space-y-4 scroll-reveal" data-delay="200">
                <a 
                  href="https://cal.com/sabinghimire147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/30"
                >
                  <Calendar className="w-5 h-5" />
                  {t.hero.bookMeeting}
                </a>
                <a 
                  href="https://cal.com/sabinghimire147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium transition-all duration-300 border-2 border-white/20 hover:border-white/40"
                >
                  <PhoneCall className="w-5 h-5" />
                  {t.hero.scheduleCall}
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 scroll-reveal" data-delay="250">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-all duration-300">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-all duration-300">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-all duration-300">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* RIGHT - Contact Form Card */}
            <div className="scroll-reveal" data-delay="150">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-2">{t.form.title}</h2>
                  <p className="text-gray-500">{t.form.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">{t.form.name}</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t.form.namePlaceholder}
                        className="form-input h-12 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">{t.form.email}</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.form.emailPlaceholder}
                        className="form-input h-12 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">{t.form.phone}</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t.form.phonePlaceholder}
                        className="form-input h-12 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700">{t.form.company}</Label>
                      <Input 
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder={t.form.companyPlaceholder}
                        className="form-input h-12 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Service Tags */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">{t.form.service}</Label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => (
                        <button
                          key={service.key}
                          type="button"
                          onClick={() => toggleService(service.key)}
                          className={`service-tag inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
                            selectedServices.includes(service.key)
                              ? 'selected'
                              : 'border-gray-200 text-gray-600 hover:border-[#10B981] hover:text-[#10B981]'
                          }`}
                        >
                          <service.icon className="w-4 h-4" />
                          {t.form.services[service.key]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">{t.form.message}</Label>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t.form.messagePlaceholder}
                      rows={4}
                      className="form-input rounded-xl border-gray-200 resize-none"
                      required
                    />
                  </div>

                  {/* Status Message */}
                  {formStatus.message && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 ${
                      formStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800' 
                        : 'bg-red-50 text-red-800'
                    }`}>
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      {formStatus.message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-[#10B981] hover:bg-[#059669] text-white text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/25"
                  >
                    {isSubmitting ? (
                      t.form.submitting
                    ) : (
                      <>
                        {t.form.submit}
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTION LINKS - Job & Partner */}
      <section className="py-12 px-4 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href="mailto:sabinghimire071@gmail.com?subject=Job Application - Cleaning Specialist"
              className="flex items-start gap-4 p-6 rounded-2xl border-2 border-gray-100 hover:border-[#10B981] hover:shadow-lg transition-all duration-300 group scroll-reveal"
              data-delay="0"
            >
              <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981] transition-all">
                <Users className="w-6 h-6 text-[#10B981] group-hover:text-white transition-all" />
              </div>
              <div>
                <p className="text-gray-900 font-medium mb-1">{t.quickActions.job}</p>
                <p className="text-[#10B981] text-sm font-medium flex items-center gap-1">
                  {t.quickActions.jobLink} <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </a>

            <a 
              href="mailto:sabinghimire071@gmail.com?subject=Partnership Inquiry"
              className="flex items-start gap-4 p-6 rounded-2xl border-2 border-gray-100 hover:border-[#10B981] hover:shadow-lg transition-all duration-300 group scroll-reveal"
              data-delay="100"
            >
              <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981] transition-all">
                <Briefcase className="w-6 h-6 text-[#10B981] group-hover:text-white transition-all" />
              </div>
              <div>
                <p className="text-gray-900 font-medium mb-1">{t.quickActions.partner}</p>
                <p className="text-[#10B981] text-sm font-medium flex items-center gap-1">
                  {t.quickActions.partnerLink} <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#10B981] font-semibold text-sm uppercase tracking-wider mb-4 scroll-reveal" data-delay="0">
              {t.faq.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 scroll-reveal" data-delay="50">
              {t.faq.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto scroll-reveal" data-delay="100">
              {t.faq.subtitle}
            </p>
          </div>

          {/* Accordion */}
          <div className="scroll-reveal" data-delay="150">
            <Accordion type="single" collapsible className="space-y-4">
              {t.faq.items.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-[#FAFBFC] rounded-2xl border-0 px-6 overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <AccordionTrigger className="text-left py-6 text-[#0F172A] font-semibold hover:no-underline hover:text-[#10B981] transition-colors [&[data-state=open]]:text-[#10B981]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA / IMAGE SECTION */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional cleaning"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 bg-[#0F172A]/80" />
        </div>

        <div className="relative z-10 container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 scroll-reveal" data-delay="0">
            {t.cta.title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 scroll-reveal" data-delay="100">
            {t.cta.subtitle}
          </p>
          <div className="scroll-reveal" data-delay="200">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-[#10B981] hover:bg-[#059669] text-white px-12 py-6 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#10B981]/30"
              >
                {t.cta.button}
                <ArrowRight className="w-5 h-5 ml-2" />
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
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img 
                  src="/hexaren-logo.png" 
                  alt="Hexaren" 
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <p className="text-gray-400">{t.footer.tagline}</p>
              <p className="text-gray-500 text-sm mt-2">{t.footer.cvr}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#services" className="hover:text-[#10B981] transition">Office Cleaning</Link></li>
                <li><Link href="/#services" className="hover:text-[#10B981] transition">Apartment Cleaning</Link></li>
                <li><Link href="/#services" className="hover:text-[#10B981] transition">Airbnb & Turnover</Link></li>
                <li><Link href="/#services" className="hover:text-[#10B981] transition">Staircase Cleaning</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-[#10B981] transition">{t.footer.about}</Link></li>
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
