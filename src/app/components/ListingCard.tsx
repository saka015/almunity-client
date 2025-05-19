import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export interface ListingCardProps {
  title: string;
  description: string;
  status: string;
  createdAt: string | Date;
  applied: number;
  price: number;
  userName: string;
  id: string;
}

export default function ListingCard({
  title,
  description,
  status,
  createdAt,
  applied,
  price,
  userName,
  id,
}: ListingCardProps) {
  return (
    <Card className="bg-slate-800 text-white border-cyan-500 hover:shadow-cyan-500/30 hover:shadow-lg transition duration-300">
      <CardContent className="flex flex-col h-full justify-between p-6 space-y-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-cyan-500 overflow-hidden ">{title}</h2>
            <Badge className={`capitalize ${status === 'active' ? 'bg-cyan-600' : 'bg-slate-600'}`}>
              {status}
            </Badge>
          </div>
          <p className="text-slate-300 line-clamp-2 mt-2">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className=" ">
            <p className="text-lg text-white font-medium">₹{price?.toLocaleString()}</p>
            <p className="text-sm text-slate-400">
              Posted {formatDistanceToNow(new Date(createdAt))} ago
            </p>
          </div>
          {/* <Link
            href={`/dashboard/explore-alumni/${userName}`}
            className="bg-slate-800 font-serif border p-2 rounded-lg border-cyan-500 text-slate-300 hover:bg-cyan-500 hover:text-slate-900"
          >
            Posted by {userName}
          </Link> */}
          <div className="flex flex-col items-end justify-end w-full">
            <p className="text-slate-400 w-full text-right">
              {applied < 3 ? (
                <span className="text-slate-200 mr-2">Be an early applicant!</span>
              ) : (
                <span>Applied by: {applied}</span>
              )}
            </p>
            <Link href={`/dashboard/tasks/${id}`} className="text-blue-400 hover:underline">
              <span className="underline cursor-pointer underline-offset-2 text-sm text-right w-full text-slate-200 hover:text-blue-300">
                Apply
              </span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
