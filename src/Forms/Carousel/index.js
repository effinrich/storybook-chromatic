/*global google*/
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateEffect } from 'react-use'
import PropTypes from 'prop-types'
import {
  reduxForm,
  Field,
  SubmissionError,
  getFormValues,
} from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'
import { includes } from 'lodash'
import { FaCheck, FaEdit, FaDollarSign } from 'react-icons/fa'

import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import Checkbox from 'components/Checkbox'
import ErrorPencil from 'components/ErrorPencil'
import Heading from 'components/Text/Heading'
import ShadowBox from 'components/ShadowBox'
import InputField from 'components/InputField'
import TextArea from 'components/TextArea'
import SelectField from 'components/SelectField'
import DataTable from 'components/DataTable'
import FlatButton from 'components/FlatButton'
import { required } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import { usStateOptions } from 'utils/usStates'

const validationRules = {
  name: [required('A name is required')],
  lng: [required('Longitude is required')],
  lat: [required('Latitude is required')],
  minRadius: [required('Min radius is required')],
  maxRadius: [required('Max radius is required')],
  priority: [required('Priority is required')],
  locations: [required('Locations are required')],
  description: [required('Description is required')],
  city: [required('City is required')],
  state: [required('State is required')],
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool,
  change: PropTypes.func,
  dirty: PropTypes.bool,
  error: PropTypes.string,
  fetchData: PropTypes.func,
  data: PropTypes.any,
  pages: PropTypes.number,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
  isPatchSuccess: PropTypes.bool,
  form: PropTypes.string,
}

