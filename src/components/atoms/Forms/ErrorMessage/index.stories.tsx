import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ErrorMessage from './'

export default {
  title: 'Atoms/Forms/ErrorMessage',
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />

export const Default = Template.bind({});
Default.args = {
  text: '入力必須項目となります。'
}

