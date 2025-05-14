'use client';

import React, { useState } from 'react';
import CreateTask from './create-task/create-task-dialog';
import { useGetMyTasksQuery } from '@/redux/api/task';
import Loader from '@/app/components/Loader';
import Pagination from '@/components/Pagination';

const Page = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useGetMyTasksQuery({
    search,
    page: currentPage,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return <Loader />;
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 text-white">
      <div className="w-full flex justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a task..."
          className="border border-gray-500 bg-slate-700 text-white max-w-sm rounded p-[4px] px-2 outline-none"
        />
        <CreateTask refetch={refetch} />
      </div>

      <div className="overflow-x-auto rounded border border-gray-500">
        <table className="min-w-full table-auto text-left bg-slate-800">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 py-3 border-b border-gray-500">Title</th>
              <th className="px-4 py-3 border-b border-gray-500">Created At</th>
              <th className="px-4 py-3 border-b border-gray-500">Applied</th>
              <th className="px-4 py-3 border-b border-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 border-b border-gray-500 text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 border-b border-gray-500 text-center">
                  Error loading tasks
                </td>
              </tr>
            ) : (
              data?.tasks.map((task) => (
                <tr key={task._id} className="hover:bg-slate-600">
                  <td className="px-4 py-3 border-b border-gray-500 capitalize">{task.title}</td>
                  <td className="px-4 py-3 border-b border-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-500">{task.applied || 0}</td>
                  <td className="px-4 py-3 border-b border-gray-500 text-green-400 capitalize">
                    {task.status || 'Open'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(data?.tasks?.length || 0) > 9 && data?.pagination && (
        <Pagination
          currentPage={data?.pagination?.currentPage}
          totalPages={data?.pagination?.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Page;
