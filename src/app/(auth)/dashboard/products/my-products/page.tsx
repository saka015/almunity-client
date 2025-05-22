import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <Link
        href={'/dashboard/products/my-products/create-new-product'}
        className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
      >
        Add New Product
      </Link>
      my
    </div>
  );
};

export default page;
