import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PasswordInput from '.';

export default {
  title: 'Molecules/Forms/PasswordInput',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>

const Template: ComponentStory<typeof PasswordInput> = (args) => <PasswordInput {...args} />

export const Default = Template.bind({});
Default.args = {
  id: 'val',
  register: () => {},
  placeholder: 'hoge'
}

export const WithError = Template.bind({});
WithError.args = {
  id: 'val',
  register: () => {},
  error: 'hoge'
}
