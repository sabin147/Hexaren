import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hexaren Rengøring | Premium Cleaning Services Copenhagen | Kontorrengøring København',
  description: 'Professional office cleaning, Airbnb turnover, apartment cleaning in Copenhagen. Eco-certified Svanemærket products. 6 dedicated owners. Book online today!',
  keywords: 'Office cleaning Copenhagen, Kontorrengøring København, Apartment cleaning Copenhagen, Lejlighedsrengøring København, Airbnb cleaning Copenhagen, professional cleaning service, rengøring København, Hexaren, trapperengøring, vinduespolering',
  openGraph: {
    title: 'Hexaren Rengøring | Premium Cleaning Services Copenhagen',
    description: 'Professional office cleaning, Airbnb turnover, and apartment cleaning services in Copenhagen. Eco-certified, reliable, 6 owners personally invested.',
    type: 'website',
    locale: 'en_DK',
    alternateLocale: 'da_DK',
    siteName: 'Hexaren ApS'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
