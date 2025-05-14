"use client"

import React, { useState } from 'react';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '@/redux/api/user';
import Image from 'next/image';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
  const { data: profile, isLoading, error } = useGetUserProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    graduationYear: 0,
    linkedin: '',
    company: '',
    position: '',
    calendly: '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email,
        graduationYear: profile.graduationYear,
        linkedin: profile.linkedin,
        company: profile.company,
        position: profile.position,
        calendly: profile.calendly || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'graduationYear' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(formData).unwrap();
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-500">
          Failed to load profile details
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-slate-50">
      <Card className="overflow-hidden rounded">
        <div className="relative h-48 bg-gradient-to-r from-slate-500 to-cyan-800">
          <div className="absolute -bottom-16 left-6">
            <div className="rounded-full border-4 border-white bg-white overflow-hidden">
              <Image
                src='https://avatar.iran.liara.run/public'
                alt={profile.name}
                width={120}
                height={120}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className='w-full justify-end items-end right-4 flex px-6 py-2 bg-slate-50'>
          {isEditing ? (
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                className='rounded bg-gradient-to-r from-slate-500 to-cyan-800'
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              className='rounded bg-gradient-to-r from-slate-500 to-cyan-800'
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
        
        <CardContent className=" bg-slate-50">
          <div className="space-y-4 pt-10">
            <div>
              <div className='flex gap-1 items-end'>
                  <h1 className="text-3xl font-bold flex">{profile.name}      </h1>
                <span className="text-xs items-end flex-end text-gray-500">({profile.username})</span>
            </div>

        
              <div className="text-gray-500 mt-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input className="bg-white w-fit"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Position"
                    />
                    <span>at</span>
                    <Input className="bg-white w-fit"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                    />
                  </div>
                ) : (
                  `${profile.position} at ${profile.company}`
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {isEditing ? (
                <Input 
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn URL"
                  className="w-fit bg-white"
                />
              ) : (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin className="text-xl" />
                  LinkedIn Profile
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <FaEnvelope className="text-xl" />
                Contact
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Account Details</h2>
              <div className="space-y-2">
                {isEditing ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input className="bg-white w-fit"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">Email: {profile.email}</p>
                )}
                <p className="text-gray-600 ">Verification Status: <span className='bg-green-600 text-white px-1 rounded-3xl'>{profile.isVerified ? 'Verified' : 'Not Verified'}</span></p>
              </div>
            </div>


            <div>
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {isEditing ? (
                <Input className="bg-white w-fit"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Graduation Year"
                />
              ) : (
                <p className="text-gray-600">Class of {profile.graduationYear}</p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Account Created</h2>
              <p className="text-gray-600">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
