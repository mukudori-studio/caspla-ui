import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'default'],
      },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Button',
};
