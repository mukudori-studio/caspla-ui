import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import {Textarea} from './'

export default {
  title: 'Atoms/Forms/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />

export const Default = Template.bind({});

export const WithError = Template.bind({});
WithError.args = {
  error: '入力必須項目となります。'
}

