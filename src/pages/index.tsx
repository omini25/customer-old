import PersonalInfoCard from 'components/dashboard/personal-info-card';
import DeviceReportsCard from 'components/dashboard/device-reports-card';
import RequestClaimCard from 'components/dashboard/request-claim-card';
import ProtectedDevicesCard from 'components/dashboard/protected-devices-card';
import SharingIsCaring from 'components/dashboard/sharing-is-caring';
import YoursTruly from 'components/dashboard/yours-truly';
import { getDevices } from 'lib/requests';
import { useQuery } from 'react-query';
import NoProtectedDeviceCard from 'components/dashboard/no-protected-device-card';
import Seo from 'lib/seo';
import { useAuth } from 'components/lib/auth';
import { NextPageWithLayoutProps } from 'typings';

const Home: NextPageWithLayoutProps = () => {
  const { user } = useAuth();
  const { data } = useQuery(['devices', 0, 5], () => getDevices(0, 5));

  return (
    <>
      <Seo title="Dashboard" description="Manage your devices and plans." />
      <div>
        <div className="w-full py-12">
          <h2 className="text-3xl font-semibold">Welcome, {`${user?.fullName}`}</h2>
          <span className="mt-2 text-xs text-daabo-grey">
            Manage your account and your devices.
          </span>
          {data?.totalLength == '0' ? (
            <NoProtectedDeviceCard />
          ) : (
            <ProtectedDevicesCard devices={data?.content} />
          )}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <PersonalInfoCard />
            <DeviceReportsCard />
          </div>
          <RequestClaimCard />
          <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:gap-0">
            <SharingIsCaring />
            <YoursTruly />
          </div>
        </div>
      </div>
    </>
  );
};

Home.layoutProps = {
  isAuthenticated: true,
};

export default Home;
