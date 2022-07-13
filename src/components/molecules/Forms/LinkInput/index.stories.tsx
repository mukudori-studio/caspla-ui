import React from 'react'
import { RecoilRoot } from 'recoil'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LinkInput from '.';

export default {
  title: 'Molecules/Forms/LinkInput',
  component: LinkInput,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as ComponentMeta<typeof LinkInput>;

const Template: ComponentStory<typeof LinkInput> = (args) => <LinkInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'val',
  register: () => {}
}

export const WithError = Template.bind({});
WithError.args = {
  id: 'val',
  register: () => {},
  error: 'hoge',
  type: 'blog'
}
