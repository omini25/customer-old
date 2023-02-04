import { SocialLoginButton } from 'components/lib';
import EmailField from 'components/lib/forms/email-field';
import InputField from 'components/lib/forms/input-field';
import { useSignUpForm } from 'components/sign-up/context';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { delayFunctionCall } from 'utils';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook2 } from 'react-icons/im';
import { useAuth } from 'components/lib/auth';
import { toast } from 'react-toastify';
import Button from 'components/lib/button';

interface Inputs {
  fullName: string;
  email: string;
}

const StepOneForm: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { updateFormData, formData } = useSignUpForm();
  const { login } = useAuth();

  const goToNextPage = (): void => {
    router.push('/signup', {
      query: {
        step: 3,
      },
    });
  };

  const loginSuccessHandler = () => {
    window.location.href = '/';
    toast.success('Login Successful');
  };

  const loginFailedHandler = (error?: Error) => {
    toast.error(error?.message || 'Login failed', {
      hideProgressBar: true,
    });
  };

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    updateFormData(data);
    delayFunctionCall(goToNextPage, 1000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="mt-[4.63rem] mb-[6.375rem] flex flex-col space-y-[2.313rem]"
      >
        <InputField
          type="text"
          placeholder="FULL NAME"
          descriptiveName="full name"
          reactHookOptions={{
            register: register,
            options: {
              required: true,
              minLength: 6,
              pattern: /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
            },
            error: errors.fullName,
          }}
          name="fullName"
          defaultValue={formData.fullName}
        />
        <EmailField
          placeholder="EMAIL ADRESS"
          defaultValue={formData.email}
          reactHookOptions={{
            register: register,
            options: {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
            error: errors.email,
          }}
        />
        <div className="self-center text-center">
          <Button type="submit" className="h-[2.813rem] w-[10.938rem] text-[15px]">
            Next
          </Button>
        </div>
      </form>
      <div className="self-center text-center text-daabo-grey">
        <p>or</p>
        <p>Sign up with</p>
        <div className="mt-[30px] flex flex-col items-center space-y-4 sm:flex-row sm:space-x-3 sm:space-y-0">
          <SocialLoginButton
            className="flex h-[50px] w-[153px] flex-row items-center justify-center space-x-2 rounded-[9px] bg-[#3B5998] text-white"
            provider="facebook"
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
            onLoginSuccess={(result) => {
              login(
                { provider: 'facebook', token: result.token.accessToken },
                {
                  onSuccess: loginSuccessHandler,
                  onError: loginFailedHandler,
                }
              );
            }}
            onLoginFailure={(error) => {
              toast.error(error?.message || 'Signup failed', {
                hideProgressBar: true,
              });
            }}
          >
            <span>
              <ImFacebook2 />
            </span>
            <span className="text-[15px] font-semibold">Facebook</span>
          </SocialLoginButton>
          <SocialLoginButton
            className="flex h-[50px] w-[153px] flex-row items-center justify-center space-x-2 rounded-[9px] bg-white text-[#344A5E]"
            provider="google"
            appId={process.env.NEXT_PUBLIC_GOOGLE_APP_ID || ''}
            onLoginSuccess={(result) => {
              login(
                { provider: 'google', token: result.token.idToken },
                {
                  onSuccess: loginSuccessHandler,
                  onError: loginFailedHandler,
                }
              );
            }}
            onLoginFailure={(error) => {
              toast.error(error?.message || 'Signup failed', {
                hideProgressBar: true,
              });
            }}
          >
            <span>
              <FcGoogle />
            </span>
            <span className="font-semibold text-[#344A5E]">Google</span>
          </SocialLoginButton>
        </div>
      </div>
    </>
  );
};

export default StepOneForm;
