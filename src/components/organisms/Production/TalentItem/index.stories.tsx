import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TalentItem from './'

export default {
  title: 'Organisms/Production/TalentItem',
  component: TalentItem,
  argTypes: {
    onChange: { action: 'onChange' }
  },
} as ComponentMeta<typeof TalentItem>

const Template: ComponentStory<typeof TalentItem> = (args) => <TalentItem {...args} onChange={onChange} />

const onChange = (e:any) => console.log(e)

const checkboxData = {
  id: 'val1',
  value: 'val1',
  label: 'ラベル1',
  thumbnailImage: '',
  casplaId: 'test',
  fullName: 'aaaa'
}

export const Default = Template.bind({});
Default.args = {
  ...checkboxData,
  checked: false
};

export const Checked = Template.bind({});
Checked.args = {
  ...checkboxData,
  checked: true
};