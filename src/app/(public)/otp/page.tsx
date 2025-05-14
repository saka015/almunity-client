"use client"

import React, { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import { useVerifyOtpMutation, useResendOtpMutation } from '@/redux/api/auth-api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth-slice';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = localStorage.getItem("useremail_registration");
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
      otpLength: otp.length
    });

    try {
      const response = await verifyOtp({
        email,
        otp: otp
      }).unwrap();
      
      console.log('Server response:', response);

      toast.success(response?.message || 'OTP verified successfully');
      localStorage.removeItem("useremail_registration");
      setOtp('');
      router.push('/explore-alumi');
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
    <div className="min-h-screen flex items-center justify-center p-4 pb-44">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm shadow-xl p-8 rounded-lg">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Verify Your Email
          </h1>
          <p className="text-sky-200/80">
            Please enter the verification code sent to your email
          </p>
          
          <div className="my-8">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={handleOtpChange}
              className="gap-2"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot 
                  index={0} 
                  className="bg-slate-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                />
                <InputOTPSlot 
                  index={1} 
                  className="bg-slate-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                />
                <InputOTPSlot 
                  index={2} 
                  className="bg-slate-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                />
                <InputOTPSlot 
                  index={3} 
                  className="bg-slate-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                />
                <InputOTPSlot 
                  index={4} 
                  className="bg-slate-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                />
                <InputOTPSlot 
                  index={5} 
                  className="bg-slate-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex gap-4 justify-center">
            <Button 
              className="bg-slate-700 hover:bg-slate-600 text-sky-200 border-sky-200/20 transition-all duration-200"
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>

            <Button 
              className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white font-medium transition-all duration-200" 
              onClick={handleVerify}
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;