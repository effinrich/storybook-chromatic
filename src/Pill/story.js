import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import Pill from '.'

storiesOf('Pill', module)
  .addDecorator(Decorator)
  .add('small (default)', () => <Pill>Whammmy</Pill>)
  .add('medium', () => <Pill size="medium">Whammmy</Pill>)
  .add('large', () => <Pill size="large">Whammmy</Pill>)
  .add('custom bg & color', () => (
    <Pill size="large" bg="pink" color="black">
      Whammmy
    </Pill>
  ))
  .add('custom bg (auto-detected text color)', () => (
    <Pill size="large" bg="yellow">
      Whammmy
    </Pill>
  ))
  .add('Pill Style: default', () => (
    <Pill size="large" pillStyle="default">
      Whammmy
    </Pill>
  ))
  .add('Pill Style: warning', () => (
    <Pill size="large" pillStyle="warning">
      Whammmy
    </Pill>
  ))
  .add('Pill Style: error', () => (
    <Pill size="large" pillStyle="error">
      Whammmy
    </Pill>
  ))
  .add('Pill Style: success', () => (
    <Pill size="large" pillStyle="success">
      Whammmy
    </Pill>
  ))
  .add('Pill Style: info', () => (
    <Pill size="large" pillStyle="info">
      Whammmy
    </Pill>
  ))
  .add('Using color values', () => (
    <div>
      <Pill size="large" colorValue={0}>
        Whammmy
      </Pill>
      <Pill size="large" colorValue={1}>
        Whammmy
      </Pill>
      <Pill size="large" colorValue={2}>
        Whammmy
      </Pill>
      <Pill size="large" colorValue={3}>
        Whammmy
      </Pill>
    </div>
  ))
