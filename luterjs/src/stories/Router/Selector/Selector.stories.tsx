import type { Meta, StoryObj } from '@storybook/react'

import Selector from './Selector'

import Router from '..'

const meta = {
    title: 'LuterJs/Router/Selector',
    component: Selector,
    tags: ['autodocs'],
    decorators: [
        (StoryComponent) => {
            return (
                <Router>
                    <StoryComponent />
                </Router>
            )
        }
    ],
} satisfies Meta<typeof Selector>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {};
