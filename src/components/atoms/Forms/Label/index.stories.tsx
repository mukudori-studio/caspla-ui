import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormLabel from './'

export default {
  title: 'Atoms/Forms/Label',
  component: FormLabel,
} as ComponentMeta<typeof FormLabel>

const Template: ComponentStory<typeof FormLabel> = (args) => <FormLabel {...args} />

export const Default = Template.bind({});
Default.args = {
  text: 'ラベル名',
  label: 'input',
}

