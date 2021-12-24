import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Padding } from 'components/StoryDecorators'
import Decorator from 'utils/storybook'

import LocationDetails from '.'
import ShadowBox from '../ShadowBox'
import { Location } from 'models'
import locationsFixture from 'fixtures/fetch-locations.json'

const location = new Location(locationsFixture.data[0])

storiesOf('LocationDetails', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding>
      <LocationDetails location={location} onChange={action('onChange')} />
    </Padding>
  ))
  .add('w/ShadowBox', () => (
    <Padding>
      <ShadowBox level={1} fullWidth>
        <LocationDetails location={location} onChange={action('onChange')} />
      </ShadowBox>
    </Padding>
  ))
