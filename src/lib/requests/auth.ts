import request from 'lib/request';
import throwDevOrProd from 'utils/throwDevOrProd';

interface IndividualSignUpData {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  referral?: {
    code: string;
    hash: string;
  };
}

export const signUp = async (userData: IndividualSignUpData) => {
  const payload = {
    email: userData.email,
    phone_number: userData.phoneNumber,
    password: userData.password,
    fullname: userData.fullName,
    r: userData.referral?.code,
    c: userData.referral?.hash,
  };

  try {
    const response = await request.post(`/signup`, payload);
    const { data } = response;
    if (data && data.status) {
      return { success: true };
    }

    throw new Error('Sign up failed');
  } catch (error) {
    throwDevOrProd(error, new Error('Sign up failed'));
  }
};

export const loginWithEmail = async (email: string, password: string): Promise<string> => {
  try {
    const response = await request.post('/auth', { email, password });
    const { data } = response;
    if (data && data.status) {
      return data.payload.token;
    }

    throw new Error('Login failed');
  } catch (error: any) {
    if (process.env.NODE_ENV == 'development') throw error;
    else throw new Error('Login failed');
  }
};

export const loginWithSocials = async (
  provider: 'google' | 'facebook',
  token: string
): Promise<string> => {
  try {
    const response = await request.post('/auth_social', {
      social_provider: provider,
      social_token: token,
    });
    const { data } = response;
    if (data && data.status) {
      return data.payload.token;
    }

    throw new Error('Login failed');
  } catch (error: any) {
    if (process.env.NODE_ENV == 'development') throw error;
    else throw new Error('Login failed');
  }
};

export const resetPassword = async (email: string) => {
  if (!email) return;

  try {
    const res = await request.post('/reset_password', { email });

    if (res.data.status) {
      return res.data;
    }

    throw new Error('Password reset failed');
  } catch (error) {
    throwDevOrProd(error, new Error('Password reset failed'));
  }
};

export const verifyOtp = async (code: string, email: string) => {
  if (!(code && email)) return;

  try {
    const res = await request.post('/validate_otp', { otp: code, email });

    if (res.data.status) {
      return res.data;
    }
    throw new Error('OTP verification failed');
  } catch (error) {
    throwDevOrProd(error, new Error('OTP verfication change'));
  }
};

export const changePassword = async (password: string, email: string, otp: string) => {
  if (!(otp && email && password)) return;

  try {
    const res = await request.post('/change_pass', { otp, email, password });
    if (res.data.status) {
      return res.data;
    }
    throw new Error('Password change failed');
  } catch (error) {
    throwDevOrProd(error, new Error('Password change failed'));
  }
};
