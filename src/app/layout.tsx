import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BetGenie - AI-Powered Bet Predictions',
  description: 'Rub the Lamp. Win the Odds. Daily free AI tips, smart accumulators, and beat the bookies with 78% accuracy.',
  keywords: 'betting tips, AI predictions, accumulators, Nigerian bettors, sports betting',
  openGraph: {
    title: 'BetGenie - AI-Powered Bet Predictions',
    description: 'Daily free AI tips, smart accumulators, and beat the bookies',
    type: 'website',
    locale: 'en_NG',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A1428" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-primary-navy text-neutral-white antialiased">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
