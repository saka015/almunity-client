import React from 'react';
import { Button } from '@/components/ui/button';
// import { useAppSelector } from '@/redux/store'

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};

const page = () => {
  // const user = useAppSelector((state) => state.auth.user)
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <Button>Logout</Button>
    </div>
  );
};

export default page;
