import React from 'react'
import { storiesOf /*, action */ } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Stage } from 'components/StoryDecorators'
import theme from 'theme'

import LogoText from '.'

storiesOf('Icons/LogoText', module)
  .addDecorator(Decorator)
  .add('on brand', () => (
    <Stage
      width={250}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
      bg={theme.brandColor}
    >
      <LogoText reverse />
    </Stage>
  ))
  .add('default', () => (
    <Stage
      width={250}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
    >
      <LogoText />
    </Stage>
  ))
  .add('reverse', () => (
    <Stage
      width={250}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
      bg="black"
    >
      <LogoText reverse />
    </Stage>
  ))
  .add('override fill', () => (
    <Stage
      width={250}
      height={100}
      flex={{ align: 'center', justify: 'center' }}
      bg="black"
    >
      <LogoText fill="red" />
    </Stage>
  ))
