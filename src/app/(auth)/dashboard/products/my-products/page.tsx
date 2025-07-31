import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Link
        href={'/dashboard/products/my-products/create-new-product'}
        className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Add New Product
      </Link>
      
    </div>
  );
};

export default page;
