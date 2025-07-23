'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
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

      router.push('/otp');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="min-w-5xl 2xl:min-w-7xl max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex flex-row-reverse overflow-hidden">
        <div className="min-w-1/2 relative">
          <Image src="/login_image.avif" alt="login" fill className="object-cover" />
        </div>
        <div className="w-1/2 p-5 flex flex-col justify-center">
          <div className="space-y-3">
            <h1 className="text-center text-4xl text-white font-bold">Welcome Back</h1>
            <p className="text-sky-200/80 text-center">Sign in to your Alumnity account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 px-12">
            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                {loginError}
              </div>
            )}

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white py-6 rounded-none font-semibold text-lg text-emerald-900"
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="bg-white py-6 rounded-none font-semibold text-lg text-emerald-900 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-900 hover:text-emerald-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-800 hover:opacity-90 hover:border-emerald-900 text-white font-medium text-lg rounded-none transition-all duration-200 transform hover:text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Continue with Email'}
            </Button>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1  h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-lg rounded-none transition-all duration-200 transform hover:text-white"
                disabled={isLoading}
              >
                Google <FcGoogle />
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-lg rounded-none transition-all duration-200 transform hover:text-white"
                disabled={isLoading}
              >
                Github <FaGithub />
              </Button>
            </div>

            <div className="space-y-2 text-center pt-4">
              <p className="text-white">
                Don't have an account?{' '}
                <Link
                  href="/register"
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
