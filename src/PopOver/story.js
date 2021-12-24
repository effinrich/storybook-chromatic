import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'

import Decorator from 'utils/storybook'

import { PopOverWithButton } from './story.wrappers'
// import {Padding} from 'components/StoryDecorators'
// import ShadowBox from '../ShadowBox'
// import Menu from '../Menu'
// import MenuItem from '../MenuItem'
// import PopOver from '.'

storiesOf('PopOver', module)
  .addDecorator(Decorator)
  .addDecorator(withKnobs)
  .add('button trigger (left align)', () => <PopOverWithButton />)
  .add('button trigger (right align)', () => (
    <PopOverWithButton hAlign="right" />
  ))
