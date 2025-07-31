import { Geist, Geist_Mono } from 'next/font/google';
import { Raleway } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { metadata } from './metadata';
import ClientProviders from '@/components/ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="">
      <body className="antialiased bg-gradient-to-br from-tealmin-h-screen">
        <ClientProviders>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
