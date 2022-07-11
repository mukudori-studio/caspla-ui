import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LinkButton from './'

export default {
  title: 'Atoms/LinkButton',
  component: LinkButton,
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
    weight: {
      control: {
        type: 'select',
        options: ['normal', 'bold'],
      },
    },
  },
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />

export const Default = Template.bind({});
Default.args = {
  href: 'hoge/',
  text: 'Button',
};
