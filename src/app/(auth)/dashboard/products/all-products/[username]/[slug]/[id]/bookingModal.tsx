'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSendPaymentOtpMutation, useVerifyPaymentOtpMutation } from '@/redux/api/product';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface BookingModalProps {
  refetch: () => void;
  price: number;
  title: string;
  productId: string;
  availableDates: string[];
  hasUserBooked: boolean;
  productType: 'session' | 'product';
  productLink?: string;
  meetLink?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  refetch,
  price,
  title,
  productId,
  availableDates,
  hasUserBooked,
  productType,
  productLink,
  meetLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpBox, showOtpBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [sendOtp] = useSendPaymentOtpMutation();
  const [verifyOtp, { isLoading }] = useVerifyPaymentOtpMutation();

  const handleSendotp = async () => {
    if (productType === 'session' && (!selectedDate || !selectedTime)) {
      toast.error('Please select date and time');
      return;
    }
    try {
      await sendOtp().unwrap();
      toast.success('OTP has been sent to your email!');
      showOtpBox(true);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }
    try {
      const payload: any = {
        otp,
        productId,
      };

      if (productType === 'session') {
        payload.bookedDate = selectedDate;
        payload.bookedTime = parseInt(selectedTime);
      }

      await verifyOtp(payload).unwrap();
      toast.success('Payment successful!');
      setIsOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to verify OTP');
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  return (
    <div className="space-y-2">
      {!hasUserBooked && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-800 hover:bg-emerald-700 text-white w-full rounded p-4 outline-none font-sans">
              Book now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md flex flex-col bg-emerald-800 border-gray-600 text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>Fill in the details to proceed with payments.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <h1>
                Product Name : <span className="text-emerald-500 font-semibold">{title}</span>
              </h1>
              <h1>
                Pay : <span className="text-emerald-500 font-semibold">₹{price}</span>
              </h1>
              {!otpBox && productType === 'session' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-emerald-900/50 border border-sky-200/20 text-sky-100 rounded p-2"
                    >
                      <option value="">Select a date</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-emerald-900/50 border border-sky-200/20 text-sky-100 rounded p-2"
                    >
                      <option value="">Select a time</option>
                      <option value="18">6 PM</option>
                      <option value="19">7 PM</option>
                      <option value="20">8 PM</option>
                      <option value="21">9 PM</option>
                      <option value="22">10 PM</option>
                      <option value="23">11 PM</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center justify-center gap-2">
                {otpBox && (
                  <div className="my-8 text-white">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={handleOtpChange}
                      className="gap-2"
                    >
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className="bg-emerald-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                        />
                        <InputOTPSlot
                          index={1}
                          className="bg-emerald-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                        />
                        <InputOTPSlot
                          index={2}
                          className="bg-emerald-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                        />
                        <InputOTPSlot
                          index={3}
                          className="bg-emerald-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                        />
                        <InputOTPSlot
                          index={4}
                          className="bg-emerald-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                        />
                        <InputOTPSlot
                          index={5}
                          className="bg-emerald-900/50 border-sky-200/20 text-sky-100 w-12 h-12"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                )}
                {!otpBox && (
                  <Button
                    onClick={handleSendotp}
                    className="w-full bg-emerald-700 text-white hover:bg-emerald-500"
                  >
                    Send OTP to your email
                  </Button>
                )}
                {otpBox && (
                  <Button
                    onClick={handleVerifyOtp}
                    className="w-full bg-emerald-700 text-white hover:bg-emerald-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing Payment...' : 'Complete Payment!'}
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {hasUserBooked && (
        <Button
          className={`w-full rounded p-4 outline-none font-sans ${
            productType === 'session' && !meetLink
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-emerald-800 hover:bg-emerald-700 text-white'
          }`}
          onClick={() => {
            if (productType === 'session') {
              if (meetLink) {
                window.open(meetLink, '_blank');
              } else {
                toast.error('Meeting link not available yet. Please contact the mentor.');
              }
            } else if (productType === 'product' && productLink) {
              window.open(productLink, '_blank');
            } else if (productType === 'product' && !productLink) {
              toast.error('Product link not available yet. Please contact the creator.');
            }
          }}
          disabled={productType === 'session' && !meetLink}
        >
          {productType === 'session' ? 'Join Session' : 'Get Product'}
        </Button>
      )}
    </div>
  );
};

export default BookingModal;
