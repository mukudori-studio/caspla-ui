import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProdcutionDetailHeader from './';

export default {
  title: 'Organisms/ProdcutionDetailHeader',
  component: ProdcutionDetailHeader,
} as ComponentMeta<typeof ProdcutionDetailHeader>;

const Template: ComponentStory<typeof ProdcutionDetailHeader> = (args) => <ProdcutionDetailHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'キン肉マンソルジャー',
  productionId: 'production',
  siteUrl: 'hoge',
  blogUrl: 'hoge',
  facebook: 'hoge',
  twitter: 'hoge',
  instagram: 'hoge',
  tiktok: 'hoge',
  youtube: 'hoge',
}