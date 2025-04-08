import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RootState } from '@/redux/store';
export function useAuthGuard() {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      router.push('/auth/login');
    }
  }, [isAuth, router]);
}
