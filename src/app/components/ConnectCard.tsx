import React from 'react';
import { Button } from '@/components/ui/button';
import { CiLinkedin } from 'react-icons/ci';
import Image from 'next/image';

interface ConnectCardProps {
  username: string;
  name: string;
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const ConnectCard: React.FC<ConnectCardProps> = ({
  username,
  name,
  graduationYear,
  linkedin,
  company,
  position,
  onAccept,
  onReject,
}) => {
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(linkedin, '_blank');
  };

  return (
    <div className="flex flex-col min-w-xs backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-sm rounded p-6 items-center gap-6 shadow-cyan-500 transition-transform duration-200">
      <Image
        width={100}
        height={100}
        src="https://avatar.iran.liara.run/public"
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500 shadow-md"
      />
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

        <div className="flex gap-2 mt-4">
          <Button onClick={onAccept} className="flex-1 bg-cyan-500 hover:bg-cyan-600">
            Acceptrrrr
          </Button>
          <Button
            onClick={onReject}
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;
