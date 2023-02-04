import { useAuth } from 'components/lib/auth';
import { FC, useState } from 'react';
import PersonalInfo from './personal-info';
import UpdatePersonalInfoModal from './update-personal-info-modal';
import UpdateProfilePhoto from './update-profile-photo';

const IndividualPersonalSettings: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      <UpdateProfilePhoto />
      <div className="flex w-full flex-col rounded-lg bg-white">
        <PersonalInfo openModal={openModal} fieldName="Full Name" value={user?.fullName || ''} />
        <PersonalInfo openModal={openModal} fieldName="Phone Number" value={user?.phoneNumber} />
        <PersonalInfo openModal={openModal} fieldName="Date of Birth" value={user?.dateOfBirth} />
        <PersonalInfo openModal={openModal} fieldName="Gender" value={user?.gender} />
        <PersonalInfo openModal={openModal} fieldName="Address" value={user?.address} />
      </div>
      <div>
        <UpdatePersonalInfoModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
};

export default IndividualPersonalSettings;
