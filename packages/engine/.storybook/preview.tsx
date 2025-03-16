import React from 'react';
import type { Decorator, Preview } from '@storybook/react'
import { NovelJsWebContextComponent } from "../src/context/NovelJsWeb"

const NovelJsContext: Decorator = (Story) => {
  return (
    <NovelJsWebContextComponent>
      <Story />
    </NovelJsWebContextComponent>
  )
}

const preview: Preview = {
  decorators: [NovelJsContext],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;