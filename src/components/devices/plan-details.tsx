import { FC } from 'react';
import { PlanDetail } from 'typings';

type PlanDetailsProps = {
  device: any;
};

const PlanDetails: FC<PlanDetailsProps> = ({ device }) => {
  const details = device?.subscription[0];
  const billingDetails = device?.package_payment[0];

  return (
    <div className="rounded-xl bg-[#fcfcfc] py-2 px-4 md:py-5 md:px-8">
      <h5 className="text-base font-semibold">Plan Details</h5>
      <div className="mt-6 flex flex-col gap-6 px-4 font-medium text-daabo-grey md:px-8">
        <div className="flex justify-between">
          <span className="capitalize">Plan</span>
          <span>{details?.plan_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">Price</span>
          <span>₦{Number(billingDetails?.amount || 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">Started On</span>
          <span>
            {!billingDetails?.payment_date
              ? ''
              : new Date(billingDetails?.payment_date).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">Next Billing</span>
          <span>
            {!billingDetails?.next_payment_date
              ? ''
              : new Date(billingDetails?.next_payment_date).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">Recurring</span>
          <span>{details?.subscription_interval != '0' ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">Payment Type</span>
          <span>
            {details?.subscription_interval == '12'
              ? 'Annually'
              : details?.subscription_interval == '6'
              ? '6 Months'
              : ''}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">Device ID</span>
          <span>{device?.device_hash}</span>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
