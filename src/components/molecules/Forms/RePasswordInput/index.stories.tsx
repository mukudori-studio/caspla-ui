import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RePasswordInput from '.';

export default {
  title: 'Molecules/Forms/RePasswordInput',
  component: RePasswordInput,
} as ComponentMeta<typeof RePasswordInput>

const Template: ComponentStory<typeof RePasswordInput> = (args) => <RePasswordInput {...args} />

export const Default = Template.bind({});
Default.args = {
  id: 'val',
  register: () => {},
  password: ''
}

export const WithError = Template.bind({});
WithError.args = {
  id: 'val',
  register: () => {},
  password: ''
}
