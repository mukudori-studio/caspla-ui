import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchKeyword from '.';

export default {
  title: 'Molecules/SearchKeyword',
  component: SearchKeyword,
} as ComponentMeta<typeof SearchKeyword>;

const Template: ComponentStory<typeof SearchKeyword> = () => <SearchKeyword />;

export const Default = Template.bind({});
