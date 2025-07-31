'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { setLoading } from '@/redux/features/auth-slice';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { useResetPasswordMutation } from '@/redux/api/auth-api';
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const email =
    typeof window !== 'undefined' ? localStorage.getItem('useremail_registration') : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email not found. Please try the forgot password process again.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    dispatch(setLoading(true));

    try {
      await resetPassword({ email, newPassword: form.password }).unwrap();
      toast.success('Password reset successfully');

      if (typeof window !== 'undefined') {
        localStorage.removeItem('useremail_registration');
        localStorage.removeItem('isForgotPassword');
        localStorage.removeItem('isOTPVerified');
      }

      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
      <div className="w-full max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex flex-col lg:flex-row-reverse overflow-hidden ">
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[300px] lg:min-h-full">
          <Image src="/forgot.avif" alt="reset password" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
              Reset Password
            </h1>
            <p className="text-sky-200/80 text-center text-sm sm:text-base">
              Enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 px-4 sm:px-8 lg:px-12">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm ">
                {error}
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-teal-900 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-900 hover:text-teal-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-teal-900 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-900 hover:text-teal-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-teal-800 hover:opacity-90 hover:border-teal-900 text-white font-medium text-base sm:text-lg rounded-none transition-all duration-200 transform hover:text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
