import { FC, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { VscChromeClose } from 'react-icons/vsc';

interface Props {
  isOpen: boolean;
  device: any;
  closeModal: () => void;
  removeDevice: any;
}

const RemoveDeviceModal: FC<Props> = ({ isOpen, closeModal, removeDevice, device }) => {
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
                REMOVE DEVICE
              </Dialog.Title>
              <Dialog.Description className="mx-auto mt-[1rem] max-h-[40.500rem] max-w-[29.375rem] text-center text-[0.78rem] md:text-[0.875rem]">
                By removing your device, Daabo would cancel any insurance plan associated this
                device.
              </Dialog.Description>
              <button onClick={closeModal} className="absolute right-[1.125rem] top-[1.125rem]">
                <VscChromeClose className="h-[1.575rem] w-[1.575rem] text-[#2E3A59]" />
              </button>

              <div className="mt-4 flex items-center space-x-2 lg:space-x-4">
                <button
                  className="mx-auto h-[2.750rem] w-[14.125rem] rounded-md border-2 border-[#C70000] bg-white px-4 text-xs font-medium text-[#C70000] hover:bg-[#C70000] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:text-sm"
                  onClick={() => removeDevice(device?.ID)}
                >
                  Remove Device
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RemoveDeviceModal;
