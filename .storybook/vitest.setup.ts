import { setProjectAnnotations } from '@storybook/react-vite'
// oxlint-disable-next-line no-namespace
import * as previewAnnotations from './preview.tsx'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([previewAnnotations])
