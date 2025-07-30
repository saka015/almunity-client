import React from 'react';
import { Button } from '@/components/ui/button';
import { CiLinkedin } from 'react-icons/ci';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

interface ConnectCardProps {
  username: string;
  name: string;
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
  onAccept?: () => void;
  onReject?: () => void;
  disabled?: boolean;
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
  disabled = false,
}) => {
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(linkedin, '_blank');
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className="flex flex-col min-w-xs backdrop-blur-md bg-white/10 border border-teal-800/30 shadow-2xl rounded-lg p-6 items-center gap-6 hover:border-teal-500 hover:bg-teal-50/20 transition-all duration-200">
      <div className="w-24 h-24 rounded-full bg-teal-700 text-teal-100 flex items-center justify-center text-3xl font-bold shadow-lg">
        <Avatar>
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col justify-center w-full">
        <div className="flex justify-between items-center text-2xl mb-4">
          <h2 className="font-bold text-teal-800 text-center">{name}</h2>
          <button onClick={handleLinkedInClick} className="hover:text-teal-600 transition-colors">
            <CiLinkedin className="text-blue-500 text-2xl" />
          </button>
        </div>
        <p className="text-sm font-semibold text-teal-700 mt-1">🎓 {graduationYear}</p>
        <p className="text-sm text-teal-600 mt-1">🏢 {company}</p>
        <p className="text-sm text-teal-600 mt-1">💼 {position}</p>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={onAccept}
            disabled={disabled}
            className="flex-1 bg-teal-700 hover:bg-teal-600 transition-colors"
          >
            Accept
          </Button>
          <Button
            onClick={onReject}
            disabled={disabled}
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
