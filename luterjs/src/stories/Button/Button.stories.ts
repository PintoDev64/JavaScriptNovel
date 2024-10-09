import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

const meta = {
  title: 'LuterJs/Button',
  component: Button,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    dark: false,
    primary: true,
    label: 'Button'
  }
};

export const Secondary: Story = {
  args: {
    dark: false,
    label: 'Button'
  }
};
