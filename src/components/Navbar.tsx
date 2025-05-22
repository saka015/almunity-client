'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useLogoutMutation } from '@/redux/api/auth-api';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logout] = useLogoutMutation();

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

  const handleLogout = async () => {
    await logout({}).unwrap();
  };

  return (
    <nav className="flex justify-between items-center sticky top-0 z-50 transition-all duration-300 py-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <span className="text-4xl font-raleway font-bold text-white">Alumnity</span>
        </div>

        {/* <Button onClick={handleLogout}>Logout</Button> */}
      </div>
    </nav>
  );
}
