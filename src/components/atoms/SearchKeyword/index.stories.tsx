import React from 'react'
import { RecoilRoot } from 'recoil'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchKeyword from '.';

export default {
  title: 'Atoms/SearchKeyword',
  component: SearchKeyword,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as ComponentMeta<typeof SearchKeyword>;

const Template: ComponentStory<typeof SearchKeyword> = () => <SearchKeyword />;

export const Default = Template.bind({});
