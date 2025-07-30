'use client';

import React from 'react';
import { useGetAlumniByIdQuery } from '@/redux/api/user';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Loader from '@/app/components/Loader';
import ConnectionButton from '@/app/components/ConnectionButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const AlumniDetailsPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const params = useParams();
  const username = params.alumni as string;
  const { data: alumni, isLoading, error } = useGetAlumniByIdQuery(username);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !alumni) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-500">Failed to load alumni details</div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-full">
      <Card className="overflow-hidden border-none shadow-none rounded-none">
        <div className="relative h-48 bg-gradient-to-r from-emerald-500 to-teal-800">
          <div className="absolute -bottom-16 left-6">
            <div className="rounded-full border-4 border-white bg-white overflow-hidden">
              <Avatar className="w-28 h-28">
                <AvatarFallback className="bg-emerald-700 text-emerald-200 text-4xl ">
                  {getInitials(alumni.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="w-full justify-end items-end right-4 flex px-6 py-2">
          <ConnectionButton userId={alumni._id} />
        </div>

        <CardContent className="pt-6 border-b border-emerald-700">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">
                {alumni.name} {}
              </h1>
              <p className="text-gray-500">
                {alumni.position} at {alumni.company}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href={alumni.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin className="text-xl" />
                LinkedIn Profile
              </Link>
              <a
                href={`mailto:${alumni.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <FaEnvelope className="text-xl" />
                Contact
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              <p className="text-gray-600"> {alumni.college}</p>
              <p className="text-gray-600">Class of {alumni.graduationYear}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumniDetailsPage;
