import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Switch from './Switch'

const meta = {
  title: 'LuterJs/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    defaultValue: false
  }
};
