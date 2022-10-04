import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TalentLinkCard from './'

export default {
  title: 'Atoms/TalentLinkCard',
  component: TalentLinkCard,
} as ComponentMeta<typeof TalentLinkCard>

const Template: ComponentStory<typeof TalentLinkCard> = (args) => <TalentLinkCard {...args} />

export const Default = Template.bind({});
Default.args = {
  casplaId: 'test',
  name: 'タレント名A'
}
