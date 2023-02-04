import { IconlySend } from 'components/icons';
import { FC } from 'react';
import routes from 'routes';

const SharingIsCaring: FC = () => {
  return (
    <div className="flex items-center gap-5">
      <IconlySend className="text-4xl" />
      <div>
        <h5 className="section-heading">Sharing is caring</h5>
        <p className="section-sub-heading mt-3 leading-[1.125rem]">
          Everyone has the right to own insurance for a device. <br />
          <a href={routes.SPREAD} className="text-daabo-primary hover:underline">
            Invite a friend
          </a>
        </p>
      </div>
    </div>
  );
};

export default SharingIsCaring;
