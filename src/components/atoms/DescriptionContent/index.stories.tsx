import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import DescriptionContent from './'

export default {
  title: 'Atoms/DescriptionContent',
  component: DescriptionContent,
} as ComponentMeta<typeof DescriptionContent>

const Template: ComponentStory<typeof DescriptionContent> = (args) => <DescriptionContent {...args} />

export const Default = Template.bind({});
Default.args = {
  text: 'あまりに残虐なファイトを繰り返したために、宇宙の一角に封じ込められたバッファローマンら7人の悪魔超人たちが復活。悪魔超人らはミートの体をバラバラにして人質とし、超人オリンピックV2チャンピオンのキン肉マンに挑戦状を叩きつけた。今までライバルであったロビンマスクやウォーズマン、ブロッケンJr.、ウルフマン、ラーメンマン（モンゴルマン）らが仲間として加わり、アニメでは彼らとキン肉マンの友情が強く描かれた。またアニメにおいてはこの時点ではマリとキン肉マンは恋人同然の関係となっている。'
}
