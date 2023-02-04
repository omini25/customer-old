import { Dialog } from '@headlessui/react';
import { IconlyMessage, IconlyPaperDownload, IconlyTimeCircle } from 'components/icons';
import { FC, useState } from 'react';
import { BillDetail } from 'typings';

type BillingDetailCardProps = {
  details: BillDetail;
};

const BillingDetailCard: FC<BillingDetailCardProps> = ({ details }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="daabo-secondary-button" onClick={openModal}>
        View
      </button>
      <Dialog
        open={isOpen}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex min-h-screen items-center justify-center px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
          <div className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[#fcfcfc] px-14 py-14 align-middle transition-all">
            <Dialog.Title as="div" className="flex justify-between">
              <h6 className="font-semibold">Details</h6>
              {/* <IconlyPaperDownload className="text-2xl" /> */}
            </Dialog.Title>
            <div className="mt-8 flex flex-col gap-8 pl-1 text-daabo-grey">
              <div className="flex justify-between">
                <span className="font-medium">Invoice ID</span>
                <span>{details.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Description</span>
                <span>{details.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount</span>
                <span>₦{Number(details.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status</span>
                <span>{details.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date</span>
                <span>{details.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Platform</span>
                <span>{details.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Method</span>
                <span>{details.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email</span>
                <span>{details.email}</span>
              </div>
            </div>
            <div className="mt-9 flex justify-center">
              {/* <button
                type="button"
                className="daabo-secondary-button flex gap-1 items-center px-12"
                onClick={closeModal}
              >
                <IconlyTimeCircle className="text-base" />
                <span>Redo</span>
              </button>
              <button
                type="button"
                className="daabo-secondary-button flex gap-1 items-center px-12"
                onClick={closeModal}
              >
                <IconlyMessage className="text-base" />
                <span>Mail</span>
              </button> */}
              <button
                type="button"
                className="daabo-secondary-button flex items-center gap-1 px-12"
                onClick={closeModal}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BillingDetailCard;
