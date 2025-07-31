'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginMutation } from '@/redux/api/auth-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { setLoading } from '@/redux/features/auth-slice';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    dispatch(setLoading(true));

    try {
      await login(form).unwrap();
      if (typeof window !== 'undefined') {
        localStorage.setItem('useremail_registration', form?.email);
      }

      router.push('/auth/otp');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1';
    window.location.href = `${baseUrl}/auth/google`;
  };

  const error = searchParams.get('error');
  const success = searchParams.get('success');

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
      <div className="w-full max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex flex-col lg:flex-row-reverse overflow-hidden ">
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[300px] lg:min-h-full">
          <Image src="/login_image.avif" alt="login" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
              Welcome Back
            </h1>
            <p className="text-sky-200/80 text-center text-sm sm:text-base">
              Sign in to your Alumnity account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 px-4 sm:px-8 lg:px-12">
            {(loginError || error) && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm ">
                {loginError || error}
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
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-emerald-900"
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-emerald-900 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-900 hover:text-emerald-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              <Link
                href="/auth/forgot-password"
                className="float-right text-emerald-100 -mt-1 mb-2 hover:text-emerald-300 font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-emerald-800 hover:opacity-90 hover:border-emerald-900 text-white font-medium text-base sm:text-lg rounded-none transition-all duration-200 transform hover:text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Continue with Email'}
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="flex-1 h-10 sm:h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-sm sm:text-base rounded-none transition-all duration-200 transform hover:text-white flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Google</span>
              </Button>
              {/* <Button
                type="button"
                className="flex-1 h-10 sm:h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-sm sm:text-base rounded-none transition-all duration-200 transform hover:text-white flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Github</span>
              </Button> */}
            </div>

            <div className="space-y-2 text-center pt-4">
              <p className="text-white text-sm sm:text-base">
                Don't have an account?{' '}
                <Link
                  href="/auth/register"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
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
