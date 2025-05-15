'use client'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserProfileQuery } from '@/redux/api/user';
import { setUser, setLoading } from '@/redux/features/auth-slice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data: userProfile, isLoading } = useGetUserProfileQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));
    
    if (userProfile) {
      dispatch(setUser(userProfile));
    }
  }, [userProfile, isLoading, dispatch]);

  return <>{children}</>;
} 