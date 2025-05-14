'use client';

import React from 'react';
import { FaUserPlus } from "react-icons/fa6";
import { useGetAlumniByIdQuery, useSendConnectionRequestMutation } from '@/redux/api/user';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loader from '@/app/components/Loader';
import toast from 'react-hot-toast';

const AlumniDetailsPage = () => {
  const params = useParams();
  const username = params.alumni as string;
  const { data: alumni, isLoading, error } = useGetAlumniByIdQuery(username);
  const [sendConnectioRequest] = useSendConnectionRequestMutation({
  
  })

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (error || !alumni) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-500">
          Failed to load alumni details
        </div>
      </div>
    );
  }

const sendRequest = async () => {
  try {
    await sendConnectioRequest({ receiverId: alumni._id }).unwrap();
  toast.success("Request sent!")
  } catch (error) {
    console.error('Failed to send connection request:', error);
  toast.error("Failed request!")

    // Optional: Show error message to user
  }
};



  return (
    <div className="container mx-auto">
      <Card className="overflow-hidden rounded">
        <div className="relative h-48 bg-gradient-to-r from-slate-500 to-cyan-800">
          <div className="absolute -bottom-16 left-6">
            <div className="rounded-full border-4 border-white bg-white overflow-hidden">
              <Image
                src='https://avatar.iran.liara.run/public'
                alt={alumni.name}
                width={120}
                height={120}
                className="object-cover"
              />
            </div>
            </div>
                  
        </div>
              <div className='w-full justify-end items-end right-4 flex px-6 py-2'>
          <Button
            onClick={sendRequest}
                      className='rounded bg-gradient-to-r from-slate-500 to-cyan-800 flex items-center justify-center'>Connect <FaUserPlus /></Button>
            </div>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{alumni.name} {}</h1>
              <p className="text-gray-500">{alumni.position} at {alumni.company}</p>
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
