'use client';

import { type Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'Alumnity',
//   description: 'Bridge the Campus Gap',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" data-arp="">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
          <Navbar />
          {children}
        </body>
      </html>
    </Provider>
  );
}
