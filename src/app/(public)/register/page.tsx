'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/redux/api/auth-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { UserRegisterData } from '@/app/interface';
import { useRouter } from 'next/navigation';

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState<UserRegisterData>({
    name: '',
    email: '',
    password: '',
    username: '',
    linkedin: '',
    position: '',
    company:'',
    graduationYear: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);

  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.username.length < 5) {
      toast.error("Username must be at least 5 characters");
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{3,100}\/?$/;
    if (!linkedinRegex.test(form.linkedin)) {
      toast.error("Please enter a valid LinkedIn profile URL (e.g. https://www.linkedin.com/in/username/)");
      return;
    }

    setLoading(true);
    try {
      const response = await register(form).unwrap();
      toast.success('Registration successful');
      localStorage.setItem("useremail_registration", form.email);
      router.push("/otp");
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-44">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm shadow-xl p-8 rounded-lg">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sky-200/80 text-center">
            Join Alumnity and connect with your network
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
              minLength={5}
            />
            <Input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
            />
            <Input
              type="url"
              placeholder="LinkedIn Profile URL"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
              pattern="^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{3,100}\/?$"
            />
            <Input
              type="text"
              placeholder="Company/College"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
              pattern="^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{3,100}\/?$"
            />
            <Input
              type="text"
              placeholder="Position (e.g. SDE , if you are student, fill Student)"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
              pattern="^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{3,100}\/?$"
            />
            <Input
              type="number"
              placeholder="Graduation Year (e.g. 2025)"
              value={form.graduationYear || ''}
              onChange={(e) => setForm({ ...form, graduationYear: Number(e.target.value) })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-slate-900/50 border-sky-200/20 text-sky-100 placeholder:text-sky-400/50 focus:border-cyan-400 focus:ring-cyan-400/20 h-12"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white font-medium text-lg rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          <div className="space-y-4 text-center pt-4">
            <p className="text-sm text-sky-200/60">
              By registering, you agree to our{' '}
              <Link href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Privacy Policy
              </Link>
            </p>
            
            <p className="text-sky-200/80">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
