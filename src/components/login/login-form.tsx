import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordField from 'components/lib/forms/password-field';
import routes from 'routes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import EmailField from 'components/lib/forms/email-field';
import { ImFacebook2 } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { SocialLoginButton } from 'components/lib';
import { useAuth } from 'components/lib/auth';
import Button from 'components/lib/button';
import { User } from 'components/lib/auth/types';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();

  const loginSuccessHandler = (user?: User) => {
    router.push(routes.DASHBOARD);
    toast.success('Login Successful');
  };

  const loginFailedHandler = (error?: Error) => {
    toast.error(error?.message || 'Login failed', {
      hideProgressBar: true,
    });
  };

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    handleLogin(email, password);
  };

  const handleLogin = (email: string, password: string) => {
    if (!(email && password)) return;

    login(
      { email, password },
      {
        onSuccess: loginSuccessHandler,
        onError: loginFailedHandler,
      }
    );
  };

  return (
    <div className="flex flex-col items-center self-center">
      <form onSubmit={handleSubmit(onsubmit)} className="mt-[41px] self-center">
        <div className="relative mb-[37px] flex">
          <div>
            <EmailField
              placeholder="EMAIL ADDRESS"
              reactHookOptions={{
                register: register,
                options: {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                },
                error: errors.email,
              }}
            />
          </div>
        </div>
        <div className="relative flex">
          <PasswordField
            reactHookOptions={{
              register: register,
              options: {
                required: true,
              },
              error: errors.password,
            }}
            placeholder="ENTER PASSWORD"
          />
        </div>
        <div className="mt-[13px] text-right text-daabo-grey">
          <Link href={routes.RESET_PASSWORD}>
            <a className="right-3">Forgot password?</a>
          </Link>
        </div>
        <div className="mt-[47px] self-center text-center">
          <Button
            type="submit"
            className="h-[2.813rem] w-[10.938rem] text-[15px]"
            loading={isLoggingIn}
          >
            Log in
          </Button>
        </div>
      </form>
      <div className="my-10 text-center">
        Don&apos;t have an account?{' '}
        <Link href="/signup">
          <a className="text-daabo-primary">Sign up</a>
        </Link>
      </div>
      <div className="mt-[25px] self-center text-center text-daabo-grey">
        <p>or</p>
        <p>Log in with</p>
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
              toast.error(error?.message || 'Login failed', {
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
              toast.error(error?.message || 'Login failed', {
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
    </div>
  );
};

export default LoginForm;
