import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchKeyword from '.'

export default {
  title: 'Molecules/SearchKeyword',
  component: SearchKeyword,
} as ComponentMeta<typeof SearchKeyword>

const click = () => console.log('click')
const Template: ComponentStory<typeof SearchKeyword> = () => <SearchKeyword onClick={click} />

export const Default = Template.bind({})
