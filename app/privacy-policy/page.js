'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield
} from 'lucide-react';

const WHATSAPP_NUMBER = '+4522560070';

const sections = [
  {
    title: '1. Data Controller',
    body: [
      'The data controller responsible for your personal data is Hexaren Facility Services ApS.',
      'CVR: Registration ready in about one week.',
      'Address: Copenhagen, Denmark. The registered business address will be added once finalized.',
      'Email: hello@hexaren.dk',
      'Phone: +45 22560070'
    ],
    daTitle: '1. Dataansvarlig',
    daBody: [
      'Den dataansvarlige for dine personoplysninger er Hexaren Facility Services ApS.',
      'CVR: Registrering klar om cirka en uge.',
      'Adresse: København, Danmark. Den registrerede virksomhedsadresse tilføjes, når den er endeligt fastlagt.',
      'Email: hello@hexaren.dk',
      'Telefon: +45 22560070'
    ]
  },
  {
    title: '2. Personal Data We Collect',
    body: [
      'Contact details, such as name, email address, phone number, company name, and address details you choose to share.',
      'Service request data, such as selected services, property size, preferred date, notes, and messages submitted through forms.',
      'Communication data, such as emails, phone calls, booking requests, and other correspondence with us.',
      'Technical data that may be processed when you visit our website, such as IP address, browser type, device information, and basic server logs.',
      'Application or recruitment data if you contact us about job opportunities.'
    ],
    daTitle: '2. Personoplysninger Vi Indsamler',
    daBody: [
      'Kontaktoplysninger såsom navn, emailadresse, telefonnummer, firmanavn og adresseoplysninger du vælger at dele.',
      'Serviceforespørgsler såsom valgte ydelser, ejendomsstørrelse, ønsket dato, noter og beskeder sendt via formularer.',
      'Kommunikationsdata såsom emails, telefonopkald, bookingforespørgsler og anden korrespondance med os.',
      'Tekniske data der kan behandles, når du besøger vores website, såsom IP-adresse, browsertype, enhedsoplysninger og basale serverlogs.',
      'Ansøgnings- eller rekrutteringsdata hvis du kontakter os om jobmuligheder.'
    ]
  },
  {
    title: '3. Purpose and Lawful Basis',
    body: [
      'To respond to inquiries, prepare quotes, schedule services, and communicate with you. The lawful basis is our legitimate interest or steps taken before entering into a contract.',
      'To provide cleaning, facility, and office support services. The lawful basis is performance of a contract.',
      'To manage customer relationships, quality follow-up, and support requests. The lawful basis is legitimate interest.',
      'To comply with legal obligations, including bookkeeping and tax requirements.',
      'To handle recruitment inquiries when you apply for work with us. The lawful basis is legitimate interest or steps taken before entering into an employment contract.'
    ],
    daTitle: '3. Formål og Retsgrundlag',
    daBody: [
      'At besvare henvendelser, udarbejde tilbud, planlægge ydelser og kommunikere med dig. Retsgrundlaget er vores legitime interesse eller skridt forud for indgåelse af en kontrakt.',
      'At levere rengørings-, facility- og kontorsupportydelser. Retsgrundlaget er opfyldelse af en kontrakt.',
      'At håndtere kunderelationer, kvalitetsopfølgning og supportforespørgsler. Retsgrundlaget er legitim interesse.',
      'At overholde lovkrav, herunder bogførings- og skatteregler.',
      'At håndtere rekrutteringshenvendelser, når du søger arbejde hos os. Retsgrundlaget er legitim interesse eller skridt forud for indgåelse af en ansættelseskontrakt.'
    ]
  },
  {
    title: '4. Cookies and Third-Party Links',
    body: [
      'At this time, our website does not intentionally use analytics or marketing cookies.',
      'The website may include links to third-party services, such as Cal.com for meeting booking or WhatsApp for messaging. These services may process your data under their own privacy terms when you use them.',
      'If we add analytics, marketing cookies, or a cookie banner later, this policy will be updated.'
    ],
    daTitle: '4. Cookies og Tredjepartslinks',
    daBody: [
      'På nuværende tidspunkt bruger vores website ikke bevidst analyse- eller marketingcookies.',
      'Websitet kan indeholde links til tredjepartstjenester såsom Cal.com til mødebooking eller WhatsApp til beskeder. Disse tjenester kan behandle dine data efter deres egne privatlivsvilkår, når du bruger dem.',
      'Hvis vi senere tilføjer analyse, marketingcookies eller et cookie-banner, opdateres denne politik.'
    ]
  },
  {
    title: '5. Data Retention',
    body: [
      'Contact and inquiry data is normally retained for up to 12 months after the last interaction, unless a longer period is needed to provide services or resolve a matter.',
      'Customer, contract, invoice, and bookkeeping data may be retained for up to 5 years in accordance with Danish bookkeeping requirements.',
      'Recruitment data is normally deleted within 6 months unless you consent to longer retention or we are legally required to retain it.'
    ],
    daTitle: '5. Opbevaring af Data',
    daBody: [
      'Kontakt- og henvendelsesdata opbevares normalt i op til 12 måneder efter sidste kontakt, medmindre en længere periode er nødvendig for at levere ydelser eller håndtere en sag.',
      'Kunde-, kontrakt-, faktura- og bogføringsdata kan opbevares i op til 5 år i overensstemmelse med danske bogføringskrav.',
      'Rekrutteringsdata slettes normalt inden for 6 måneder, medmindre du giver samtykke til længere opbevaring, eller vi er juridisk forpligtet til at opbevare det.'
    ]
  },
  {
    title: '6. Sharing of Personal Data',
    body: [
      'We may share personal data with trusted service providers who help us operate our business and website.',
      'This may include website hosting providers, Supabase for contact data storage, Resend for email notifications, Cal.com for meeting booking, accounting or invoicing systems, and professional advisers when necessary.',
      'Where these parties act as data processors, they may only process personal data on our instructions and must apply appropriate security measures.'
    ],
    daTitle: '6. Deling af Personoplysninger',
    daBody: [
      'Vi kan dele personoplysninger med betroede leverandører, der hjælper os med at drive vores virksomhed og website.',
      'Dette kan omfatte hostingudbydere, Supabase til opbevaring af kontaktdata, Resend til emailnotifikationer, Cal.com til mødebooking, regnskabs- eller faktureringssystemer og professionelle rådgivere, når det er nødvendigt.',
      'Når disse parter fungerer som databehandlere, må de kun behandle personoplysninger efter vores instrukser og skal anvende passende sikkerhedsforanstaltninger.'
    ]
  },
  {
    title: '7. International Transfers',
    body: [
      'Some providers may process data outside the EU/EEA. Where this happens, we rely on appropriate safeguards such as the EU Commission’s Standard Contractual Clauses or other lawful transfer mechanisms.'
    ],
    daTitle: '7. Internationale Overførsler',
    daBody: [
      'Nogle leverandører kan behandle data uden for EU/EØS. Når dette sker, anvender vi passende garantier såsom EU-Kommissionens standardkontraktbestemmelser eller andre lovlige overførselsmekanismer.'
    ]
  },
  {
    title: '8. Security',
    body: [
      'We use appropriate technical and organisational measures to protect personal data against unauthorized access, loss, misuse, alteration, or disclosure.',
      'No digital transmission or storage method is completely secure, but we work to keep your information protected and limit access to people and systems that need it.'
    ],
    daTitle: '8. Sikkerhed',
    daBody: [
      'Vi bruger passende tekniske og organisatoriske foranstaltninger til at beskytte personoplysninger mod uautoriseret adgang, tab, misbrug, ændring eller videregivelse.',
      'Ingen digital overførsel eller opbevaringsmetode er fuldstændig sikker, men vi arbejder for at beskytte dine oplysninger og begrænse adgang til de personer og systemer, der har brug for det.'
    ]
  },
  {
    title: '9. Your Rights',
    body: [
      'Under GDPR, you may have the right to access your personal data, request correction, request deletion, restrict processing, receive data portability, object to processing based on legitimate interests, and withdraw consent where processing is based on consent.',
      'You also have the right to lodge a complaint with the Danish Data Protection Agency, Datatilsynet, at datatilsynet.dk.'
    ],
    daTitle: '9. Dine Rettigheder',
    daBody: [
      'Efter GDPR kan du have ret til indsigt i dine personoplysninger, berigtigelse, sletning, begrænsning af behandling, dataportabilitet, indsigelse mod behandling baseret på legitime interesser og tilbagetrækning af samtykke, hvor behandling er baseret på samtykke.',
      'Du har også ret til at klage til Datatilsynet på datatilsynet.dk.'
    ]
  },
  {
    title: '10. Changes to This Privacy Policy',
    body: [
      'We may update this Privacy Policy from time to time. The latest version will always be available on this page with the Last updated date shown above.'
    ],
    daTitle: '10. Ændringer af Denne Privatlivspolitik',
    daBody: [
      'Vi kan opdatere denne privatlivspolitik fra tid til anden. Den nyeste version vil altid være tilgængelig på denne side med datoen for seneste opdatering øverst.'
    ]
  },
  {
    title: '11. Contact Us',
    body: [
      'If you have questions about this Privacy Policy or want to exercise your data protection rights, contact us at hello@hexaren.dk or +45 22560070.'
    ],
    daTitle: '11. Kontakt Os',
    daBody: [
      'Hvis du har spørgsmål om denne privatlivspolitik eller vil gøre brug af dine databeskyttelsesrettigheder, kan du kontakte os på hello@hexaren.dk eller +45 22560070.'
    ]
  }
];

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState('en');
  const isDa = lang === 'da';

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="relative z-50 -my-2 flex items-center transition-transform duration-300 hover:scale-105 md:-my-3 lg:-my-4">
            <img
              src="/hexaren-logo-header.png"
              alt="Hexaren"
              className="h-16 w-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)] sm:h-[72px] md:h-20 lg:h-24"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#services" className="font-medium text-gray-700 transition-colors hover:text-[#10B981]">
              {isDa ? 'Ydelser' : 'Services'}
            </Link>
            <Link href="/about" className="font-medium text-gray-700 transition-colors hover:text-[#10B981]">
              {isDa ? 'Om os' : 'About'}
            </Link>
            <Link href="/contact" className="font-medium text-gray-700 transition-colors hover:text-[#10B981]">
              {isDa ? 'Kontakt' : 'Contact'}
            </Link>
          </div>

          <button
            onClick={() => setLang(isDa ? 'en' : 'da')}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
          >
            <Globe className="h-4 w-4" />
            {isDa ? 'EN' : 'DA'}
          </button>
        </div>
      </nav>

      <main>
        <section className="bg-[#0F172A] px-4 py-20 text-white md:py-28">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              <Shield className="h-4 w-4 text-[#10B981]" />
              {isDa ? 'Privatliv og databeskyttelse' : 'Privacy and data protection'}
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#10B981]">
              {isDa ? 'Senest opdateret 17/05/2026' : 'Last updated 17/05/2026'}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              {isDa ? 'Privatlivspolitik' : 'Privacy Policy'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
              {isDa
                ? 'Denne privatlivspolitik forklarer, hvordan Hexaren Facility Services ApS indsamler, bruger, opbevarer og beskytter personoplysninger, når du besøger vores website, kontakter os eller bruger vores ydelser.'
                : 'This Privacy Policy explains how Hexaren Facility Services ApS collects, uses, stores, and protects personal data when you visit our website, contact us, or use our services.'}
            </p>
          </div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="h-fit border border-[#0F172A]/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-[#0F172A]">
                {isDa ? 'Kontakt' : 'Contact'}
              </h2>
              <div className="mt-5 space-y-4 text-sm text-gray-600">
                <p className="font-semibold text-[#0F172A]">Hexaren Facility Services ApS</p>
                <p>{isDa ? 'CVR: Registrering klar om cirka en uge' : 'CVR: Registration ready in about one week'}</p>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#10B981]" />
                  Copenhagen, Denmark
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#10B981]" />
                  hello@hexaren.dk
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#10B981]" />
                  +45 22560070
                </p>
              </div>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#0F172A] transition-colors hover:text-[#10B981]">
                {isDa ? 'Kontakt os' : 'Contact us'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>

            <div className="space-y-6">
              {sections.map((section) => (
                <section key={section.title} className="border border-[#0F172A]/10 bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-2xl font-bold text-[#0F172A]">
                    {isDa ? section.daTitle : section.title}
                  </h2>
                  <div className="mt-5 space-y-3 text-base leading-relaxed text-gray-600">
                    {(isDa ? section.daBody : section.body).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] px-4 py-12">
        <div className="container mx-auto flex flex-col gap-5 text-gray-400 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="-my-3 mb-3 inline-flex items-center">
              <img
                src="/hexaren-logo-header.png"
                alt="Hexaren"
                className="h-20 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-24"
              />
            </Link>
            <p>© {new Date().getFullYear()} Hexaren Facility Services ApS. {isDa ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm">
            <Link href="/privacy-policy" className="transition-colors hover:text-[#10B981]">
              {isDa ? 'Privatlivspolitik' : 'Privacy Policy'}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#10B981]">
              {isDa ? 'Kontakt' : 'Contact'}
            </Link>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-[#128C7E]"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden font-medium md:inline">{isDa ? 'Chat med os' : 'Chat with us'}</span>
      </a>
    </div>
  );
}
