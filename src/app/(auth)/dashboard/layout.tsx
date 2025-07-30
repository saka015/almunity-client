'use client';
import Link from 'next/link';
import { PiStudentLight } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoRocketOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';

const sidebarNav = [
  { href: '/dashboard/explore-alumni', icon: <IoRocketOutline size={24} />, title: 'Explore' },
  { href: '/dashboard/user-profile', icon: <CiUser size={24} />, title: 'Profile' },
  // { href: '/dashboard/tasks', icon: <FaTasks size={24} />, title: 'Tasks' },
  { href: '/dashboard/connections', icon: <BsPeople size={24} />, title: 'Connections' },
  // { href: '/dashboard/chat', icon: <IoChatbubbleEllipsesOutline size={24} />, title: 'Chat' },
  // { href: '/dashboard/products', icon: <AiOutlineProduct size={24} />, title: 'Products' },
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
    <div className="flex h-screen overflow-hidden bg-emerald-50">
      <div className="hidden w-[12%] border-r border-emerald-700 p-5 xl:flex flex-col transition-all duration-300">
        <div className="flex items-center justify-between mb-12">
          <h1 className="flex gap-1 items-center text-teal-950 text-3xl font-bold">
            <PiStudentLight className="font-bold text-5xl texdt-emerald-700" />
            Alumnity
          </h1>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-3">
            {sidebarNav.map(({ href, title, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex w-full items-center gap-3 rounded p-2 text-lg transition-colors text-emerald-700 ${
                    isActive ? ' bg-emerald-100 font-semibold' : ''
                  }`}
                >
                  {icon}
                  {title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className=" bg-white flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
