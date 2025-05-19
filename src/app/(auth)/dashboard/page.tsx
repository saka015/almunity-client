'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/explore-alumni');
  }, [router]);

  return null;
}
