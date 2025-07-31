import React from 'react';
import { CiLinkedin } from 'react-icons/ci';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface AlumiCardProps {
  _id: string;
  username: string;
  name: string;
  graduationYear: number;
  company: string;
  position: string;
  profilePicture: string;
}

const AlumiCard: React.FC<AlumiCardProps> = ({
  _id,
  username,
  name,
  graduationYear,
  company,
  position,
  profilePicture,
}) => {

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <Link href={`/dashboard/explore-alumni/${username}`}>
      <div className="flex flex-col min-w-xs backdrop-blur-md bg-white/10 border border-teal-800/30  rounded-lg p-6 items-center gap-6 hover:border-teal-500 hover:bg-teal-50/20 transition-all duration-200 cursor-pointer">
        <div className="w-24 h-24 rounded-full bg-teal-700 text-teal-100 flex items-center justify-center text-3xl font-bold">
          {profilePicture ? (
            <Image src={profilePicture} alt={name} width={96} height={96} className="rounded-full" />
          ) : (
          <Avatar>
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          )}
        </div>

        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between items-center text-2xl">
            <h2 className="font-bold text-teal-800 text-center">{name}</h2>
          <p className="text-sm font-semibold text-teal-700 mt-1">🎓 {graduationYear}</p>
          </div>
        </div>
        <Button className="w-full bg-teal-700 text-white hover:bg-teal-600 transition-colors">
View Profile
          </Button>
      </div>
    </Link>
  );
};

export default AlumiCard;


// 6881379a7c3c6ce4830b5f67
// 6881379a7c3c6ce4830b5f67