'use client';

import { useState, useRef, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

export default function OtpVerify() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d*$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 4).split('');
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      if (index < 4) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    // Focus the appropriate input after paste
    if (digits.length < 4) {
      inputRefs[digits.length].current?.focus();
    } else {
      inputRefs[3].current?.focus();
    }
  };

  const handleResendOtp = () => {
    setResendDisabled(true);
    setCountdown(30);
    // API call to resend OTP
    // ...
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 4) return;

    setLoading(true);
    try {
      // API call to verify OTP
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ otp: otpValue }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        // Redirect to dashboard or home
        router.push('/');
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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <Card className="w-full max-w-md shadow-lg border-emerald-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emerald-800">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a 4-digit code to your email address. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 text-center text-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white"
              disabled={loading || otp.some((digit) => !digit)}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <div className="text-sm text-gray-500">Didn't receive the code?</div>
          <Button
            variant="link"
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className="text-emerald-800"
          >
            {resendDisabled ? `Resend code in ${countdown}s` : 'Resend code'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
