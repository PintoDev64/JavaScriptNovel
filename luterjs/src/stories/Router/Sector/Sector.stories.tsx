import type { Meta, StoryObj } from '@storybook/react'

import Sector from './Sector'

import Router from '..'

const meta = {
    title: 'LuterJs/Router/Sector',
    component: Sector,
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
} satisfies Meta<typeof Sector>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {};
