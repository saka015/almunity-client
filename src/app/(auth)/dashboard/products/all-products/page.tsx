'use client';

import { useGetAllProductsQuery } from '@/redux/api/product';
import React from 'react';
import Loader from '@/app/components/Loader';
import { format } from 'date-fns';
import { Product } from '@/redux/api/product';
import Link from 'next/link';

interface ProductResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const ProductsPage = () => {
  const { data, isLoading, error } = useGetAllProductsQuery({
    search: '',
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading products. Please try again later.
      </div>
    );
  }

  const productData = data as ProductResponse;
  function toKebabCase(input: string): string {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  }
  return (
    <div className="space-y-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
        {productData?.products?.map((product: Product) => (
          <div
            key={product._id}
            className=" rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-emerald-800 hover:border-emerald-600 flex flex-col"
          >
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-2 text-teal-800">{product.title}</h3>
              <p className="text-emerald-700 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex flex-col space-y-2 flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-emerald-400">₹{product.price}</span>
                  <span className="text-sm text-emerald-400">{product.duration} mins</span>
                </div>
                <div className="flex justify-between items-center text-sm text-emerald-400">
                  {/* <span>By {product.createdUsername}</span> */}

                  <span
                    className={`${
                      product.productType !== 'product' ? 'bg-gray-700' : 'bg-stone-500'
                    } p-0.5 rounded-xl text-white px-2 capitalize`}
                  >
                    {product.productType}
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <Link
                    href={`/dashboard/products/all-products/${product.createdUsername}/${toKebabCase(product.title)}/${product._id}`}
                    className="flex justify-center w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-md transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productData?.products?.length === 0 && (
        <div className="text-center text-emerald-400 py-8">No products found</div>
      )}
    </div>
  );
};

export default ProductsPage;
