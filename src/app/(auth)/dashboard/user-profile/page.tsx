'use client';

import React, { useState } from 'react';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '@/redux/api/user';
import Image from 'next/image';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetMyAppliedJobsQuery, useGetMyTasksQuery } from '@/redux/api/task';

const UserProfilePage = () => {
  const { data: profile, isLoading, error } = useGetUserProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const { data } = useGetMyAppliedJobsQuery();

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
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'graduationYear' ? parseInt(value) || 0 : value,
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
        <div className="text-center text-red-500">Failed to load profile details</div>
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

  console.log('data>jobs', data);

  return (
    <div className="min-h-screen">
      <div className="overflow-hidden rounded-none">
        <div className="relative h-48 bg-gradient-to-r from-teal-500 to-emerald-800">
          <div className="absolute -bottom-16 left-6">
            <div className="rounded-full border-4 border-white bg-emerald-500 overflow-hidden">
              {profile.profilePicture ? (
                <Image src={profile.profilePicture} alt={profile.name} width={112} height={112} />
              ) : (
                <Avatar className="w-28 h-28">
                  <AvatarFallback className="bg-emerald-700 text-emerald-200 text-4xl ">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
        <div className="w-full justify-end items-end right-4 flex px-6 py-2 bg-emerald-50">
          {isEditing ? (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                className="rounded bg-gradient-to-r from-emerald-500 to-emerald-800"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              className="rounded bg-gradient-to-r from-emerald-500 to-emerald-800"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>

        <div className="bg-emerald-50 px-6">
          <div className="space-y-4 pt-10">
            <div>
              <div className="flex gap-1 items-end">
                <h1 className="text-3xl font-bold flex">{profile.name} </h1>
                <span className="text-xs items-end flex-end text-gray-500">
                  (@{profile.username})
                </span>
              </div>

              <div className="text-gray-500 mt-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      className="bg-white w-fit"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Position"
                    />
                    <span>at</span>
                    <Input
                      className="bg-white w-fit"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                    />
                  </div>
                ) : profile.position && profile.company ? (
                  `${profile.position} at ${profile.company}`
                ) : profile.position ? (
                  profile.position
                ) : profile.company ? (
                  profile.company
                ) : null}
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
              ) : profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin className="text-xl" />
                  LinkedIn Profile
                </a>
              ) : null}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <FaEnvelope className="text-xl" />
                  Contact
                </a>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Account Details</h2>
              <div className="space-y-2">
                {isEditing ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input
                      className="bg-white w-fit"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">Email: {profile.email || 'Not provided'}</p>
                )}
                <p className="text-gray-600 ">
                  Verification Status:{' '}
                  <span className="text-green-600 px-1 rounded-3xl">
                    {profile.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {isEditing ? (
                <Input
                  className="bg-white w-fit"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Graduation Year"
                />
              ) : (
                <p className="text-gray-600">
                  {profile.graduationYear
                    ? `Class of ${profile.graduationYear}`
                    : 'Graduation year not provided'}
                </p>
              )}
            </div>
            <div className="pb-7">
              <h2 className="text-xl font-semibold mb-2">Account Created</h2>
              <p className="text-gray-600">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="overflow-x-auto shadow-md mt-2">
        <table className="min-w-full divide-y divide-emerald-600 bg-teal-800 text-white">
          <thead className="bg-teal-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-600">
            {data?.map((task: any) => (
              <tr key={task._id} className="hover:bg-emerald-700 transition">
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-sm font-semibold rounded bg-emerald-600 text-white capitalize">
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">₹{task.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {new Date(task.dueDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 underline underline-offset-4 cursor-not-allowed ">
                  Mark Complete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default UserProfilePage;
