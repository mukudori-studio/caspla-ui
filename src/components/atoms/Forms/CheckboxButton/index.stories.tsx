import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxButton from './';

export default {
  title: 'Atoms/Forms/CheckboxButton',
  component: CheckboxButton,
  argTypes: {
    onChange: { action: 'onChange' }
  },
} as ComponentMeta<typeof CheckboxButton>;

const Template: ComponentStory<typeof CheckboxButton> = (args) => <CheckboxButton {...args} />;

const checkboxData = {
  id: 'val1',
  value: 'val1',
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