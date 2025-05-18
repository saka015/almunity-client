'use client';

import React, { useState } from 'react';
import ListingCard from '@/app/components/ListingCard';
import { useGetAllTasksQuery } from '@/redux/api/task'; // make sure this is the correct hook for "all tasks"
import Loader from '@/app/components/Loader';
import Pagination from '@/components/Pagination';

const AllTasks = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, error, isLoading, refetch } = useGetAllTasksQuery({
    search,
    page: currentPage,
    limit: itemsPerPage,
  });

  console.log('data', data);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="text-white">
      {/* Search and Refresh Section */}
      <div className="w-full flex justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a task..."
          className="border border-gray-500 bg-slate-700 text-white max-w-sm rounded p-[6px] px-3 outline-none"
        />
        <button
          onClick={() => refetch()}
          className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      {/* Task Cards */}
      {error ? (
        <p className="text-red-500">Failed to load tasks.</p>
      ) : data?.tasks?.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.tasks?.map((task: any) => (
            <ListingCard
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status || 'Open'}
              createdAt={task.createdAt}
              applied={task.applied || 0}
              price={task?.price}
              userName={task?.createdUsername}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {(data?.pagination?.totalItems || 0) > itemsPerPage && (
        <div className="mt-6">
          <Pagination
            currentPage={data?.pagination?.currentPage}
            totalPages={data?.pagination?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllTasks;
