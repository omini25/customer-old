import request from 'lib/request';
import throwDevOrProd from 'utils/throwDevOrProd';

export async function getUserInfo() {
  try {
    const res = await request.get('/user_info');

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching user information');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching user information'));
  }
}

export async function getDevices(start?: number, len?: number) {
  try {
    const res = await request.get('/device', {
      params: {
        start,
        len,
      },
    });

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching devices');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching devices'));
  }
}

export async function getDeviceById(id: string) {
  try {
    const res = await request.get(`/device/${id}`);

    if (res && res.data.status) return res.data.payload[0];
    else throw new Error('Error fetching device information');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching device information'));
  }
}

export async function getDeviceLocation(id: string) {
  try {
    const res = await request.get(`/device_location/${id}`);

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching device location');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching device location'));
  }
}

export async function getPersonalSettings() {
  try {
    const res = await request.get('/get_profile_setting');

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching settings');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching settings'));
  }
}

export async function updatePersonalSettings(
  id: string,
  obj: {
    unusual_activity?: boolean;
    new_browser?: boolean;
    lastest_news?: boolean;
    account_tips?: boolean;
    new_features?: boolean;
    activity_log?: boolean;
  }
) {
  try {
    const res = await request.post(`/profile_setting/${id}`, obj);

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error updating settings');
  } catch (error) {
    throwDevOrProd(error, new Error('Error updating settings'));
  }
}

export async function getBillingData(start?: number, len?: number) {
  try {
    const res = await request.get('/billing', {
      params: {
        start,
        len,
      },
    });

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching billing history');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching billing history'));
  }
}

export async function removeDevice(id: string) {
  try {
    const res = await request.post('/remove_device', { device_id: id });

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error removing device');
  } catch (error) {
    throwDevOrProd(error, new Error('Error removing device'));
  }
}

export async function setDeviceMissing(id: string) {
  try {
    const data = new FormData();
    data.append('devices_id', id);
    const res = await request.post('/device_missing', data);
    if (res && res.data.status) return res.data.payload;
  } catch (error) {
    throwDevOrProd(error, new Error('Error setting device to missing'));
  }
}

export async function setDeviceRecovered(id: string) {
  let data = JSON.stringify({ device_id: id });
  try {
    const res = await request.post('/update_device_missing', data);
    if (res && res.data.status) return res.data.payload;
  } catch (error) {
    throwDevOrProd(error, new Error('Error setting device to recovered'));
  }
}

export async function getDeviceTypes(category?: 'mobile' | 'web') {
  try {
    const res = await request.get('/device_type', {
      params: {
        q: category,
      },
    });

    if (res && res.data.status) return res.data.payload?.table_data;
    else throw new Error('Error fetching device types');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching device types'));
  }
}

export async function getDeviceSubscriptions() {
  try {
    const res = await request.get('/device_subscription');

    if (res && res.data.status) return res.data.payload;
    else throw new Error('Error fetching device subscriptions');
  } catch (error) {
    throwDevOrProd(error, new Error('Error fetching device subscriptions'));
  }
}

export async function addDevice(data: {
  deviceInfo: { brand: string; model: string; imeiNumber: string; ram: string };
  deviceCondition: string;
  datePurchased: string;
  deviceCost: string;
  subscriptionId: string;
  deviceTypeId: string;
  deviceImage?: File;
  coupon?: string;
}) {
  const formData = new FormData();
  formData.append(
    'device_info',
    JSON.stringify({
      brand: data.deviceInfo.brand,
      model: data.deviceInfo.model,
      imei_number: data.deviceInfo.imeiNumber,
      ram: data.deviceInfo.ram,
      motherboard: data.deviceInfo.brand,
    })
  );
  formData.append('device_condition', data.deviceCondition);
  formData.append('date_purchased', data.datePurchased);
  formData.append('cost_of_device', data.deviceCost);
  formData.append('subscription_id', data.subscriptionId);
  formData.append('device_type_id', data.deviceTypeId);
  data.coupon && formData.append('r', data.coupon);
  data.deviceImage && formData.append('devices_path', data.deviceImage);

  try {
    const res = await request.post('/register_device', formData);
    if (res && res.data.status) return res.data.payload;
    else throw new Error('Device registration could not be completed');
  } catch (error) {
    throwDevOrProd(error, new Error('Device registration could not be completed'));
  }
}

export const updateUserData = async (formData: FormData) => {
  if (!formData) return;

  try {
    const response = await request.post('/profile', formData);
    if (response && response.data.status) {
      return response.data;
    }

    throw new Error('Error updating profile');
  } catch (error) {
    throwDevOrProd(error, new Error('Error updating profile'));
  }
};

export const updateUserProfilePhoto = async ({
  userId,
  formData,
}: {
  userId: string;
  formData: FormData;
}) => {
  if (!userId || !formData) throw new Error('Invalid Data Passed');

  try {
    const res = await request.post(`/customer/${userId}`, formData);

    if (res && res.data.status) {
      return res.data;
    }

    throw new Error('Error updating profile photo');
  } catch (error) {
    throwDevOrProd(error, new Error('Error updating profile photo'));
  }
};
