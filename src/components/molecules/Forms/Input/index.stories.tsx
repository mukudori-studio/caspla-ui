import React from 'react'
import { RecoilRoot } from 'recoil'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from '.';

export default {
  title: 'Atoms/Forms/Input',
  component: Input,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'val',
  register: () => {}
}

export const WithError = Template.bind({});
WithError.args = {
  id: 'val',
  register: () => {},
  error: 'hoge'
}