const CarouselForm = ({
  fetchData,
  initialValues,
  change,
  handleSubmit,
  submitSucceeded,
  dirty,
  data,
  pages,
  loading,
  form,
  error: submissionError,
}) => {
  const [locations, setLocations] = useState([])
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)

  const carouselFormValues = useSelector((state) =>
    getFormValues(form)(state)
  ).toJS()

  const toggleRow = useCallback(
    (locationId) => {
      let locationsArray = [...locations]
      const keyIndex = locationsArray.indexOf(locationId)

      if (keyIndex >= 0) {
        locationsArray = [
          ...locationsArray.slice(0, keyIndex),
          ...locationsArray.slice(keyIndex + 1),
        ]
      } else {
        locationsArray.push(locationId)
      }
      setState({ locationsArray })

      change('locations', locationsArray)
    },
    [change, locations]
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Actions',
        id: 'actions',
        filterable: false,
        sortable: false,
        width: 100,
        Cell: /* istanbul ignore next */ (row) => {
          const {
            original: [, loc],
          } = row
          return (
            <Flex justifyContent="center">
              <FlatButton
                title="Edit"
                p={1}
                to={`/dashboard/locations/${loc.get('_id')}/edit`}
              >
                <FaEdit color={theme.brandColor} />
              </FlatButton>
              <FlatButton
                p={1}
                title="Offers"
                to={`/dashboard/locations/${loc.get('_id')}/offers`}
              >
                <FaDollarSign color={theme.brandColor} />
              </FlatButton>
            </Flex>
          )
        },
      },
      {
        Header: 'Select',
        id: 'actions',
        filterable: false,
        sortable: false,
        width: 100,
        Cell: /* istanbul ignore next */ (row) => {
          const {
            original: [, location],
          } = row
          const locationId = location.get('_id')
          const checked = includes(locations, locationId)
          return (
            <Flex justifyContent="center">
              <Checkbox
                checked={checked}
                onChange={() => toggleRow(locationId)}
                name={locationId}
                type="checkbox"
              />
            </Flex>
          )
        },
      },
      {
        Header: 'Location Name',
        id: 'name',
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('name')
        },
      },
      {
        Header: 'Street Address',
        id: 'address',
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('address')
        },
      },
      {
        Header: 'City',
        id: 'city',
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('city')
        },
      },
      {
        Header: 'State',
        id: 'state',
        width: 100,
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('state')
        },
      },
      {
        Header: 'Zip Code',
        id: 'zipcode',
        width: 100,
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('zipcode')
        },
      },
      {
        Header: 'ID',
        id: '_id',
        accessor: /* istanbul ignore next */ ([, rowData]) =>
          rowData.get('_id'),
      },
      {
        Header: 'Managed',
        id: 'partner',
        filterable: false,
        width: 100,
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('partner')
        },
        Cell: /* istanbul ignore next */ (row) => {
          const {
            original: [, loc],
          } = row
          return (
            <Flex justifyContent="center">
              {loc.get('partner') && (
                <FaCheck color={theme.primaryButtonOverBg} />
              )}
            </Flex>
          )
        },
      },
      {
        Header: 'Owner',
        id: 'user',
        // filterable: false,
        width: 200,
        accessor: /* istanbul ignore next */ ([, rowData]) => {
          return rowData.get('user')
        },
        Cell: /* istanbul ignore next */ (row) => {
          const {
            original: [, loc],
          } = row
          return loc.get('partner') ? loc.get('user') : 'Admin'
        },
      },
    ],
    [locations, toggleRow]
  )

  const handleLocationsArray = useCallback(() => {
    const locationsArr = []

    if (initialValues.locations) {
      initialValues.locations.map((location) => {
        return locationsArr.push(location.get('_id'))
      })

      change('locations', locationsArr)

      setLocations(locationsArr)
    }
  }, [initialValues, change])

  useEffect(() => {
    handleLocationsArray()

    if (initialValues.city) {
      setCity(initialValues.city)
    }

    if (initialValues.state) {
      setState(initialValues.state)
    }
  }, [handleLocationsArray, initialValues])

  useUpdateEffect(() => {
    if (initialValues.locations) {
      handleLocationsArray()
    }
  }, [initialValues, handleLocationsArray])

  const handleOnBlur = (event, city) => {
    setCity(city)

    if (state) {
      handleFetchGeo(city, state)
    }
  }

  const handleOnChange = (event, state) => {
    setState(state)

    if (city) {
      handleFetchGeo(city, state)
    }
  }

  const handleFetchGeo = async (city, state) => {
    let lat
    let lng
    const address = `${city}, ${state}`
    const geocoder = new google.maps.Geocoder()
    await geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat()
        lng = results[0].geometry.location.lng()

        change('geo.lat', lat.toFixed(7))
        change('geo.lng', lng.toFixed(7))
      } else {
        throw new SubmissionError({
          _error:
            'Geocode was not successful for the following reason: ' + status,
        })
      }
    })
  }

  const handleFetchData = ({ page, pageSize, sorted, filtered }) => {
    return fetchData({
      pageSize,
      page,
      sortBy: sorted,
      // sortedBy: sorted,
      filterBy: filtered,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Prompt when={dirty && !submitSucceeded} message={promptMsg} />
      <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
        <Heading size={2} mb={2}>
          Carousel Details
        </Heading>
        {submissionError && <ErrorPencil my={2}>{submissionError}</ErrorPencil>}
        <Field
          label="Carousel name"
          name="name"
          component={InputField}
          placeholder="Carousel name"
          validate={validationRules.name}
          type="text"
          width={1}
        />
        <Field
          label="Carousel description"
          name="description"
          component={TextArea}
          validate={validationRules.description}
          placeholder="Carousel description"
          type="text"
          width={1}
          mb={2}
        />
        <Flex flexDirection={['column', 'row']}>
          <Box width={[1, 1 / 2]} pr={[0, 1]}>
            <Field
              label="City"
              name="city"
              component={InputField}
              validate={validationRules.city}
              placeholder="City"
              type="text"
              width={1}
              onBlur={handleOnBlur}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={[0, 1]}>
            <Field
              label="State"
              name="state"
              component={SelectField}
              validate={validationRules.state}
              parse={(value) => value.value}
              options={usStateOptions}
              blurInputOnSelect
              placeholder="State"
              type="text"
              maxLength="2"
              width={1}
              onChange={handleOnChange}
            />
          </Box>
        </Flex>
        <Flex flexDirection={['column', 'row']} mt={1}>
          <Box width={[1, 1 / 5]} pr={[0, 1]}>
            <Field
              label="Latitude"
              name="geo.lat"
              component={InputField}
              placeholder="Latitude"
              validate={validationRules.lat}
              normalize={normalizers.coords}
              type="text"
              width={1}
            />
          </Box>
          <Box width={[1, 1 / 5]} px={[0, 1]}>
            <Field
              label="Longitude"
              name="geo.lng"
              component={InputField}
              placeholder="Longitude"
              validate={validationRules.lng}
              normalize={normalizers.coords}
              type="text"
              width={1}
            />
          </Box>
          <Box width={[1, 1 / 5]} px={[0, 1]}>
            <Field
              label="Min miles"
              name="minRadius"
              component={InputField}
              placeholder="Min miles"
              validate={validationRules.minRadius}
              normalize={normalizers.onlyDecimal}
              type="text"
              width={1}
            />
          </Box>
          <Box width={[1, 1 / 5]} px={[0, 1]}>
            <Field
              label="Max miles"
              name="maxRadius"
              component={InputField}
              placeholder="Max miles"
              validate={validationRules.maxRadius}
              normalize={normalizers.onlyDecimal}
              type="text"
              width={1}
            />
          </Box>
          <Box width={[1, 1 / 5]} pl={[0, 1]}>
            <Field
              label="Priority"
              name="priority"
              component={InputField}
              placeholder="Priority"
              validate={validationRules.priority}
              type="number"
              width={1}
            />
          </Box>
        </Flex>
      </ShadowBox>
      <ShadowBox level={1} bg="white" mb={2} width={1}>
        <DataTable
          manual
          data={data}
          pages={pages}
          loading={loading}
          onFetchData={handleFetchData}
          columns={columns}
          column={{ minWidth: 200 }}
          defaultPageSize={10}
          filterable
          defaultFiltered={[
            {
              id: 'state',
              value: carouselFormValues.state ? carouselFormValues.state : '',
            },
            {
              id: 'city',
              value: carouselFormValues.city ? carouselFormValues.city : '',
            },
          ]}
        />
      </ShadowBox>
    </form>
  )
}

CarouselForm.propTypes = propTypes

export default reduxForm({
  form: 'carouselForm',
})(CarouselForm)
