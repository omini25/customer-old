import { Laptop, Mobile } from 'components/icons';
import { FC } from 'react';

const ProtectedDevicesCard: FC<{ devices: any }> = ({ devices }) => {
  return (
    <div className="mt-8 rounded-lg bg-[#fcfcfc] px-8 pt-4 pb-6 shadow-[0px_2px_7px_rgba(0,0,0,0.12)]">
      <h3 className="section-heading">Protected Devices</h3>
      <div className="mt-4 flex justify-around">
        {devices?.map((device: any) => (
          <div className="flex flex-col items-center justify-end" key={device.ID}>
            {device.device_type[0]?.device_category == 'mobile' ? (
              <Mobile className="text-2xl text-[#5f5f5f]" />
            ) : (
              <Laptop className="text-[2.8rem] text-[#5f5f5f]" />
            )}
            <span
              className={`relative mt-3 text-xs font-semibold uppercase text-[#5f5f5f] after:absolute after:-top-1 after:-right-2 after:h-[0.375rem] after:w-[0.375rem] after:rounded-full after:bg-[#4caf50] after:[content:'']  ${
                device.subscription_status != 'active' && 'after:hidden'
              }`}
            >
              {device.brand}
            </span>
            <span className="mt-2 text-xs text-daabo-grey">{device.device_model}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtectedDevicesCard;
