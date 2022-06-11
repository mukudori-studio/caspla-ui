import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchArea from '.';

export default {
  title: 'Organisms/SearchArea',
  component: SearchArea,
} as ComponentMeta<typeof SearchArea>;

const Template: ComponentStory<typeof SearchArea> = () => <SearchArea />;

export const Default = Template.bind({});
