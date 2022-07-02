import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SNSLinksArea from './';

export default {
  title: 'Organisms/SNSLinksArea',
  component: SNSLinksArea,
} as ComponentMeta<typeof SNSLinksArea>;

const Template: ComponentStory<typeof SNSLinksArea> = (args) => <SNSLinksArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  siteUrl: 'dummy',
  blogUrl: 'dummy',
  facebook: 'dummy',
  twitter: 'dummy',
  instagram: 'dummy',
  youtube: 'dummy',
  tiktok: 'dummy',
}
