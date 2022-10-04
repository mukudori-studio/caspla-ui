import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopOver from './';

export default {
  title: 'Molecules/PopOver',
  component: PopOver,
} as ComponentMeta<typeof PopOver>;

const Template: ComponentStory<typeof PopOver> = (args) => <PopOver {...args}><div>test</div></PopOver>;

export const Default = Template.bind({})
