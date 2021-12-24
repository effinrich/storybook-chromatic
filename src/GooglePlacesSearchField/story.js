import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import Decorator from 'utils/storybook'
import MockReduxFormField from 'utils/testing/MockReduxFormField'

import { Padding } from 'components/StoryDecorators'

import GooglePlacesSearchField from '.'

const ControlledAutoComplete = ({ ...restProps }) => {
  const [address, setAddress] = useState('228 Main St, Venice, CA 90291')
  const [latLng, setLatLng] = useState()

  return (
    <GooglePlacesSearchField
      onChange={(address) => {
        setAddress(address)
        if (address === '') {
          setAddress('')
        }
      }}
      onSelect={(address) => {
        geocodeByAddress(address)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => setLatLng(latLng))
      }}
      value={address}
      label="Google place autocomplete"
      placeholder="Google place autocomplete"
      latLng={latLng}
      {...restProps}
    />
  )
}

storiesOf('GooglePlacesSearch', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding>
      <MockReduxFormField>
        <ControlledAutoComplete input={{ name: 'place' }} />
      </MockReduxFormField>
    </Padding>
  ))
  .add('disabled', () => (
    <Padding>
      <MockReduxFormField>
        <ControlledAutoComplete input={{ name: 'place' }} disabled />
      </MockReduxFormField>
    </Padding>
  ))
