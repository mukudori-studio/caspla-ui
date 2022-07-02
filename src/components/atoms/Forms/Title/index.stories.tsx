import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormTitle from './'

export default {
  title: 'Atoms/Forms/FormTitle',
  component: FormTitle,
} as ComponentMeta<typeof FormTitle>

const Template: ComponentStory<typeof FormTitle> = (args) => <FormTitle {...args} />

export const Default = Template.bind({});
Default.args = {
  title: 'フォームタイトル'
}

