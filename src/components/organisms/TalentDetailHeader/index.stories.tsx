import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TalentDetailHeader from './';

export default {
  title: 'Organisms/TalentDetailHeader',
  component: TalentDetailHeader,
} as ComponentMeta<typeof TalentDetailHeader>;

const Template: ComponentStory<typeof TalentDetailHeader> = (args) => <TalentDetailHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  activity: ['musician'],
  name: 'キン肉マンソルジャー',
  agencyId: 'production',
  agencyName: 'ゆでたまご',
  casplaId: 'mustleManSoldier',
  siteUrl: 'hoge',
  blogUrl: 'hoge',
  facebook: 'hoge',
  twitter: 'hoge',
  instagram: 'hoge',
  tiktok: 'hoge',
  youtube: 'hoge',
}