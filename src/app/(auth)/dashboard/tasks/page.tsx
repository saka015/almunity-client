'use client';

import React, { useState } from 'react';
import MyTasks from './MyTasks';
import AllTasks from './AllTasks';

const page = () => {
  const [myTasks, setMyTasks] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-slate-100 w-fit inline-flex rounded overflow-hidden">
        <button
          onClick={() => setMyTasks(!myTasks)}
          className={`p-2 px-6 font-sans transition-colors ${
            !myTasks ? 'bg-slate-500 text-white' : 'hover:bg-slate-200'
          }`}
        >
          Explore Tasks
        </button>
        <button
          onClick={() => setMyTasks(!myTasks)}
          className={`p-2 px-6 font-sans transition-colors ${
            myTasks ? 'bg-slate-500 text-white' : 'hover:bg-slate-200'
          }`}
        >
          My Tasks
        </button>
      </div>

      <div>{myTasks ? <MyTasks /> : <AllTasks/>}</div>
    </div>
  );
};

export default page;
