'use client';

import { useState, useEffect } from 'react';

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
      </div>
    </nav>
  );
}
