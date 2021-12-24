import React from 'react'
import { Field } from 'redux-form/immutable'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { createTextMask } from 'redux-form-input-masks'

import InputField from 'components/InputField'
import SelectField from 'components/SelectField'
import GooglePlacesSearchField from 'components/GooglePlacesSearchField'
import { required, zip, phone } from 'utils/validations'

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
})

const validationRules = {
  zip: [required('Business zip is required'), zip()],
  googlePlaceId: [required('Location is required')],
  locationGroupId: [required('Billing Group is required')],
  phone: [
    required('Contact number is required'),
    phone('A valid contact number is required (ie. 310-555-5555)'),
  ],
}

export const ZipField = (props) => {
  return (
    <Field
      label="Business zip code"
      name="zip"
      component={InputField}
      validate={validationRules.zip}
      placeholder="Business zip code"
      type="text"
      width={1}
      helpText="Enter the zip code for the business you want to add."
      helpIcon
      autoFocus
      {...props}
    />
  )
}

export const PlaceField = ({ latLng, onSelect, ...props }) => (
  <>
    <Field
      name="location"
      disabled={!latLng}
      component={GooglePlacesSearchField}
      validate={validationRules.googlePlaceId}
      placeholder="Search for business"
      label="Search for business"
      type="text"
      width={1}
      autoComplete="nope"
      location={latLng}
      helpText="If you can't find the business by name,
          enter the name followed by the address.
          If you still can't find the business,
          enter only the address."
      helpIcon
      onSelect={onSelect}
      {...props}
    />
    {/* shitty hack to force chrome to respect autoComplete */}
    <input
      type="text"
      name=""
      value=""
      readOnly={true}
      style={{ display: 'none' }}
    />
  </>
)

PlaceField.propTypes = {
  latLng: PropTypes.object,
  onSelect: PropTypes.func,
}

export const PhoneField = (props) => {
  return (
    <Field
      name="phone"
      component={InputField}
      label="Contact number"
      placeholder="Contact number"
      validate={validationRules.phone}
      type="tel"
      width={1}
      pb={1}
      {...phoneMask}
      {...props}
    />
  )
}

export const LocationGroupIdField = ({ locationGroups, ...props }) => {
  const options = locationGroups
    .map((record) => ({
      label: record.getIn(['locationGroup', 'name']),
      value: record.getIn(['locationGroup', '_id']),
    }))
    .toArray()

  return (
    <Field
      name="locationGroupId"
      label="Select Billing Group"
      component={SelectField}
      parse={(value) => value.value}
      validate={validationRules.locationGroupId}
      options={options}
      width={1}
      {...props}
    />
  )
}

LocationGroupIdField.propTypes = {
  locationGroups: PropTypes.instanceOf(List),
}
