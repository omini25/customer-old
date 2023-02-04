import { BsPlusSquareFill } from 'react-icons/bs';
import NoDevice from 'components/devices/no-device';
import DeviceList from 'components/devices/device-list';
import { Fragment, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import DeviceInfo from 'components/devices/device-info';
import ActivityLogCard from 'components/devices/activity-log-card';
import PlanDetails from 'components/devices/plan-details';
import AddDeviceForm from 'components/devices/add-device-form';
import { useQuery } from 'react-query';
import { getDeviceById, getDevices } from 'lib/requests';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const Devices: NextPageWithLayoutProps = () => {
  const { data, isLoading } = useQuery('devices', () => getDevices());
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const { data: selectedDevice } = useQuery(['device', selectedDeviceId], () =>
    getDeviceById(selectedDeviceId)
  );
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setSelectedDeviceId(data?.content[0]?.ID);
  }, [data]);

  const openModal = () => {
    setFormOpen(true);
  };

  const closeModal = () => {
    setFormOpen(false);
  };

  return (
    <>
      <Seo title="Devices" description="Manage your devices" />
      <div>
        <div className="w-full py-12">
          <div className="mb-[2.750rem] flex flex-col items-start justify-between gap-y-3 sm:flex-row">
            <div className="flex flex-col gap-2">
              <h1 className="section-heading">Devices</h1>
              <span className="section-sub-heading">
                Here is list of devices that you have protected.
              </span>
            </div>
            <button
              className="daabo-primary-button flex items-center justify-center gap-[0.375rem]"
              onClick={openModal}
            >
              <BsPlusSquareFill className="text-base" />
              <span>Add device</span>
            </button>
          </div>
          {data?.totalLength == '0' ? (
            <NoDevice />
          ) : (
            <div className="mt-4 grid gap-5 md:mt-0 md:grid-cols-[32%_1fr] md:gap-11">
              <DeviceList
                isLoading={isLoading}
                devices={data?.content}
                selected={selectedDeviceId}
                onSelect={(selected) => setSelectedDeviceId(selected)}
              />
              <div className="relative w-full text-[0.75rem] md:order-3 md:text-[0.938rem]">
                <Tab.Group>
                  <Tab.List className="flex w-full justify-between">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div className="relative flex flex-col items-center">
                          <button className="font-medium">Device Info</button>
                          <div
                            className={`w-[90%] border-t-2 ${
                              selected ? 'border-daabo-primary' : 'border-transparent'
                            }`}
                          />
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div className="relative flex flex-col items-center">
                          <button className="font-medium">Activity Log</button>
                          <div
                            className={`w-[90%] border-t-2 ${
                              selected ? 'border-daabo-primary' : 'border-transparent'
                            }`}
                          />
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div className="relative flex flex-col items-center">
                          <button className="font-medium">Your Plan</button>
                          <div
                            className={`w-[90%] border-t-2 ${
                              selected ? 'border-daabo-primary' : 'border-transparent'
                            }`}
                          />
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2 w-full">
                    <Tab.Panel className="w-full">
                      <DeviceInfo device={selectedDevice} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <ActivityLogCard logs={[]} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <PlanDetails device={selectedDevice} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          )}
        </div>
        <AddDeviceForm close={closeModal} isOpen={formOpen} />
      </div>
    </>
  );
};

Devices.layoutProps = {
  isAuthenticated: true,
};

export default Devices;
