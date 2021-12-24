import React from 'react'
import { storiesOf /*, action */ } from '@storybook/react'

import Decorator from 'utils/storybook'

import { Padding } from 'components/StoryDecorators'
import ShadowBox from '.'

storiesOf('ShadowBox', module)
  .addDecorator(Decorator)
  .add('Level 1', () => (
    <Padding>
      <ShadowBox level={1}>
        <div style={{ width: 150, height: 200 }} />
      </ShadowBox>
    </Padding>
  ))
  .add('Level 2 (default)', () => (
    <Padding>
      <ShadowBox>
        <div style={{ width: 150, height: 200 }} />
      </ShadowBox>
    </Padding>
  ))
  .add('Level 3', () => (
    <Padding>
      <ShadowBox level={3}>
        <div style={{ width: 150, height: 200 }} />
      </ShadowBox>
    </Padding>
  ))
