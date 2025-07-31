'use client';

import Loader from '@/app/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoMdArrowUp } from 'react-icons/io';
import { Textarea } from '@/components/ui/textarea';
import { useGetProductByIdQuery } from '@/redux/api/product';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Label } from '@/components/ui/label';
import BookingModal from './bookingModal';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(productId);
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    description: '',
  });

  if (isLoading) {
    return <Loader />
  }
  if (error || !product) return notFound();

  console.log('product', product);

  const hasUserBooked = product.bookedBy?.some(
    (booking: any) => booking.user?._id === currentUser?._id,
  );

  return (
    <main className="min-h-screen  p-6 text-emerald-900">
      <div className="w-full flex items-center justify-between border-b border-emerald-600 text-emerald-200 pb-4">
        <p className="text-3xl text-teal-800">{product.title}</p>
        <p className="text-base">
          By{' '}
          <Link
            href={`/dashboard/explore-alumni/${product.createdUsername}`}
            className="text-emerald-600"
          >
            {product.createdUsername}
          </Link>
        </p>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-3 w-full md:min-h-[600px]">
        <div className="w-full md:w-2/3 border-b mb-4 md:border-b-0 md:border-r border-emerald-600 pr-0 md:pr-4">
          <pre className="whitespace-pre-wrap text-emerald-700">{product.description}</pre>
        </div>
        <div className="w-full md:w-1/3 md:pl-4">
          <div className="flex pb-4 text-emerald-400">
            Price <span className="font-semibold ml-3 text-emerald-600">₹{product?.price}</span>
          </div>
          {product.productType === 'session' && (
            <div className="flex pb-4 text-emerald-400">
              Duration{' '}
              <span className="font-semibold ml-3 text-emerald-600">{product?.duration} mins</span>
            </div>
          )}

          <div className="flex pb-4 text-emerald-400">
            Type{' '}
            <span className="font-semibold ml-3 text-emerald-600 capitalize">
              {product?.productType}
            </span>
          </div>

          {product.createdBy._id === currentUser?._id ? (
            <div className="mt-1">
              <h1 className="text-emerald-400 text-xl mb-2">Booking Details</h1>
              {!product.bookedBy ? (
                <p className="text-emerald-300">Not booked yet!</p>
              ) : (
                <div className="text-emerald-300 py-1 border-b border-emerald-700 last:border-b-0">
                  <div className="bg-emerald-700 p-3 rounded-sm border border-emerald-800">
                    <div className="w-full flex justify-between">
                      <h1 className="text-white">
                        {product.bookedBy?.name} (
                        <span className="italic">@{product.bookedBy?.username}</span>)
                      </h1>
                      <Link href={`/dashboard/explore-alumni/${product.bookedBy?.username}`}>
                        <h1 className="hover:underline cursor-pointer text-white text-sm flex items-center gap-1">
                          Visit Profile
                          <IoMdArrowUp className="rotate-45 bg-white rounded-full text-emerald-800 hover:text-lg transition-all cursor-pointer" />
                        </h1>
                      </Link>
                    </div>
                    {product.bookedDate && (
                      <p className="text-sm mt-2">
                        Booked for: {new Date(product.bookedDate).toLocaleDateString()}
                      </p>
                    )}
                    {product.bookedTime && (
                      <p className="text-sm mt-2">Time: {product.bookedTime}:00</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form className="grid gap-4 py-4">
              <BookingModal
                title={product?.title}
                price={product?.price}
                refetch={refetch}
                productId={product?._id}
                availableDates={product?.availableDates}
                hasUserBooked={hasUserBooked}
                productType={product?.productType}
                productLink={product?.productLink}
                meetLink={product?.meetLink}
              />
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
