import DeviceList from 'components/devices/device-list';
import { Fragment, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import ActivityLogCard from 'components/devices/activity-log-card';
import PlanDetails from 'components/devices/plan-details';
import DeviceLocation from 'components/maps-actions/device-location';
import { getDevices, getDeviceById, getDeviceLocation } from 'lib/requests';
import { useQuery } from 'react-query';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const MapsActions: NextPageWithLayoutProps = () => {
  const { data, isLoading } = useQuery('devices', () => getDevices());
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const { data: location, refetch } = useQuery(['location', selectedDeviceId], () =>
    getDeviceLocation(selectedDeviceId)
  );
  const { data: selectedDevice } = useQuery(['device', selectedDeviceId], () =>
    getDeviceById(selectedDeviceId)
  );

  useEffect(() => {
    setSelectedDeviceId(data?.content[0]?.ID);
  }, [data]);

  return (
    <>
      <Seo title="Maps and Actions" description="Know where your devices are and take action." />
      <div className="w-full space-y-5 py-12">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="section-heading">Maps & Actions</h1>
            <span className="section-sub-heading">
              If you have any questions, just ask we are always glad to help.
            </span>
          </div>
        </div>
        <div className="mt-2 grid gap-5 md:grid-cols-[32%_1fr] md:gap-11">
          <DeviceList
            isLoading={isLoading}
            devices={data?.content}
            selected={selectedDeviceId}
            onSelect={(selected) => setSelectedDeviceId(selected)}
          />
          <div className="relative w-full md:order-3">
            <Tab.Group>
              <Tab.List className="flex w-full justify-between">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <div className="relative flex flex-col items-center">
                      <button className="font-medium">Device Location</button>
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
                  <DeviceLocation
                    longitude={location?.longitude}
                    latitude={location?.latitude}
                    update={() => refetch()}
                  />
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
      </div>
    </>
  );
};

MapsActions.layoutProps = {
  isAuthenticated: true,
};

export default MapsActions;
