import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Checkbox from './';

export default {
  title: 'Atoms/Forms/Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: { action: 'onChange' }
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

const checkboxData = {
  id: 'val1',
  label: 'ラベル1'
}

export const Default = Template.bind({});
Default.args = {
  ...checkboxData,
  checked: false
};

export const Checked = Template.bind({});
Checked.args = {
  ...checkboxData,
  checked: true
};