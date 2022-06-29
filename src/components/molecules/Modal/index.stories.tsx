import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const toggleModal = (e:any) => {
  if (e.target === e.currentTarget) {
    console.log('close')
  }
};

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} close={toggleModal}><div>test</div></Modal>;

export const Default = Template.bind({});
