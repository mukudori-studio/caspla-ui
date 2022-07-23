import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BookmarkedItem from './'

export default {
  title: 'Organisms/BookmarkedItem',
  component: BookmarkedItem,
} as ComponentMeta<typeof BookmarkedItem>

const Template: ComponentStory<typeof BookmarkedItem> = (args) => <BookmarkedItem {...args} onClick={onClick} />

const onClick = (id:any) => console.log(id)

export const Default = Template.bind({});
Default.args = {
  thumbnailImage: '',
  casplaId: 'test',
  fullName: 'aaaa'
}
