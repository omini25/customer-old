import Button from 'components/lib/button';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { FC, useState } from 'react';
import { delayFunctionCall, getSearchParams } from 'utils';
import UserChoice from './user-choice';

export type UserChoiceType = 'yes' | 'no';

const SignUpStepOne: FC = () => {
  const [userChoice, setUserChoice] = useState<UserChoiceType>('yes');
  const router = useRouter();

  const query = getSearchParams(router.asPath);
  const referral =
    query.has('r') && query.has('c')
      ? {
          r: query.get('r') || '',
          c: query.get('c') || '',
        }
      : undefined;

  const goToNextPage = (): void => {
    if (userChoice === 'yes') {
      router.push('/login');
    } else {
      router.push('/signup', {
        query: {
          ...referral,
          step: '2',
        },
      });
    }
  };

  return (
    <div className="mt-[2rem] flex flex-col items-center">
      <div className="space-y-[0.750rem] text-center">
        <p className="text-[1.313rem] text-[#343434]">Hey there!</p>
        <p className="text-[1.313rem] font-semibold">Do you already have a daabo account?</p>
      </div>
      <div className="mt-[2rem] flex flex-col space-y-[1.688rem]">
        <UserChoice
          value="yes"
          name="Yes"
          userChoice={userChoice}
          onClick={() => {
            setUserChoice('yes');
          }}
          onChange={() => {
            setUserChoice('yes');
          }}
        />
        <UserChoice
          value="no"
          name="Nope"
          userChoice={userChoice}
          onClick={() => {
            setUserChoice('no');
          }}
          onChange={() => {
            setUserChoice('no');
          }}
        />
      </div>
      <div className="mt-[3.313rem]">
        <Button
          onClick={() => delayFunctionCall(goToNextPage, 1000)}
          className="h-[2.813rem] w-[10.875rem]"
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default SignUpStepOne;
