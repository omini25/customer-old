import { useRouter } from 'next/router';
import AuthIcon from 'components/lib/forms/auth-icon';
import SignUpStepOne from 'components/sign-up/step-one';
import AuthNavigation from 'components/lib/forms/auth-navigation';
import CreateIndividualAccountStepOne from 'components/sign-up/individual/step-one';
import IndividualAccountIcon from 'components/sign-up/individual/individual-icon';
import CreateIndividualAccountStepTwo from 'components/sign-up/individual/step-two';
import SignupProvider from 'components/sign-up/context';
import Seo from 'lib/seo';
import { getSearchParams } from 'utils';
import { NextPageWithLayoutProps } from 'typings';

const components = new Map<string, JSX.Element>([
  ['', <SignUpStepOne key="-1" />], // step=1
  ['2', <CreateIndividualAccountStepOne key="individual-3" />], // step=2
  ['3', <CreateIndividualAccountStepTwo key="individual-4" />], // step=3
]);

const SignUp: NextPageWithLayoutProps = () => {
  const router = useRouter();
  const query = getSearchParams(router.asPath);

  const step = query.get('step') || '';
  const componentId = `${step || ''}`;
  const component = components.get(componentId);

  return (
    <>
      <Seo title="Sign up" description="Create your Daabo account" />
      <div className="flex flex-col items-center bg-daabo-white pt-[2.5rem] pb-[2.5rem]">
        <AuthNavigation
          hidePreviousButton={step === '1' || !step}
          hideRestartButton={step === '1' || !step}
        />
        {Number(step) <= 2 && <AuthIcon />}
        {Number(step) > 2 && <IndividualAccountIcon />}
        <SignupProvider>{component}</SignupProvider>
      </div>
    </>
  );
};

SignUp.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default SignUp;
