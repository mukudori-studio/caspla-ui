import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CoverImageUploader from './'

export default {
  title: 'Organisms/CoverImageUploader',
  component: CoverImageUploader,
} as ComponentMeta<typeof CoverImageUploader>

const Template: ComponentStory<typeof CoverImageUploader> = (args) => <CoverImageUploader {...args} onChange={changeThumbnail} />

const changeThumbnail = (data: string) => console.log(data)

export const Default = Template.bind({})
Default.args = {
  id: 'val1'
}

export const WithImage = Template.bind({})
WithImage.args = {
  id: 'val1',
  thumbnailUrl: 'https://wpb.shueisha.co.jp/kinnikuman/img/chojinTokushu_page_title.svg'
}
