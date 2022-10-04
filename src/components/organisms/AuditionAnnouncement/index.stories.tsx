import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuditionAnnouncement from './';

export default {
  title: 'Organisms/AuditionAnnouncement',
  component: AuditionAnnouncement,
} as ComponentMeta<typeof AuditionAnnouncement>;

const Template: ComponentStory<typeof AuditionAnnouncement> = () => <AuditionAnnouncement />;

export const Default = Template.bind({});
