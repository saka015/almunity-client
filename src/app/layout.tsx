// Instead use CSS for the scroll effect
// Add this to your globals.css:
/*
.navbar {
  transition: background-color 0.3s, padding 0.3s;
  background-color: transparent;
  padding: 1rem 0;
}

.navbar.scrolled {
  background-color: white;
  padding: 0.5rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
*/

// Then use data attributes and JavaScript in a separate client component
// This approach would keep your layout.tsx as a server component

import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alumnity',
  description: 'Bridge the Campus Gap',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-arp="">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
