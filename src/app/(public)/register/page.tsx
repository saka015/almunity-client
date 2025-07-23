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

  return (
    <div className=" flex items-center justify-center h-screen p-4 ">
      <div className="min-w-5xl 2xl:min-w-7xl max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex overflow-hidden">
        <div className="min-w-1/2 relative">
          <Image src="/login_pic.avif" alt="register" fill className="object-cover" />
        </div>
        <div className="w-1/2 p-5 flex flex-col justify-center">
          <div className="space-y-3">
            <h1 className="text-center text-4xl text-white font-bold">Create Account</h1>
            <p className="text-sky-200/80 text-center">
              Join Alumnity and connect with your network
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 px-12">
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="bg-white py-6 rounded-none font-semibold text-lg text-emerald-900"
                required
                minLength={5}
              />
              <Input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white py-6 rounded-none font-semibold text-lg text-emerald-900"
                required
              />
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
                  minLength={6}
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
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Continue'}
            </Button>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1  h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-lg rounded-none transition-all duration-200 transform hover:text-white"
                disabled={loading}
              >
 Google <FcGoogle />
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-lg rounded-none transition-all duration-200 transform hover:text-white"
                disabled={loading}
              >
                Github <FaGithub />
              </Button>
            </div>

            <div className="space-y-2 text-center pt-4">
              <p className="text-sm text-white">
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

              <p className="text-white">
                Already have an account?{' '}
                <Link
                  href="/login"
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
