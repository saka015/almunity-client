'use client';
import Link from 'next/link';
import { PiStudentLight } from 'react-icons/pi';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoRocketOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/redux/api/auth-api';
import { toast } from 'react-hot-toast';

const sidebarNav = [
  { href: '/dashboard/explore-alumni', icon: <IoRocketOutline size={24} />, title: 'Explore' },
  { href: '/dashboard/user-profile', icon: <CiUser size={24} />, title: 'Profile' },
  // { href: '/dashboard/tasks', icon: <FaTasks size={24} />, title: 'Tasks' },
  { href: '/dashboard/connections', icon: <BsPeople size={24} />, title: 'Connections' },
  { href: '/dashboard/chat', icon: <IoChatbubbleEllipsesOutline size={24} />, title: 'Chat' },
  { href: '/dashboard/products', icon: <AiOutlineProduct size={24} />, title: 'Products' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
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
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="hidden w-[12%] border-r border-teal-700 p-5 xl:flex flex-col transition-all duration-300">
        <div className="flex items-center justify-between mb-12">
          <h1 className="flex gap-1 items-center text-teal-950 text-3xl font-bold">
            <PiStudentLight className="font-bold text-5xl texdt-teal-700" />
            Alumnity
          </h1>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-2">
            {sidebarNav.map(({ href, title, icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex w-full items-center rounded-lg gap-3 px-5 py-3 !font-semibold text-xl transition-colors text-teal-700 ${
                    isActive ? ' bg-teal-800 text-white !font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  {icon}
                  {title}
                </Link>
              );
            })}
          </div>
          <Button
            onClick={() => {
              logout({})
                .unwrap()
                .then(() => {
                  toast.success('Logged out successfully');
                  router.push('/');
                })
                .catch((error) => {
                  toast.error('Failed to logout');
                });
            }}
            variant="outline"
            className=" text-teal-700 border-teal-700"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className=" bg-white flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
