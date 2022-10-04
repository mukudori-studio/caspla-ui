import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Nodata from './'

export default {
  title: 'Atoms/Nodata',
  component: Nodata,
} as ComponentMeta<typeof Nodata>

const Template: ComponentStory<typeof Nodata> = (args) => <Nodata {...args} />

export const Default = Template.bind({});
Default.args = {
  text: 'データがありません'
}
