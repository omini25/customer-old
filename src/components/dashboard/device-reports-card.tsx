import { IconlyDocument } from 'components/icons';
import Link from 'next/link';
import { FC } from 'react';
import routes from 'routes';

const DeviceReportsCard: FC = () => {
  return (
    <div className="flex flex-col place-content-between space-y-3 rounded-lg bg-[#fcfcfc] px-5 py-8 shadow-[0px_2px_7px_rgba(0,0,0,0.12)] xl:px-9">
      <div>
        <h5 className="text-lg font-semibold">Device Reports</h5>
        <p className="mt-3 text-xs text-daabo-grey lg:max-w-[17rem]">
          Check your reports of devices that you have registered under your account.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Link href={routes.DEVICES}>
          <a className="daabo-secondary-button text-center">Manage Devices</a>
        </Link>
        <IconlyDocument className="text-6xl" />
      </div>
    </div>
  );
};

export default DeviceReportsCard;
