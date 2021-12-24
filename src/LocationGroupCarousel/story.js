import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { arrayMove } from 'react-sortable-hoc'

import { Stage } from 'components/StoryDecorators'
import Decorator from 'utils/storybook'
import itemsArray from './items.json'

import LocationGroupCarousel from '.'

// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
const handleDragEnd = (result) => {
  // console.log(result)
}

storiesOf('LocationGroupCarousel', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Stage height="800px" flex={{ align: 'center', justify: 'center' }}>
      <LocationGroupCarousel onDragEnd={handleDragEnd} items={itemsArray} />
    </Stage>
  ))
