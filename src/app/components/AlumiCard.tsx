import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { CiLinkedin } from "react-icons/ci";
import Link from 'next/link';

interface AlumiCardProps {
  username: string;
  name: string;
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
}

const AlumiCard: React.FC<AlumiCardProps> = ({
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

  return (
    <Link href={`/dashboard/explore-alumni/${username}`}>
      <div className="flex flex-col min-w-xs backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded p-6 items-center gap-6 hover:border-cyan-500 transition-transform duration-200 cursor-pointer">
        <img
          src="https://avatar.iran.liara.run/public"
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500 shadow-md"
        />
        <div className="flex flex-col justify-center w-full">
          <div className='flex justify-between items-center text-2xl mb-4'>
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