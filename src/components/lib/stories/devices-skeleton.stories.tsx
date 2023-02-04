import { ComponentMeta, ComponentStory } from '@storybook/react';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import DevicesSkeleton from '../devices/devices-skeleton';

export default {
  title: 'Skeletons/Devices-Skeleton',
  component: DevicesSkeleton,
} as ComponentMeta<typeof DevicesSkeleton>;

const MockNetworkRequestWrapper: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {isLoading && <div>{children}</div>}
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Content Loaded
        </motion.div>
      )}
    </div>
  );
};

const Template: ComponentStory<typeof DevicesSkeleton> = (args) => <DevicesSkeleton {...args} />;

export const Default = Template.bind({});

export const MockedNetworkRequest = Template.bind({});
MockedNetworkRequest.decorators = [
  (Story) => (
    <MockNetworkRequestWrapper>
      <Story />
    </MockNetworkRequestWrapper>
  ),
];
