'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/api/auth-api';
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
import { Checkbox } from '@/components/ui/checkbox';

export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        // dispatch(login(data.user))
        // Redirect to dashboard or home
        window.location.href = '/';
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
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <Card className="w-full max-w-md shadow-lg border-emerald-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emerald-800">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your Alumnity account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="text-emerald-800 focus:ring-emerald-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm text-emerald-800 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-emerald-800 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
