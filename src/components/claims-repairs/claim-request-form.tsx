import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useAuth } from 'components/lib/auth';
import { FC } from 'react';
import { BiX } from 'react-icons/bi';
import { toast } from 'react-toastify';

type ClaimRequestFormProps = {
  isOpen: boolean;
  close: () => void;
};

const ClaimRequestForm: FC<ClaimRequestFormProps> = ({ isOpen, close }) => {
  const { user } = useAuth();
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto py-8"
      onClose={close}
    >
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
        <div className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[#fcfcfc] pb-10 align-middle transition-all">
          <Dialog.Title
            as="div"
            className="flex justify-between border border-[#dadada] px-[2.5rem] pt-5 pb-4"
          >
            <h6 className="font-semibold">Claim Request Form</h6>
            <button onClick={close}>
              <BiX className="cursor-pointer text-2xl" />
            </button>
          </Dialog.Title>
          <form
            className="mt-8 flex w-full flex-col gap-8 px-[2.5rem]"
            onSubmit={(ev) => {
              ev.preventDefault();
              const formdata = new FormData(ev.currentTarget);
              axios
                .post('/api/claims', formdata)
                .then(() => {
                  toast.success('Claim request submitted successfully');
                  close();
                })
                .catch((err) => {
                  console.error(err);
                  toast.error('Claim request submission failed');
                });
            }}
          >
            <label className="flex flex-col items-start">
              <span className="font-medium">Claim Type</span>
              <input
                name="claimType"
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Name</span>
              <input
                name="deviceName"
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device ID or IMEI or Serial Number</span>
              <input
                name="deviceId"
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Type of Damage</span>
              <select
                name="damageType"
                placeholder="Choose incident type"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              >
                <option>Screen Damage</option>
                <option>Loss/Theft</option>
                <option>Water Damage</option>
                <option>Device Part Damage</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Date of Incident</span>
              <input
                name="incidentDate"
                placeholder="Date incident occured"
                type="date"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Has this occured to the device before?</span>
              <select
                name="occuredBefore"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Has this device been fixed before?</span>
              <select
                name="fixedBefore"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Incident Location</span>
              <input
                name="incidentLocation"
                placeholder="Where did the incident happen?"
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Current Location</span>
              <input
                name="currentLocation"
                placeholder="Where are you now?"
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Details</span>
              <textarea
                name="details"
                placeholder="Tell us more about the incident"
                rows={5}
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <input type="hidden" value={user?.email} name="email" />
            <label className="flex flex-col items-start">
              <span className="font-medium">Upload image of damage, if any</span>
              <input
                name="damageImage"
                placeholder="Image of damage"
                type="file"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <button type="submit" className="daabo-primary-button text-base">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ClaimRequestForm;
