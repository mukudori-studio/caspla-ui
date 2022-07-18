import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TalentProfile from './';

export default {
  title: 'Organisms/TalentProfile',
  component: TalentProfile,
} as ComponentMeta<typeof TalentProfile>;

const Template: ComponentStory<typeof TalentProfile> = (args) => <TalentProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  gender: 'woman',
  birthYear: 1000,
  birthMonth: 5,
  birthDay: 31,
  age: 24,
  starSign: 'pisces',
  birthplace: '世界のどこか',
  bloodType: 'ab',
  height: 167,
  weight: 50,
  bust: 99.9,
  waist: 55.5,
  hip: 88.8,
  footSize: 23,
  history: '現実世界においてもセクシーさや格好良さなどの魅力のシンボルとして、よく例として挙げられ、代名詞として定着している。特にグラビアジャンルでは“リアル峰不二子”という呼称が使われることがある。`nまたフィクションのキャラクターでありながらその完成度をもってリアルな理想として女性を牽引しており[14]、女性からのリクエストに応える形でバンダイの化粧品ブランド「CreerBeaute（クレアボーテ）」が不二子のセクシーさをコンセプトにしたリップグロス、アイライナー、マスカラなどを発売し[19]、「アンフィ（AMPHI）」によるコラボ「グラマリッチブラ」や[20]、「TRAIN（トレイン）」とのコラボでストッキングなどを扱う「《女の欲望》峰不二子」シリーズが発売されている[21]。2019年にはUSJのイベントで販売されたグッズが女性に人気を博し、これらは一般販売されるグッズとしては際どいデザインながら担当者によれば「峰不二子だからチャレンジできた」ものである。',
  note: '漫画『名探偵コナン』の登場人物である工藤有希子とベルモット / シャロン・ヴィンヤードは不二子がモデルとなっており、原作者の青山剛昌は「工藤有希子がいいほうの峰不二子、ベルモットが悪い時の峰不二子」と表現している。また、有希子の旧姓「藤峰」は「峰不二」を逆さ読みにしており、名前はTV第1シリーズで不二子の声優を務めた二階堂有希子から由来している。'
}
