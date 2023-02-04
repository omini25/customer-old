import { IconlyProfile } from 'components/icons';
import Link from 'next/link';
import { FC } from 'react';
import routes from 'routes';

const PersonalInfoCard: FC = () => {
  return (
    <div className="flex flex-col place-content-between space-y-3 rounded-lg bg-[#fcfcfc] py-8 px-5 shadow-[0px_2px_7px_rgba(0,0,0,0.12)] xl:px-9">
      <div>
        <h5 className="text-lg font-semibold">Personal Info</h5>
        <p className="mt-3 text-xs text-daabo-grey lg:max-w-[17rem]">
          See your profile data and manage your account to choose what is saved in our system.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Link href={routes.ACCOUNT_SETTINGS}>
          <a className="daabo-secondary-button text-center">Manage Account</a>
        </Link>
        <IconlyProfile className="text-6xl" />
      </div>
    </div>
  );
};

export default PersonalInfoCard;
