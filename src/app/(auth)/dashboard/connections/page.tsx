"use client"

import { useGetMyConnectionsQuery } from '@/redux/api/user';
import React from 'react'

const page = () => {


  const { data } = useGetMyConnectionsQuery({
    status:"accepted"
  });

  console.log("pending",data)

  return (
    <div>
      test
    </div>
  )
}

export default page
