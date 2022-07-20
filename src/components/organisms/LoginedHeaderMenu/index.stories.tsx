import React from 'react'
import { RecoilRoot } from 'recoil'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LoginedHeaderMenu from './'

export default {
  title: 'Organisms/LoginedHeaderMenu',
  component: LoginedHeaderMenu,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as ComponentMeta<typeof LoginedHeaderMenu>

const Template: ComponentStory<typeof LoginedHeaderMenu> = (args) => <LoginedHeaderMenu />

const data = {
  id: 1,
  thumbnail: '',
  name: 'タレント名',
  displayName: 'casplaId',
  profile: '説明分が入ります。',
  activity: ['musician', 'idol'],
}

export const Logined = Template.bind({});
Logined.args = {
  ...data,
  roles: ['talent'],
  casplaId: 'test1',
  name: '筋肉 太郎',
  agencyName: 'ゆでたまご'
}