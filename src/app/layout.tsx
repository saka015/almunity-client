'use client'

import { Geist, Geist_Mono } from 'next/font/google';
import { Raleway } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'react-hot-toast';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" data-arp="">
        <body className="antialiased bg-gradient-to-br from-slatemin-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
          {/* <Navbar /> */}
          {children}
        </body>
      </html>
    </Provider>
  );
}
