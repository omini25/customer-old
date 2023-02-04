import { IconlyEditSquare } from 'components/icons';
import Link from 'next/link';
import { FC } from 'react';
import routes from 'routes';

const RequestClaimCard: FC = () => {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-6 rounded-lg bg-[#fcfcfc] py-7 px-8 shadow-[0px_2px_7px_rgba(0,0,0,0.12)] md:flex-row md:gap-8 md:px-12 lg:gap-12">
      <IconlyEditSquare className="text-[2rem] md:text-[3.875rem]" />
      <div className="w-full text-center md:text-left">
        <h5 className="text-lg font-semibold">Request a claim or repair</h5>
        <p className="mt-3 text-xs text-daabo-grey">
          You can request a claim or repair and it would be responded to in less than 30 minutes.
        </p>
      </div>
      <Link href={routes.CLAIMS_REPAIRS}>
        <a className="daabo-secondary-button inline-flex justify-center justify-self-end md:w-[45%] lg:w-[30%]">
          Make a request
        </a>
      </Link>
    </div>
  );
};

export default RequestClaimCard;
