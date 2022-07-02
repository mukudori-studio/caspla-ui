import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RhfTextArea } from './';

export default {
  title: 'Molecules/Forms/RhfTextArea',
  component: RhfTextArea,
  argTypes: {
    onChange: { action: 'onChange' }
  },
} as ComponentMeta<typeof RhfTextArea>;

const Template: ComponentStory<typeof RhfTextArea> = (args) => <RhfTextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  checkboxes: [
    { id: 'val1', value: 'val1', label: 'ラベル1', checked: false},
    { id: 'val2', value: 'val2', label: 'ラベル2', checked: true},
    { id: 'val3', value: 'val3', label: 'ラベル3', checked: false},
    { id: 'val4', value: 'val4', label: 'ラベル4', checked: true},
  ]
};