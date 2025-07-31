'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/redux/api/auth-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { SimpleUserRegisterData } from '@/app/interface';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState<SimpleUserRegisterData>({
    name: '',
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.username.length < 5) {
      toast.error('Username must be at least 5 characters');
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await register(form).unwrap();
      toast.success('Registration successful');
      if (typeof window !== 'undefined') {
        localStorage.setItem('useremail_registration', form.email);
      }
      router.push('/otp');
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1';
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
      <div className="w-full max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex flex-col lg:flex-row overflow-hidden rounded-none">
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[300px] lg:min-h-full">
          <Image src="/login_pic.avif" alt="register" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
              Create Account
            </h1>
            <p className="text-sky-200/80 text-center text-sm sm:text-base">
              Join Alumnity and connect with your network
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 px-4 sm:px-8 lg:px-12">
            <div className="space-y-3 sm:space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-emerald-900"
                required
                minLength={5}
              />
              <Input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white py-4 sm:py-5 lg:py-6 rounded-none font-semibold text-base sm:text-lg text-emerald-900"
                required
              />
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
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -tranemerald-y-1/2 text-emerald-900 hover:text-emerald-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-emerald-800 hover:opacity-90 hover:border-emerald-900 text-white font-medium text-base sm:text-lg rounded-none transition-all duration-200 transform hover:text-white"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Continue'}
            </Button>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="flex-1 h-10 sm:h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-sm sm:text-base rounded-none transition-all duration-200 transform hover:text-white flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Google</span>
              </Button>
              <Button
                type="button"
                className="flex-1 h-10 sm:h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-sm sm:text-base rounded-none transition-all duration-200 transform hover:text-white flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Github</span>
              </Button>
            </div>

            <div className="space-y-2 text-center pt-4">
              <p className="text-sm sm:text-base text-white">
                By registering, you agree to our{' '}
                <Link
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>

              <p className="text-white text-sm sm:text-base">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
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
