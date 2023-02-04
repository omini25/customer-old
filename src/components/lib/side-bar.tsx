/* eslint-disable @next/next/link-passhref */
import {
  AkarHome,
  CarbonSettings,
  CodiconTools,
  DeviceTabletSpeaker,
  FluentMyLocation,
} from 'components/icons';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { BiCreditCardFront } from 'react-icons/bi';
import { MdClose, MdOutlineMenu } from 'react-icons/md';
import routes from 'routes';

const SideBar: FC = () => {
  const { route } = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  const toggleShow = () => setIsShowing((prev) => !prev);

  return (
    <>
      <nav className="sticky top-8 mt-12 hidden h-full min-w-max gap-[4.375rem] py-3 pl-gutter font-medium lg:flex">
        <div className="flex flex-col gap-8">
          <Link href={routes.DASHBOARD}>
            <div
              className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.DASHBOARD && 'text-daabo-primary'
              }`}
            >
              <AkarHome />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href={routes.DEVICES}>
            <div
              className={`tour-devices flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.DEVICES && 'text-daabo-primary'
              }`}
            >
              <DeviceTabletSpeaker />
              <span>Devices</span>
            </div>
          </Link>
          <Link href={routes.BILLING}>
            <div
              className={`tour-billing flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.BILLING && 'text-daabo-primary'
              }`}
            >
              <BiCreditCardFront />
              <span>Billing</span>
            </div>
          </Link>
          <Link href={routes.MAPS_ACTIONS}>
            <div
              className={`tour-maps-action flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.MAPS_ACTIONS && 'text-daabo-primary'
              }`}
            >
              <FluentMyLocation />
              <span>Maps & Actions</span>
            </div>
          </Link>
          <Link href={routes.CLAIMS_REPAIRS}>
            <div
              className={`tour-claims-repairs flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.CLAIMS_REPAIRS && 'text-daabo-primary'
              }`}
            >
              <CodiconTools />
              <span>Claims & Repairs</span>
            </div>
          </Link>
          <Link href={routes.ACCOUNT_SETTINGS}>
            <div
              className={`tour-account-settings flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.ACCOUNT_SETTINGS && 'text-daabo-primary'
              }`}
            >
              <CarbonSettings />
              <span>Account Settings</span>
            </div>
          </Link>
        </div>
        <div className="h-full border-r-[1px] border-[#c4c4c4]" />
      </nav>
      <div className="fixed bottom-0 right-0 z-50 lg:hidden" role="navigation">
        <button
          className="absolute bottom-24 right-6 z-10 rounded-md bg-daabo-black p-1"
          onClick={toggleShow}
        >
          {isShowing ? (
            <MdClose size="2rem" className="text-daabo-primary" />
          ) : (
            <MdOutlineMenu size="2rem" className="text-daabo-primary" />
          )}
        </button>
        <Transition
          show={isShowing}
          enter="transition-transform duration-200 ease-in"
          enterFrom="translate-y-96"
          enterTo="translate-y-0"
          leave="transition-transform duration-300 ease-out"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-96"
        >
          <div className="fixed bottom-0 right-0 w-screen rounded-t-lg bg-daabo-black p-8 text-daabo-white">
            <div className="flex flex-col gap-8">
              <Link href={routes.DASHBOARD}>
                <div
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.DASHBOARD && 'text-daabo-primary'
                  }`}
                >
                  <AkarHome />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link href={routes.DEVICES}>
                <div
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.DEVICES && 'text-daabo-primary'
                  }`}
                >
                  <DeviceTabletSpeaker />
                  <span>Devices</span>
                </div>
              </Link>
              <Link href={routes.BILLING}>
                <div
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.BILLING && 'text-daabo-primary'
                  }`}
                >
                  <BiCreditCardFront />
                  <span>Billing</span>
                </div>
              </Link>
              <Link href={routes.MAPS_ACTIONS}>
                <div
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.MAPS_ACTIONS && 'text-daabo-primary'
                  }`}
                >
                  <FluentMyLocation />
                  <span>Maps & Actions</span>
                </div>
              </Link>
              <Link href={routes.CLAIMS_REPAIRS}>
                <div
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.CLAIMS_REPAIRS && 'text-daabo-primary'
                  }`}
                >
                  <CodiconTools />
                  <span>Claims & Repairs</span>
                </div>
              </Link>
              <Link href={routes.ACCOUNT_SETTINGS}>
                <div
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.ACCOUNT_SETTINGS && 'text-daabo-primary'
                  }`}
                >
                  <CarbonSettings />
                  <span>Account Settings</span>
                </div>
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default SideBar;
