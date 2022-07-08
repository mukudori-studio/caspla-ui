import React from 'react'
import { RecoilRoot } from 'recoil'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Select from '.';

export default {
  title: 'Atoms/Forms/Select',
  component: Select,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

const optionsData = [
  { value: '1', text: 'option1' },
  { value: '2', text: 'option2' },
  { value: '3', text: 'option3' },
]

export const Default = Template.bind({});
Default.args = {
  options: optionsData,
  placeholder: '選択してください。'
}

export const Required = Template.bind({});
Required.args = {
  options: optionsData,
  required: true
}

export const Selected = Template.bind({});
Selected.args = {
  options: optionsData,
  selected: '2'
}
