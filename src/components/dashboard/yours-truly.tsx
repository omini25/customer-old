import { IconlyChat } from 'components/icons';
import { FC } from 'react';
import routes from 'routes';

const YoursTruly: FC = () => {
  return (
    <div className="tour-help-center flex items-center gap-5">
      <IconlyChat className="text-4xl" />
      <div>
        <h5 className="section-heading">Yours truly</h5>
        <p className="section-sub-heading mt-3 leading-[1.125rem]">
          Ask us any questions & get the help you need. <br />
          <a href={routes.HELP_SUPPORT} className="text-daabo-primary hover:underline">
            Help Center
          </a>
        </p>
      </div>
    </div>
  );
};

export default YoursTruly;
