import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './';

export default {
  title: 'Molecules/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}><div>test</div></Card>;

export const Default = Template.bind({})
