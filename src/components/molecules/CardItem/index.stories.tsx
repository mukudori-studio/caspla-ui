import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CardItem from './';

export default {
  title: 'Molecules/CardItem',
  component: CardItem,
} as ComponentMeta<typeof CardItem>;

const Template: ComponentStory<typeof CardItem> = (args) => <CardItem {...args} />;

const data = {
  id: 1,
  thumbnail: '',
  name: 'タレント名',
  displayName: 'casplaId',
  profile: '説明分が入ります。',
  activity: ['musician', 'idol'],
}

export const Logined = Template.bind({});
Logined.args = {
  ...data,
  withBookmark: true
};

export const UnLogined = Template.bind({});
UnLogined.args = {
  ...data,
  withBookmark: false
};
