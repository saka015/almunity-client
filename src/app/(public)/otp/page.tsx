'use client';

import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { useVerifyOtpMutation, useResendOtpMutation } from '@/redux/api/auth-api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth-slice';
import { UserProfile } from '@/redux/api/user';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email =
    typeof window !== 'undefined' ? localStorage.getItem('useremail_registration') : null;
  const [otp, setOtp] = useState('');
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const handleVerify = async () => {
    if (!email) {
      toast.error('Email not found. Please register again.');
      router.push('/register');
      return;
    }

    console.log('Sending verification request with:', {
      email,
      otp,
      otpLength: otp.length,
    });

    try {
      const response = await verifyOtp({
        email,
        otp: otp,
      }).unwrap();

      if (response.user) {
        const userProfile: UserProfile = {
          _id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          username: response.user.username,
          role: response.user.role,
          isVerified: response.user.isVerified,
          graduationYear: 0,
          linkedin: '',
          company: '',
          position: '',
          calendly: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        };
        dispatch(setUser(userProfile));
      }

      toast.success(response?.message || 'OTP verified successfully');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('useremail_registration');
      }
      setOtp('');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Verification error:', error);
      toast.error(error?.data?.message || 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Email not found. Please register again.');
      router.push('/register');
      return;
    }

    try {
      const response = await resendOtp({ email }).unwrap();
      toast.success(response.message || 'OTP resent successfully');
      setOtp('');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to resend OTP');
    }
  };

  const handleOtpChange = (value: string) => {
    console.log('OTP value changed:', value);
    setOtp(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
      <div className="w-full max-w-7xl min-h-[70vh] bg-teal-950 shadow-xl flex flex-col lg:flex-row overflow-hidden rounded-none">
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[300px] lg:min-h-full">
          <Image src="/otp.avif" alt="otp" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
              Verify Your Email
            </h1>
            <p className="text-sky-200/80 text-center text-sm sm:text-base">
              Please enter the verification code sent to your email
            </p>
          </div>

          <div className="mt-6 sm:mt-8 space-y-6 px-4 sm:px-8 lg:px-12">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                className="gap-2 sm:gap-3"
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  <InputOTPSlot
                    index={0}
                    className="bg-white border-emerald-200 text-emerald-900 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-lg sm:text-xl font-bold rounded-none"
                  />
                  <InputOTPSlot
                    index={1}
                    className="bg-white border-emerald-200 text-emerald-900 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-lg sm:text-xl font-bold rounded-none"
                  />
                  <InputOTPSlot
                    index={2}
                    className="bg-white border-emerald-200 text-emerald-900 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-lg sm:text-xl font-bold rounded-none"
                  />
                  <InputOTPSlot
                    index={3}
                    className="bg-white border-emerald-200 text-emerald-900 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-lg sm:text-xl font-bold rounded-none"
                  />
                  <InputOTPSlot
                    index={4}
                    className="bg-white border-emerald-200 text-emerald-900 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-lg sm:text-xl font-bold rounded-none"
                  />
                  <InputOTPSlot
                    index={5}
                    className="bg-white border-emerald-200 text-emerald-900 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-lg sm:text-xl font-bold rounded-none"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="flex-1 h-10 sm:h-12 bg-white hover:opacity-90 hover:border-emerald-900 text-emerald-900 font-medium text-sm sm:text-base rounded-none transition-all duration-200 transform hover:text-white"
                onClick={handleResendOtp}
              >
                Resend OTP
              </Button>

              <Button
                className="flex-1 h-10 sm:h-12 bg-emerald-800 hover:opacity-90 hover:border-emerald-900 text-white font-medium text-sm sm:text-base rounded-none transition-all duration-200 transform hover:text-white"
                onClick={handleVerify}
                disabled={otp.length !== 6}
              >
                Verify OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
