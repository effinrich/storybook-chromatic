import React from 'react'
import { storiesOf } from '@storybook/react'
import { Padding } from 'components/StoryDecorators'
import Decorator from 'utils/storybook'
import { List } from 'immutable'

import GoogleLocationCard from '.'
import ShadowBox from 'components/ShadowBox'

const googlePlaceDetails = {
  photos: new List([
    {
      isPrimary: true,
      url: 'https://www.theplace2.ru/archive/charles_bronson/img/passager_de_la_pluie1.jpg',
    },
  ]),
  name: 'Test place',
  address: '1234 Test St',
  city: 'Test City',
  state: 'Test State',
  zipcode: '12345',
}

storiesOf('GoogleLocationCard', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding>
      <GoogleLocationCard googlePlace={googlePlaceDetails} />
    </Padding>
  ))
  .add('w/ShadowBox', () => (
    <Padding>
      <ShadowBox level={1} fullWidth>
        <GoogleLocationCard googlePlace={googlePlaceDetails} />
      </ShadowBox>
    </Padding>
  ))
