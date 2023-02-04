import { FC, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { VscChromeClose } from 'react-icons/vsc';

interface Props {
  isOpen: boolean;
  device: any;
  closeModal: () => void;
  setMissingDevice: any;
}

const MissingDeviceModal: FC<Props> = ({ isOpen, closeModal, setMissingDevice, device }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-opacity-50"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#0000004D] backdrop-blur-[21px]" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-4 inline-block transform overflow-hidden bg-daabo-white py-10 px-5 text-left align-middle shadow-xl transition-all md:my-8 md:py-10 md:px-10 lg:w-[40.500rem] lg:py-[3.313rem]">
              <Dialog.Title
                as="h3"
                className="text-center text-[0.938rem] font-semibold leading-6 text-daabo-black"
              >
                SET TO MISSING
              </Dialog.Title>
              <Dialog.Description className="mx-auto mt-[1rem] max-h-[40.500rem] max-w-[29.375rem] text-center text-[0.78rem] md:text-[0.875rem]">
                By setting your device to missing, Daabo would immediately gather and send detailed
                reports with information to help identify whoever is using the device and their
                location.
              </Dialog.Description>
              <button onClick={closeModal} className="absolute right-[1.125rem] top-[1.125rem]">
                <VscChromeClose className="h-[1.575rem] w-[1.575rem] text-[#2E3A59]" />
              </button>
              <div className="my-[2.375rem]">
                <p className="text-center text-sm font-medium text-daabo-black">Report frequency</p>
                <div className="mx-auto flex flex-row items-center justify-between py-[0.625rem] text-xs text-daabo-grey sm:w-3/4">
                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="report-frequency"
                      id="ten-min"
                      className="form-radio cursor-pointer text-daabo-grey checked:bg-daabo-grey focus:outline-daabo-grey"
                    />
                    <label htmlFor="ten-min" className="cursor-pointer">
                      Every 10 minutes
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="report-frequency"
                      id="twenty-min"
                      className="form-radio cursor-pointer text-daabo-grey checked:bg-daabo-grey focus:outline-daabo-grey"
                    />
                    <label htmlFor="twenty-min" className="cursor-pointer">
                      Every 20 minutes
                    </label>
                  </div>
                </div>
              </div>
              <div className="mx-auto mb-8 flex h-[2.413rem] max-w-[21.250rem] flex-col justify-center rounded-[3px] bg-[#6B4EFF26] text-center text-[0.650rem] text-daabo-primary sm:text-[0.75rem] lg:mb-[3.125rem]">
                <span>Upgrade your plan to get reports every 5 minutes</span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <button
                  className="mx-auto h-[2.750rem] w-[14.125rem] rounded-md border-2 border-[#C70000] bg-white px-4 text-xs font-medium text-[#C70000] hover:bg-[#C70000] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:text-sm"
                  onClick={() => setMissingDevice(device?.ID)}
                >
                  Confirm Missing
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MissingDeviceModal;
