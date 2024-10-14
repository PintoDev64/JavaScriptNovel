import type { Meta, StoryObj } from '@storybook/react'

import LuterJsContextProvider from '../../context'

import Toast from './Toast'

const meta = {
  title: 'LuterJs/Toast',
  component: Toast,
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    layout: 'centered'
  },
  decorators: [
    (StoryComponent) => {
      return (
        <LuterJsContextProvider>
          <StoryComponent />
        </LuterJsContextProvider>
      )
    }
  ],
  tags: ['autodocs']
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {}
}
