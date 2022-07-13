import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormNote from './'

export default {
  title: 'Atoms/Forms/Note',
  component: FormNote,
} as ComponentMeta<typeof FormNote>

const Template: ComponentStory<typeof FormNote> = (args) => <FormNote {...args} />

export const Default = Template.bind({});
Default.args = {
  text: '補足テキストが入ります。'
}

