import { FC } from 'react';
import InputField from 'components/lib/forms/input-field';
import PasswordField from 'components/lib/forms/password-field';
import { useSignUpForm } from 'components/sign-up/context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import routes from 'routes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from 'components/lib/auth';
import { useMutation } from 'react-query';
import { signUp } from 'lib/requests/auth';
import Button from 'components/lib/button';

interface Inputs {
  phoneNumber: string;
  password: string;
}

const StepTwoForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { formData } = useSignUpForm();
  const auth = useAuth();

  const signupSuccessHandler = (data: any): void => {
    if (data && data.success) {
      localStorage.setItem('tour', 'enabled');
      auth.logout();
      router.push(routes.EMAIL_VERIFICATION_NOTIFICATION);
      toast.success('Sign up successful');
    } else {
      let errorMessage = data?.message || 'Sign up Failed';
      toast.error('An error occurred: ' + errorMessage);
    }
  };

  const signupFailedHandler = (error: any): void => {
    toast.error(error.message || 'Sign up Failed', {
      hideProgressBar: true,
    });
  };

  const registerMutation = useMutation(signUp, {
    onSuccess: signupSuccessHandler,
    onError: signupFailedHandler,
  });

  const handleUserRegistration = async (data: any) => {
    if (!data) return;
    registerMutation.mutate(data);
  };

  const onsubmit: SubmitHandler<Inputs> = async (data) => {
    const userData = { ...formData, ...data };
    const formEntries = Object.entries(userData);
    if (formEntries.length < 4) {
      // if there are any missing properties redirect the user to the first step
      window.location.href = '/signup?step=2';
    } else {
      await handleUserRegistration(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="mt-[2.313rem]">
      <div className="space-y-[2.313rem]">
        <InputField
          type="tel"
          placeholder="PHONE NUMBER"
          defaultValue={formData.phone_number}
          name="phoneNumber"
          reactHookOptions={{
            register: register,
            options: {
              required: true,
              minLength: 11,
              maxLength: 15,
            },
            error: errors.phoneNumber,
          }}
        />
        <PasswordField
          reactHookOptions={{
            register: register,
            options: {
              required: true,
              minLength: 8,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
            },
            error: errors.password,
          }}
          placeholder="ENTER PASSWORD"
        />
      </div>
      <div className="mt-[1.438rem]">
        <p className="text-center text-[0.75rem]">
          By clicking “Create Account”, you accept the{' '}
          <a
            className="text-daabo-primary-500 underline"
            href="https://www.getdaabo.com.ng/terms-of-service"
            target="_blank"
            rel="noreferrer"
          >
            terms.
          </a>
        </p>
      </div>
      <div className="mt-[2.825rem] text-center">
        <Button
          type="submit"
          loading={registerMutation.isLoading}
          className="h-[2.813rem] w-[17.063rem] text-[15px]"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default StepTwoForm;
