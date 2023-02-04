import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FC } from 'react';
import DeviceSkeleton from '../devices/device-skeleton';

export default {
  title: 'Skeletons/Device-Skeleton',
  component: DeviceSkeleton,
} as ComponentMeta<typeof DeviceSkeleton>;

const Box: FC = ({ children }) => <div className="w-[300px]">{children}</div>;
const Container: FC = ({ children }) => <div className="flex flex-col">{children}</div>;

const Template: ComponentStory<typeof DeviceSkeleton> = () => <DeviceSkeleton />;

export const Default = Template.bind({});

export const FixedWidthWrapper = Template.bind({});
FixedWidthWrapper.decorators = [
  (Story) => (
    <Box>
      <Story />
    </Box>
  ),
];

export const Stacked = Template.bind({});
Stacked.decorators = [
  (Story) => (
    <Container>
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <Box key={index}>
            <Story />
          </Box>
        ))}
    </Container>
  ),
];
