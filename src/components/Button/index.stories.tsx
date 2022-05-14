import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select', 
        options: ['small', 'medium', 'large']
      }
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  text: 'Button'
}
