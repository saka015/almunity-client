'use client';

import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useExploreAlumniQuery } from '@/redux/api/user';
import AlumiCard from '@/app/components/AlumiCard';
import { FaSearch } from 'react-icons/fa';

const Page = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(handler); // Cleanup timeout on unmount or change
  }, [search]);

  // Query with debounced search term
  const {
    data: alumni,
    isLoading,
    error,
  } = useExploreAlumniQuery({
    searchTerm: debouncedSearch,
  });

  console.log('alum', alumni);

  if (alumni?.length === 0) {
    return (
      <div className="flex min-h-screen w-full flex-col ">
        <div className="p-7 border-b border-teal-800">
          <h1 className="text-4xl font-bold text-teal-800">Explore Alumni</h1>
        </div>
        <div className="p-7 flex flex-col items-start gap-6">
          <div className="text-red-500">No alumni found. Please re-check you graduation year.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="p-7 border-b border-teal-800">
        <h1 className="text-4xl font-bold text-teal-800">Explore Alumni</h1>
      </div>

      <div className="p-7 flex flex-col items-start gap-6">
        <div className="flex items-center w-1/3 bodrder p-4 border-emeradld-700 text-emerald-700 bg-emerald-50 rounded-4xl max-w-md ">
          <CiSearch className="font-extralight text-3xl" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Find Alumni"
            className="border-l px-2 border-emerald-500 ml-2 w-full bg-transparent outline-none placeholder:text-emerald-700 text-lg text-emerald-900"
          />
        </div>

        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center min-h-[60vh]">
            <span className="loader"></span>
          </div>
        ) : error ? (
          <div className="text-red-500">Error loading alumni data</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 2xl:grid-cols-4">
            {alumni?.map((alumnus: any) => (
              <AlumiCard
                key={alumnus._id}
                _id={alumnus._id}
                username={alumnus.username}
                name={alumnus.name}
                graduationYear={alumnus.graduationYear}
                linkedin={alumnus.linkedin}
                company={alumnus.company}
                position={alumnus.position}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
