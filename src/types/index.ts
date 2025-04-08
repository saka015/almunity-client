export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isEmailVerified?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}
