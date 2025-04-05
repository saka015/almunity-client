'use client';

import { useState, useEffect } from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Call once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`flex justify-between items-center sticky top-0 z-50 transition-all duration-300 py-6 ${
        scrolled ? 'bg-emerald-800 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <span
            className={`text-4xl font-display font-bold ${
              !scrolled ? 'text-emerald-800' : 'text-white'
            }`}
          >
            Alumnity
          </span>
        </div>

        <header className="flex justify-end items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className={`px-4 py-2 rounded-lg ${
                  scrolled ? 'text-emerald-800 hover:bg-emerald-50' : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </header>
      </div>
    </nav>
  );
}
