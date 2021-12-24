import React from 'react'
import { storiesOf /*, action */ } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Stage } from 'components/StoryDecorators'
import theme from 'theme'

import LogoBug from '.'

storiesOf('Icons/LogoBug', module)
  .addDecorator(Decorator)
  .add('on brand', () => (
    <Stage
      width={100}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
      bg={theme.brandColor}
    >
      <LogoBug size={50} reverse />
    </Stage>
  ))
  .add('default size', () => (
    <Stage
      width={100}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
    >
      <LogoBug />
    </Stage>
  ))
  .add('50x50', () => (
    <Stage
      width={100}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
    >
      <LogoBug size={50} />
    </Stage>
  ))
  .add('reverse', () => (
    <Stage
      width={100}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
      bg="black"
    >
      <LogoBug size={50} reverse />
    </Stage>
  ))
  .add('override fill', () => (
    <Stage
      width={250}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
      bg="black"
    >
      <LogoBug fill="red" />
    </Stage>
  ))
