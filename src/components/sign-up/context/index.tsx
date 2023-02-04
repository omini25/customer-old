import { useRouter } from 'next/router';
import { X_API_KEY, API_URL } from '../../../constants';
import { createContext, FC, useContext, useEffect, useState } from 'react';

interface SignupContextInterface {
  formData: any;
  updateFormData: (data: any) => void;
  businessTypes: any[];
}

const defaultValue = { formData: {}, updateFormData: () => {}, businessTypes: [] };

export const SignupContext = createContext<
  SignupContextInterface | { formData: {}; updateFormData: () => {}; businessTypes: [] }
>(defaultValue);

const SignupProvider: FC = ({ children }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [businessTypes, setBusinessTypes] = useState([]);

  const updateFormData = (data: any): void => {
    setFormData((prev: any) => ({
      ...prev,
      ...data,
    }));
  };

  const resetFormData = () => setFormData({});

  useEffect(() => {
    if (router.asPath === '/signup' || router.asPath === '/signup?step=2') {
      // reset form data when a user goes to initial sign up page
      resetFormData();
    }
  }, [router]);

  useEffect(() => {
    const fetchCompanyTypes = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'X-API-KEY': X_API_KEY,
        },
      };
      try {
        const response = await fetch(`${API_URL}/business_type`, requestOptions);
        const data = await response.json();
        if (data.status) {
          const { payload } = data;
          const { table_data } = payload;
          setBusinessTypes(table_data);
        }
      } catch {}
    };
    fetchCompanyTypes();
  }, []);

  return (
    <SignupContext.Provider value={{ formData, updateFormData, businessTypes }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignUpForm = () => useContext(SignupContext);

export default SignupProvider;
