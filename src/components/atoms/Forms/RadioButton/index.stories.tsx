import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RadioButton from '.';

export default {
  title: 'Atoms/Forms/RadioButton',
  component: RadioButton,
  argTypes: {
    checked: { type: 'boolean' }
  }
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'radio1',
  label: 'ラジオ1',
}

export const WithNote = Template.bind({});
WithNote.args = {
  id: 'radio1',
  label: 'ラジオ1',
  note: 'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト'
}
