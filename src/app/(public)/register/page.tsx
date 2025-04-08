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

export default function Register() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        // dispatch(login(data.user))
        // Redirect to OTP verification
        window.location.href = '/otp-verify';
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <Card className="w-full max-w-md shadow-lg border-emerald-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emerald-800">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to register for Alumnity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            By registering, you agree to our{' '}
            <Link href="#" className="text-emerald-800 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-emerald-800 hover:underline">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-800 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
