import React from 'react';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <button className="text-xl !font-bold bg-teal-700 text-white px-20 py-4 rounded-lg hover:bg-teal-700 transition-colors">
        Hackathons
      </button>
      <button className="text-xl !font-bold bg-lime-950 text-white px-20 py-4 rounded-lg hover:bg-lime-400 transition-colors">
        Hackathons
      </button>
      <button className="text-xl !font-bold bg-teal-800 text-white px-20 py-4 rounded-lg hover:bg-teal-700 transition-colors">
        Hackathons
      </button>
      <button className="text-xl !font-bold bg-slate-600 text-white px-20 py-4 rounded-lg hover:bg-slate-500 transition-colors">
        Hackathons
      </button>
      <button className="text-xl !font-bold bg-blue-600 text-white px-20 py-4 rounded-lg hover:bg-slate-700 transition-colors">
        Hackathons
      </button>
      <Button>Hackathons</Button>
      <Button variant="outline">Hackathons</Button>
      <Button variant="secondary">Hackathons</Button>
      <Button variant="ghost">Hackathons</Button>
      <Button variant="link">Hackathons</Button>
    </div>
  );
};

export default page;
