import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#52a344',
};

export const metadata: Metadata = {
  title: 'Berry De Lacreme | Fresh Artisanal Parfaits & Juices in Accra',
  description:
    'Berry De Lacreme serves premium handcrafted parfait bowls (sweetened & unsweetened) and 100% cold-pressed single juices and exotic combos, made fresh daily in Accra, Ghana.',
  keywords: [
    'parfait Accra',
    'fresh juice Accra',
    'healthy food Ghana',
    'Berry De Lacreme',
    'yogurt parfait',
    'cold pressed juice',
    'fruit parfait Ghana',
  ],
  authors: [{ name: 'Berry De Lacreme' }],
  creator: 'Berry De Lacreme',
  metadataBase: new URL('https://berrydelacream.web.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://berrydelacream.web.app',
    siteName: 'Berry De Lacreme',
    title: 'Berry De Lacreme | Fresh Artisanal Parfaits & Juices',
    description:
      'Premium handcrafted parfaits and 100% natural cold-pressed juices, made fresh daily in Accra, Ghana.',
    images: [
      {
        url: '/images/hero_parfait.png',
        width: 1200,
        height: 630,
        alt: 'Berry De Lacreme – Fresh Parfait',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berry De Lacreme | Fresh Artisanal Parfaits & Juices',
    description: 'Premium handcrafted parfaits and cold-pressed juices, made fresh daily in Accra.',
    images: ['/images/hero_parfait.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md text-on-surface bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
