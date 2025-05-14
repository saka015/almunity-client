import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

const Loader = () => {
  return (
  <div className='w-[90%] h-screen flex justify-center items-center'>
    <TbLoader3 className="animate-spin text-4xl text-slate-200" />;
  </div>)
}

export default Loader
