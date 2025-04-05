import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center md:justify-normal sm:pt-24 md:pt-72 min-h-screen">
      <div className="flex flex-col items-center gap-1 md:gap-4">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-inter text-emerald-800">
          Bridge the Campus Gap
        </h1>
        <p className="text-2xl sm:text-3xl md:text-5xl font-gilroy font-bold">
          Connect. Learn. Grow.
        </p>
        <Button className="mt-8 w-56 py-6 rounded-full bg-emerald-800 text-white">
          Get Started
        </Button>
      </div>
    </div>
  );
}
