import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PageTitle from './'

export default {
  title: 'Atoms/Forms/PageTitle',
  component: PageTitle,
} as ComponentMeta<typeof PageTitle>

const Template: ComponentStory<typeof PageTitle> = (args) => <PageTitle {...args} />

export const Default = Template.bind({});
Default.args = {
  title: 'フォームタイトル'
}

