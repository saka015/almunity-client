'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoRocketOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';
import { LuArrowLeftToLine } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { CiLogout } from 'react-icons/ci';

const sidebarNav = [
  { href: '/dashboard/explore-alumni', icon: <IoRocketOutline size={24} />, title: 'Explore' },
  { href: '/dashboard/user-profile', icon: <CiUser size={24} />, title: 'Profile' },
  { href: '/dashboard/tasks', icon: <CiUser size={24} />, title: 'Tasks' },
  { href: '/dashboard/connections', icon: <BsPeople size={24} />, title: 'Connections' },
  { href: '/dashboard/chat', icon: <IoChatbubbleEllipsesOutline size={24} />, title: 'Chat' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`bg-slate-900 border-r border-gray-500 p-5 flex flex-col transition-all duration-300 ${
          isOpen ? 'w-[15%]' : 'w-[6%]'
        }`}
      >
        <div className="flex items-center justify-between mb-12">
          {isOpen && <h1 className="text-slate-300 text-2xl font-semibold">Alumnity</h1>}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white ml-2 mt-2">
            {isOpen ? (
              <LuArrowLeftToLine className="text-slate-400" size={24} />
            ) : (
              <HiMenu size={24} />
            )}
          </button>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-3">
            {sidebarNav.map(({ href, title, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex w-fit items-center gap-3 rounded p-2 text-lg transition-colors border hover:border-cyan-700 ${
                    isActive
                      ? ' bg-slate-800 text-white border'
                      : 'text-slate-300 hover:text-white border-transparent'
                  } ${isOpen ? 'min-w-40' : ''} `}
                >
                  <span>{icon}</span>
                  {isOpen && <span className="hidden lg:block">{title}</span>}
                </Link>
              );
            })}
          </div>

          {/* Spacer to push logout to bottom */}
          {/* <div className="flex-grow max-h-88" /> */}

          {/* Logout button */}
          <Button
            // onClick={handleLogout}
            className={`flex !font-sans font-light w-fit text-left  items-center gap-3 rounded p-2 pr-3 py-5 text-lg transition-colors border  border-cyan-700 
    hover:bg-slate-800 text-slate-400 bg-transparent border-dotted 
    ${isOpen ? 'min-w-40' : ''}`}
          >
            <span>
              <CiLogout />
            </span>
            {isOpen && (
              <span className="hidden lg:block !font-sans font-light text-left ">Logout</span>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-800 p-5">{children}</div>
    </div>
  );
}
