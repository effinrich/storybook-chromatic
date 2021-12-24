import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import LoadingView from '.'

storiesOf('LoadingView', module)
  .addDecorator(Decorator)
  .add('naked story', () => <LoadingView loadingText="Things are loading." />)
  .add('w/show', () => (
    <LoadingView loadingText="Things are loading." show={false} />
  ))
  .add('w/showText', () => (
    <LoadingView loadingText="Things are loading." showText={false} />
  ))
  .add('w/scale', () => (
    <LoadingView loadingText="Things are loading." scale={0.5} />
  ))
  .add('w/fullscreen', () => (
    <LoadingView loadingText="Things are loading." scale={0.5} fullscreen />
  ))
  .add('w/showSubText', () => (
    <LoadingView
      loadingText="Things are loading."
      scale={0.5}
      showSubText={false}
    />
  ))
