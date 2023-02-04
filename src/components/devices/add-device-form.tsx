import { Dialog } from '@headlessui/react';
import { addDevice, getDeviceSubscriptions, getDeviceTypes } from 'lib/requests';
import { FC, Reducer, useEffect, useReducer } from 'react';
import { BiX } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Device } from 'typings';
import { toast } from 'react-toastify';

type AddDeviceFormProps = {
  isOpen: boolean;
  close: () => void;
};

type AddDeviceFormState = {
  type: string;
  brand: string;
  model: string;
  imei: string;
  datePurchased: string;
  condition: string;
  cost: number;
  plan: string;
  coupon?: string;
  image?: File;
};

type StringAddDeviceFormAction = {
  type:
    | 'SET_TYPE'
    | 'SET_BRAND'
    | 'SET_MODEL'
    | 'SET_IMEI'
    | 'SET_DATE_PURCHASED'
    | 'SET_CONDITION'
    | 'SET_CONDITION'
    | 'SET_PLAN'
    | 'SET_COUPON';
  data: string;
};

type NumberAddDeviceFormAction = {
  type: 'SET_COST';
  data: number;
};

type FileAddDeviceFormAction = {
  type: 'SET_IMAGE';
  data?: File;
};

type AddDeviceFormAction =
  | StringAddDeviceFormAction
  | NumberAddDeviceFormAction
  | FileAddDeviceFormAction;

const formReducer: Reducer<AddDeviceFormState, AddDeviceFormAction> = (state, action) => {
  switch (action.type) {
    case 'SET_BRAND':
      return { ...state, brand: action.data };
    case 'SET_CONDITION':
      return { ...state, condition: action.data };
    case 'SET_COST':
      return { ...state, cost: action.data };
    case 'SET_DATE_PURCHASED':
      return { ...state, datePurchased: action.data };
    case 'SET_IMAGE':
      return { ...state, image: action.data };
    case 'SET_IMEI':
      return { ...state, imei: action.data };
    case 'SET_MODEL':
      return { ...state, model: action.data };
    case 'SET_TYPE':
      return { ...state, type: action.data };
    case 'SET_PLAN':
      return { ...state, plan: action.data };
    case 'SET_COUPON':
      return { ...state, coupon: action.data };
    default:
      return state;
  }
};

const AddDeviceForm: FC<AddDeviceFormProps> = ({ isOpen, close }) => {
  const queryClient = useQueryClient();
  const { data: deviceTypes } = useQuery('device_types', () => getDeviceTypes());
  const { data: deviceSubscriptions } = useQuery('device_subscriptions', getDeviceSubscriptions);
  const addDeviceMutation = useMutation((deviceData: any) => addDevice(deviceData), {
    onSuccess: (data) => {
      if (data.authorization_url) {
        window.open(data.authorization_url, '_blank', 'popup');
      } else {
        toast.success('Device added');
      }
      queryClient.invalidateQueries('devices');
    },
    onError: () => {
      toast.error('Error adding device');
    },
  });
  const [state, dispatch] = useReducer(formReducer, {
    type: '',
    brand: '',
    model: '',
    imei: '',
    datePurchased: '',
    condition: '',
    cost: 0,
    plan: '',
    image: undefined,
  });

  useEffect(() => {
    dispatch({ type: 'SET_TYPE', data: deviceTypes?.[0]?.ID });
  }, [deviceTypes]);

  useEffect(() => {
    dispatch({ type: 'SET_PLAN', data: deviceSubscriptions?.content?.[0]?.ID });
  }, [deviceSubscriptions]);

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
            <h6 className="font-semibold">Protect a Device</h6>
            <button onClick={close}>
              <BiX className="cursor-pointer text-2xl" />
            </button>
          </Dialog.Title>
          <form
            className="mt-8 flex w-full flex-col gap-8 px-[2.5rem]"
            onSubmit={(ev) => {
              ev.preventDefault();
              if (!ev.currentTarget.checkValidity()) return;
              addDeviceMutation.mutate({
                datePurchased: state.datePurchased,
                deviceCondition: state.condition,
                deviceCost: String(state.cost),
                deviceTypeId: state.type,
                subscriptionId: state.plan,
                deviceImage: state.image,
                deviceInfo: {
                  brand: state.brand,
                  imeiNumber: state.imei,
                  model: state.model,
                  ram: `${(navigator as any).deviceMemory}GB`,
                },
                coupon: state.coupon,
              });
              close();
            }}
          >
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Type</span>
              <select
                required
                value={state.type}
                onChange={(ev) => dispatch({ type: 'SET_TYPE', data: ev.target.value })}
                placeholder="Choose device type"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              >
                {deviceTypes?.map((type: any) => (
                  <option key={type.ID} value={type.ID}>
                    {type.type_name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Brand</span>
              <input
                required
                value={state.brand}
                onChange={(ev) => dispatch({ type: 'SET_BRAND', data: ev.target.value })}
                placeholder="Enter device brand"
                type="input"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Model</span>
              <input
                required
                value={state.model}
                onChange={(ev) => dispatch({ type: 'SET_MODEL', data: ev.target.value })}
                placeholder="Enter device model"
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">IMEI/Serial Number</span>
              <input
                value={state.imei}
                placeholder="Dial *#06# to get your IMEI number on mobile devices"
                onChange={(ev) => dispatch({ type: 'SET_IMEI', data: ev.target.value })}
                type="text"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Date Purchased</span>
              <input
                required
                value={state.datePurchased}
                onChange={(ev) => dispatch({ type: 'SET_DATE_PURCHASED', data: ev.target.value })}
                type="date"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Condition</span>
              <textarea
                required
                rows={5}
                value={state.condition}
                onChange={(ev) => dispatch({ type: 'SET_CONDITION', data: ev.target.value })}
                placeholder="Tell us about the device condition"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Cost</span>
              <input
                required
                value={state.cost ? state.cost : ''}
                onChange={(ev) => dispatch({ type: 'SET_COST', data: parseInt(ev.target.value) })}
                placeholder="How much did you buy your device?"
                type="number"
                min={10000}
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Plan</span>
              <select
                required
                value={state.plan}
                onChange={(ev) => dispatch({ type: 'SET_PLAN', data: ev.target.value })}
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              >
                {deviceSubscriptions?.content?.map((sub: any) => (
                  <option
                    key={sub.ID}
                    value={sub.ID}
                  >{`${sub.plan.plan_name} - ${sub.subscription_name}`}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Apply Coupon</span>
              <select
                value={state.coupon}
                onChange={(ev) => dispatch({ type: 'SET_COUPON', data: ev.target.value })}
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              >
                {deviceSubscriptions?.content
                  ?.find((sub: any) => sub.ID === state.plan)
                  ?.coupon_code?.map((coupon: any) => {
                    const code = coupon.code;
                    const percentageDiscount = parseFloat(coupon.discount) * 100;
                    const maximumDiscount = coupon.max_amount;

                    return (
                      <option
                        key={coupon.ID}
                        value={coupon.ID}
                      >{`${code} - ${percentageDiscount}% up to ₦${maximumDiscount}`}</option>
                    );
                  })}
              </select>
            </label>
            <label className="flex flex-col items-start">
              <span className="font-medium">Device Image</span>
              <input
                onChange={(ev) =>
                  dispatch({
                    type: 'SET_IMAGE',
                    data: ev.target.files?.item(0) || undefined,
                  })
                }
                placeholder="Date incident occured"
                type="file"
                className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
              />
            </label>
            <button type="submit" className="daabo-primary-button text-base">
              Protect Device
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default AddDeviceForm;
