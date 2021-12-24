import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import reduce from 'lodash/reduce'
import { Map } from 'immutable'

import Decorator from 'utils/storybook'
import { Stage } from 'components/StoryDecorators'

import fetchLocationsFixture from 'fixtures/fetch-locations.json'
import { normalizeLocations } from 'store/normalizers'
import { Location } from 'models'
import LocationSelector from '.'

const normalizedData = normalizeLocations(fetchLocationsFixture.data)
const locations = reduce(
  normalizedData.entities.location,
  (m, location, id) => m.set(id, new Location(location)),
  new Map()
)
const activeLocation = locations.first()

storiesOf('LocationSelector', module)
  .addDecorator(Decorator)
  .add('fixed width', () => (
    <Stage height="800px" flex={{ align: 'center', justify: 'center' }}>
      <LocationSelector
        locations={locations}
        activeLocation={activeLocation}
        width={350}
        onChange={action('onChange')}
      />
    </Stage>
  ))
  .add('full width', () => (
    <Stage height="800px" flex={{ align: 'center', justify: 'center' }}>
      <LocationSelector
        locations={locations}
        activeLocation={activeLocation}
        fullWidth
        onChange={action('onChange')}
      />
    </Stage>
  ))
// .add('responsive', () => (
//   <Stage height="800px" flex={{ align: 'center', justify: 'center' }}>
//     <LocationSelector width={350} fullWidth={[true, false]} />
//   </Stage>
// ))
