'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState('all-products');

  return (
    <div className="space-y-6 ">
      <div className="bg-emerald-100 w-fit inline-flex rounded overflow-hidden m-3">
        <Link
          href="/dashboard/products/all-products"
          onClick={() => setSelectedTab('all-products')}
          className={`p-2 px-6 font-sans transition-colors ${
            selectedTab === 'all-products' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-200'
          }`}
        >
          Explore Products
        </Link>
        <Link
          href="/dashboard/products/my-products"
          onClick={() => setSelectedTab('my-products')}
          className={`p-2 px-6 font-sans transition-colors ${
            selectedTab === 'my-products' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-200'
          }`}
        >
          My Products
        </Link>
      </div>
      <div className="rounded-lg">{children}</div>
    </div>
  );
};

export default Layout;
