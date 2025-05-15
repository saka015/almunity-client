import React from 'react';
import { CiLinkedin } from "react-icons/ci";
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

interface AlumiCardProps {
  _id: string;
  username: string;
  name: string; // Full name like "Kamalnayan Sharma"
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
}

const AlumiCard: React.FC<AlumiCardProps> = ({
  _id,
  username,
  name,
  graduationYear,
  linkedin,
  company,
  position,
}) => {
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(linkedin, '_blank');
  };

  // Extract initials from full name
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <Link href={`/dashboard/explore-alumni/${username}`}>
      <div
        className="flex flex-col min-w-xs backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded p-6 items-center gap-6 hover:border-cyan-500 transition-transform duration-200 cursor-pointer"
      >
        <div className="w-24 h-24 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center text-3xl font-bold shadow-md">
          <Avatar>
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between items-center text-2xl mb-4">
            <h2 className="font-bold text-cyan-400 text-center">{name}</h2>
            <button onClick={handleLinkedInClick}>
              <CiLinkedin className="text-blue-400" />
            </button>
          </div>
          <p className="text-sm text-white/90 mt-1">🎓 Graduated in {graduationYear}</p>
          <p className="text-sm text-white/90 mt-1">🏢 Works at {company}</p>
          <p className="text-sm text-white/90 mt-1">💼 Working as {position}</p>
        </div>
      </div>
    </Link>
  );
};

export default AlumiCard;
