import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ItemSearchUnit from '.';

export default {
  title: 'Organisms/ItemSearchUnit',
  component: ItemSearchUnit,
} as ComponentMeta<typeof ItemSearchUnit>

const Template: ComponentStory<typeof ItemSearchUnit> = () => <ItemSearchUnit />

export const Default = Template.bind({});
