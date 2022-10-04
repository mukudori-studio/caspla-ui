import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxButtons from './';

export default {
  title: 'Molecules/Forms/CheckboxButtons',
  component: CheckboxButtons,
  argTypes: {
    onChange: { action: 'onChange' }
  },
} as ComponentMeta<typeof CheckboxButtons>;

const Template: ComponentStory<typeof CheckboxButtons> = (args) => <CheckboxButtons {...args} />;

export const Default = Template.bind({});
Default.args = {
  checkedItems: ['val1', 'val3'],
  checkboxes: [
    { id: 'val1', value: 'val1', text: 'ラベル1'},
    { id: 'val2', value: 'val2', text: 'ラベル2'},
    { id: 'val3', value: 'val3', text: 'ラベル3'},
    { id: 'val4', value: 'val4', text: 'ラベル4'},
  ]
};