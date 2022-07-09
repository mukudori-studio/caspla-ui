import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DateSelect from './';

export default {
  title: 'Molecules/Forms/DateSelect',
  component: DateSelect,
} as ComponentMeta<typeof DateSelect>;

const onChangeDate = (date: string) => console.log(date)

const Template: ComponentStory<typeof DateSelect> = (args) => <DateSelect {...args} onChange={onChangeDate} />

export const Default = Template.bind({})
