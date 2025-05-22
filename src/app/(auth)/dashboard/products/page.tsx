'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProductsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/products/all-products');
  }, [router]);

  return null;
}
