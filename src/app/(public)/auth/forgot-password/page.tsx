'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { setLoading } from '@/redux/features/auth-slice';
import Image from 'next/image';
import { useForgotPasswordMutation } from '@/redux/api/auth-api';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    dispatch(setLoading(true));

    try {
      await forgotPassword({ email }).unwrap();
      setSuccess('Password reset OTP sent to your email');
      if (typeof window !== 'undefined') {
        localStorage.setItem('useremail_registration', email);
        localStorage.setItem('isForgotPassword', 'true');
      }
      setTimeout(() => {
        router.push('/auth/otp');
      }, 2000);
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
      <div className="w-full max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex flex-col lg:flex-row-reverse overflow-hidden ">
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[300px] lg:min-h-full">
          <Image src="/forgot.avif" alt="forgot password" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
              Forgot Password
            </h1>
            <p className="text-sky-200/80 text-center text-sm sm:text-base">
              Enter your email to receive a password reset OTP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 px-4 sm:px-8 lg:px-12">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm ">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm ">
                {success}
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-teal-900"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-teal-800 hover:opacity-90 hover:border-teal-900 text-white font-medium text-base sm:text-lg rounded-none transition-all duration-200 transform hover:text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
            </Button>

            <div className="space-y-2 text-center pt-4">
              <p className="text-white text-sm sm:text-base">
                Remember your password?{' '}
                <Link
                  href="/auth/login"
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-white text-sm sm:text-base">
                Don't have an account?{' '}
                <Link
                  href="/auth/register"
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
