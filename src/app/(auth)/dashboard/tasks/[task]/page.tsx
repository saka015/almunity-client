'use client';

import Loader from '@/app/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoMdArrowUp } from 'react-icons/io';
import { Textarea } from '@/components/ui/textarea';
import { useApplyToTaskByIdMutation, useGetTaskByIdQuery } from '@/redux/api/task';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function TaskPage() {
  const params = useParams();
  const taskId = params.task as string;
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { data: task, isLoading, error } = useGetTaskByIdQuery(taskId);
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    description: '',
  });

  const [applyToTask, { isLoading: isApplying }] = useApplyToTaskByIdMutation();

  if (isLoading) {
    return <Loader />;
  }
  if (error || !task) return notFound();

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Email is required to apply.');
      return;
    }
    try {
      await applyToTask({ taskId: task._id, formData }).unwrap();
      console.log('Application submitted successfully', formData);
      toast.success('Application submitted successfully!');
      // Optionally reset form:
      // setFormData({ title: '', email: '', description: '' });
    } catch (err: any) {
      // Add 'any' type for err or a more specific RTK Query error type
      if (err.data && err.data.message) {
        toast.error(err.data.message); // Access the message from err.data
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <main className="min-h-screen p-6 text-slate-900">
      <div className="w-full flex items-center justify-between border-b border-slate-600 text-slate-200 pb-4">
        <p className="text-3xl">{task.title}</p>
        <p className="text-base">
          Posted by{' '}
          <Link
            href={`/dashboard/explore-alumni/${task.createdUsername}`}
            className="text-cyan-600"
          >
            {task.createdUsername}
          </Link>
        </p>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-3 w-full md:min-h-[600px]">
        <div className="w-full md:w-2/3 border-b mb-4 md:border-b-0 md:border-r border-slate-600 pr-0 md:pr-4">
          <pre className="whitespace-pre-wrap text-slate-200">{task.description}</pre>
        </div>
        <div className="w-full md:w-1/3 md:pl-4">
          <div className="flex pb-4 text-slate-400">
            Price <span className="font-semibold ml-3 text-cyan-600">₹{task?.price}</span>
          </div>

          {task.createdBy === currentUser?._id ? (
            <div className="mt-1">
              <h1 className="text-slate-400 text-xl mb-2">Applicants</h1>
              {task?.applicants?.length === 0 && (
                <p className="text-slate-300 ">No applicants yet!</p>
              )}
              {task?.applicants?.map((applicant: any, index: number) => (
                <div
                  key={index}
                  className="text-slate-300 py-1 border-b border-slate-700 last:border-b-0"
                >
                  <div className="bg-slate-700 p-3  rounded-sm border border-cyan-800">
                    <div className="w-full flex justify-between">
                      <h1 className=" text-white">
                        {' '}
                        {applicant?.user?.name} (
                        <span className="italic">@{applicant?.user?.username}</span>){' '}
                      </h1>
                      <Link href={`/dashboard/explore-alumni/${applicant?.user?.username}`}>
                        <h1 className=" hover:underline cursor-pointer text-white text-sm flex items-center gap-1">
                          Visit Profile
                          <IoMdArrowUp className="rotate-45 bg-white rounded-full text-slate-800 hover:text-lg transition-all cursor-pointer" />
                        </h1>
                      </Link>
                    </div>
                    {applicant.description && (
                      <p className="text-sm mt-2">{applicant.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleApply} className="grid gap-4 py-4">
              <h2 className="text-xl text-slate-300 mb-2">Apply for this Task</h2>
              <div className="flex flex-col gap-4">
                <Input
                  id="title"
                  type="text"
                  placeholder="Portfolio/GitHub link (optional)"
                  className="col-span-3 bg-slate-700 text-white border-gray-600 placeholder-slate-400"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="col-span-3 bg-slate-700 text-white border-gray-600 placeholder-slate-400"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Textarea
                  id="desc"
                  placeholder="Why are you a good fit? *"
                  className="col-span-3 bg-slate-700 text-white border-gray-600 placeholder-slate-400"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="bg-cyan-800 hover:bg-cyan-700" disabled={isApplying}>
                {isApplying ? <Loader /> : 'Apply Now'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
