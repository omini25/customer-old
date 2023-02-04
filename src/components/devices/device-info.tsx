import {
  Accelerometer,
  CameraBack,
  CarbonMicrophoneFilled,
  CarbonTaskSettings,
  CodiconCircuitBoard,
  ElHeadphones,
  LocationPin,
  MdiCameraFront,
  Speaker,
  WhhHandPinch,
  WhhPhoneScreenSize,
  WhhRam,
} from 'components/icons';
import { removeDevice, setDeviceRecovered, setDeviceMissing } from 'lib/requests';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import MissingDeviceModal from './missing-device-modal';
import RecoverDeviceModal from './recover-device-modal';
import RemoveDeviceModal from './remove-device-modal';

type DeviceInfoProps = {
  device: any;
};

const DeviceInfo: FC<DeviceInfoProps> = ({ device }) => {
  const [missingModal, setMissingModal] = useState(false);
  const [recoveredModal, setRecoveredModal] = useState(false);
  const [removeDeviceModal, setRemoveDeviceModal] = useState(false);
  const tests = device?.mobile_test[0];
  const queryClient = useQueryClient();

  const removeDeviceMutation = useMutation((deviceId: string) => removeDevice(deviceId), {
    onSuccess: () => {
      toast.success('Device removed successfully');
      queryClient.invalidateQueries('devices');
    },
    onError: () => {
      closeMissingDeviceModal();
      toast.error('Error removing device');
    },
  });

  const setDeviceRecoveredMutation = useMutation(
    (deviceId: string) => setDeviceRecovered(deviceId),
    {
      onSuccess: () => {
        toast.success('Device is currently set to recovered');
        queryClient.invalidateQueries('devices');
        closeRecoveredDeviceModal();
      },
      onError: () => {
        toast.error('Error setting device to recovered');
        closeRecoveredDeviceModal();
      },
    }
  );

  const setDeviceMissingMutation = useMutation((deviceId: string) => setDeviceMissing(deviceId), {
    onSuccess: () => {
      toast.success('Device is currently set to missing');
      queryClient.invalidateQueries('devices');
      closeMissingDeviceModal();
    },
    onError: () => {
      toast.error('Error setting device to missing');
      closeMissingDeviceModal();
    },
  });

  const openMissingDeviceModal = () => {
    setMissingModal(true);
  };

  const openRecoveredDeviceModal = () => {
    setRecoveredModal(true);
  };

  const openRemoveDeviceModal = () => {
    setRemoveDeviceModal(true);
  };

  const closeMissingDeviceModal = () => {
    setMissingModal(false);
  };

  const closeRecoveredDeviceModal = () => {
    setRecoveredModal(false);
  };

  const closeRemoveDeviceModal = () => {
    setRemoveDeviceModal(false);
  };

  return (
    <div>
      <div className="w-full rounded-xl bg-[#fcfcfc] py-4 px-4 md:py-9 md:px-8">
        {/* Info */}
        <div className="grid grid-cols-2 gap-6 md:gap-12">
          <div className="flex flex-col gap-4 md:flex-row">
            <CarbonTaskSettings className="text-4xl" />
            <div>
              <h5 className="text-[0.938rem] font-medium">System</h5>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col text-xs text-daabo-grey">
                  <span className="text-xs font-semibold uppercase">Vendor</span>
                  <span>{device?.brand}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <CodiconCircuitBoard className="text-4xl" />
            <div>
              <h5 className="text-[0.938rem] font-medium">Motherboard</h5>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col text-xs text-daabo-grey">
                  <span className="text-xs font-semibold uppercase">Vendor</span>
                  <span>{device?.motherboard}</span>
                </div>
                {/* <div className="flex flex-col text-xs text-daabo-grey">
                <span className="font-semibold uppercase">Motherboard Model</span>
                <span>{details.motherboard.model}</span>
              </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            {/* <FluentDeveloperBoard className="text-4xl" />
          <div>
            <h5 className="font-medium text-[0.938rem]">CPU</h5>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col text-xs text-daabo-grey">
                <span className="font-semibold uppercase">CPU Speed (MHZ)</span>
                <span>{details.cpu.speed}</span>
              </div>
              <div className="flex flex-col text-xs text-daabo-grey">
                <span className="font-semibold uppercase">Number of Cores</span>
                <span>{details.cpu.coresCount}</span>
              </div>
            </div>
          </div> */}
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <WhhRam className="text-4xl" />
            <div>
              <h5 className="text-[0.938rem] font-medium">RAM</h5>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col text-xs text-daabo-grey">
                  <span className="text-xs font-semibold uppercase">RAM Size</span>
                  <span>{device?.ram}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Test Results */}
        {device?.device_type[0]?.device_category === 'mobile' && (
          <div className="mt-12">
            <h5 className="font-semibold">Test Results</h5>
            <div className="mt-6 grid grid-cols-3 items-end gap-6">
              <div className="flex flex-col items-center">
                <ElHeadphones className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Headphones</span>
                <TestResult test={!!tests?.earpiece} />
              </div>
              <div className="flex flex-col items-center">
                <WhhPhoneScreenSize className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Touch Screen</span>
                <TestResult test={!!tests?.touch_screen} />
              </div>
              <div className="flex flex-col items-center">
                <WhhHandPinch className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Pinch</span>
                <TestResult test={!!tests?.pinch} />
              </div>
              <div className="flex flex-col items-center">
                <CarbonMicrophoneFilled className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Microphone</span>
                <TestResult test={!!tests?.microphone} />
              </div>
              <div className="flex flex-col items-center">
                <Speaker className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Speaker</span>
                <TestResult test={!!tests?.speaker} />
              </div>
              <div className="flex flex-col items-center">
                <MdiCameraFront className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Front Camera</span>
                <TestResult test={!!tests?.front_camera} />
              </div>
              <div className="flex flex-col items-center">
                <CameraBack className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Back Camera</span>
                <TestResult test={!!tests?.back_camera} />
              </div>
              <div className="flex flex-col items-center">
                <Accelerometer className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">Accelerometer</span>
                <TestResult test={!!tests?.accelerometer} />
              </div>
              <div className="flex flex-col items-center">
                <LocationPin className="text-lg" />
                <span className="mt-[3px] text-xs font-semibold">GPS</span>
                <TestResult test={!!tests?.gps} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-11 lg:flex-row">
        {/* TODO: Add ring device button */}
        <button
          onClick={openRemoveDeviceModal}
          className="inline-flex w-[90%]  place-items-center justify-center rounded-lg bg-[#9f9f9f] py-4 text-xs font-medium uppercase text-daabo-white hover:opacity-95 sm:w-[70%] lg:w-[40%]"
        >
          Remove Device
        </button>
        {device?.missing_device === false ? (
          <button
            onClick={openMissingDeviceModal}
            className="inline-flex w-[90%] place-items-center justify-center rounded-lg bg-[#c70000] py-4 text-xs font-medium uppercase text-daabo-white hover:opacity-95 sm:w-[70%] lg:w-[40%]"
          >
            Set Device to Missing
          </button>
        ) : (
          <button
            onClick={openRecoveredDeviceModal}
            className="inline-flex w-[90%] place-items-center justify-center rounded-lg bg-[#4CAF50] py-4 text-xs font-medium uppercase text-daabo-white hover:opacity-95 sm:w-[70%] lg:w-[40%]"
          >
            Set Device to Recovered
          </button>
        )}
      </div>
      <div>
        <MissingDeviceModal
          isOpen={missingModal}
          closeModal={closeMissingDeviceModal}
          device={device}
          setMissingDevice={setDeviceMissingMutation.mutate}
        />
        <RecoverDeviceModal
          isOpen={recoveredModal}
          device={device}
          setDeviceRecovered={setDeviceRecoveredMutation.mutate}
          closeModal={closeRecoveredDeviceModal}
        />
        <RemoveDeviceModal
          device={device}
          isOpen={removeDeviceModal}
          removeDevice={removeDeviceMutation.mutate}
          closeModal={closeRemoveDeviceModal}
        />
      </div>
    </div>
  );
};

const TestResult: FC<{ test?: boolean }> = ({ test }) => {
  let result: string;
  let resultStyle: string;

  if (test === undefined) {
    result = 'NA';
    resultStyle = '';
  } else if (test) {
    result = 'PASS';
    resultStyle = 'text-[#4caf50]';
  } else {
    result = 'FAIL';
    resultStyle = 'text-[#c70000]';
  }

  return <span className={`text-xs font-medium uppercase ${resultStyle}`}>{result}</span>;
};

export default DeviceInfo;
