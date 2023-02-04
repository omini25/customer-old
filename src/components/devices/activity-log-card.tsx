import { FC } from 'react';
import { ActivityLog } from 'typings';

type ActivityLogCardProps = {
  logs: ActivityLog[];
};

const ActivityLogCard: FC<ActivityLogCardProps> = ({ logs }) => {
  return (
    <div className="rounded-xl bg-[#fcfcfc] p-4 md:p-9">
      <span className="text-daabo-grey">
        You are viewing activity information up to a month ago
      </span>
      <div className="mt-4">
        <div className="w-full">
          <div className="grid w-full grid-cols-[30%_48%_20%] gap-2 overflow-hidden rounded-lg bg-[#343434] px-8 font-medium text-[#fcfcfc]">
            <span className="w-[30%] py-3">Date</span>
            <span className="w-[50%] py-3">Event</span>
            <span className="w-[20%] py-3">Info</span>
          </div>
          <div className="mt-4 flex flex-col gap-3 text-daabo-grey">
            {logs.map((log, idx) => (
              <div key={idx} className="grid w-full grid-cols-[30%_48%_20%] gap-2 px-4">
                <span>{log.date.toLocaleString()}</span>
                <span>{log.event}</span>
                <span>{log.info}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogCard;
