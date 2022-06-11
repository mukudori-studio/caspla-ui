import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BookMark from './';

export default {
  title: 'Atoms/BookMark',
  component: BookMark,
  argTypes: {
    
    
  },
} as ComponentMeta<typeof BookMark>;

const Template: ComponentStory<typeof BookMark> = (args) => <BookMark {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true
};