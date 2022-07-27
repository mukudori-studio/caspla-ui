import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ThumbnailUploader from './'

export default {
  title: 'Organisms/ThumbnailUploader',
  component: ThumbnailUploader,
} as ComponentMeta<typeof ThumbnailUploader>

const Template: ComponentStory<typeof ThumbnailUploader> = (args) => <ThumbnailUploader {...args} onChange={changeThumbnail} />

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

export const Logo = Template.bind({})
Logo.args = {
  id: 'val1',
  type: 'logo'
}