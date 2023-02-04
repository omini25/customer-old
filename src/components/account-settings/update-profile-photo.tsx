import { Avatar } from 'components/icons';
import { BsCameraFill } from 'react-icons/bs';
import { updateUserProfilePhoto } from 'lib/requests';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { FC, useRef } from 'react';
import { useAuth } from 'components/lib/auth';

const UpdateProfilePhoto: FC = () => {
  const { user } = useAuth();
  const profileImageRef = useRef<HTMLInputElement | null>(null);

  const updateProfilePhoto = async () => {
    const { filename, userId, image } = getPhotoData();
    const formData = new FormData();
    formData.append('customer_path', image, filename);
    updateProfilePhotoMutation.mutate({ userId, formData });
  };

  const getPhotoData = (): { userId: string; image: File; filename: string } => {
    const images = profileImageRef.current?.files as FileList;
    const image = images[0];
    const filename = image.name;
    const userId = user?.id || '';

    return {
      userId,
      image,
      filename,
    };
  };

  const updateProfilePhotoMutation = useMutation(updateUserProfilePhoto, {
    onError: () => {
      toast.error('Failed to update profile photo');
    },
    onSuccess: (data: any) => {
      if (data && data.status) {
        toast.success('Profile Photo Updated');
        window.location.reload();
      } else {
        toast.error(data?.message || 'Failed to update profile photo');
      }
    },
  });

  return (
    <div className="flex w-full flex-row justify-center">
      <div
        className="relative rounded-full border border-[#c4c4c4]"
        title="update your profile photo"
      >
        <Avatar className="my-0 text-[8rem]" />
        {/* user.customer_path === '' ? (
          <Avatar className="text-[8rem] my-0" />
        ) : (
          <img
            src={user.customerPath}
            alt="profile-photo"
            className="w-[8rem] h-[8rem] rounded-[50%]"
          />
        ) */}
        <input
          onChange={() => updateProfilePhoto()}
          ref={profileImageRef}
          type="file"
          accept="image/*"
          id="profile-photo"
          className="hidden"
        />
        <label
          htmlFor="profile-photo"
          className="absolute bottom-2 right-2 z-10 flex h-[38px] w-[38px] cursor-pointer flex-col items-center justify-center rounded-[50%] bg-daabo-primary"
        >
          <BsCameraFill className="fill-white text-xl" />
        </label>
      </div>
    </div>
  );
};

export default UpdateProfilePhoto;
