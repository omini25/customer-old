import { ComponentMeta, ComponentStory } from '@storybook/react';
import SideBar from '../side-bar';

export default {
  title: 'Library/Sidebar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Default = Template.bind({});
