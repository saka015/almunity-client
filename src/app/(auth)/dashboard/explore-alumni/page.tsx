"use client"

import React, { useState, useEffect } from 'react';
import { useExploreAlumniQuery } from '@/redux/api/user';
import AlumiCard from '@/app/components/AlumiCard';

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
  const { data: alumni, isLoading, error } = useExploreAlumniQuery({
    searchTerm: debouncedSearch,
  });

  console.log("alum", alumni);



  

  return (
    <div className="flex min-h-screen w-full flex-col gap-8">
      <h1 className="text-3xl font-bold text-cyan-100">Explore Alumni</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search for alumni..."
        className="mt-4 border border-gray-500 bg-slate-700 text-white max-w-sm rounded p-[14px] outline-none"
      />

      {isLoading ? (
        <div className="text-cyan-100">Loading...</div>
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
  );
};

export default Page;
