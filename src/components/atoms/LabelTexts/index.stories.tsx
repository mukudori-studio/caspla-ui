import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LabelTexts from './'

export default {
  title: 'Atoms/LabelTexts',
  component: LabelTexts,
} as ComponentMeta<typeof LabelTexts>

const Template: ComponentStory<typeof LabelTexts> = (args) => <LabelTexts {...args} />

const textsData = ['スピリタス', '電気ブラン']

export const Gray = Template.bind({});
Gray.args = {
  texts: textsData
}

export const Purple = Template.bind({});
Purple.args = {
  texts: textsData,
  color: 'purple'
}