/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useEffectOnce } from 'react-use'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  FieldArray,
  reduxForm,
  formValues,
  getFormValues,
  Field,
} from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'
import { MdAssignmentReturned, MdClose } from 'react-icons/md'
import { Flex, Box } from 'reflexbox'

import theme from 'theme'
import { Offer } from 'models'
import { mapApiHoursToReduxForm } from 'models/helpers'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import ShadowBox from 'components/ShadowBox'
import InputField from 'components/InputField'
import Tooltip from 'components/Tooltip'
import ReactIconWrapper from 'components/ReactIconWrapper'
// import Tooltip from 'components/Tooltip'
// import Box from 'components/Box'
// import Flex from 'components/Flex'
import SelectField from 'components/SelectField'
import Pill from 'components/Pill'
// import CheckboxField from 'components/CheckboxField'
import RadioFieldGroup from 'components/RadioFieldGroup'
import Hours from 'components/Hours'
import Radio from 'components/Radio'
import { Box } from 'reflexbox'
// import Toggle from 'components/Toggle'
import { required, max, min } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import {
  fetchLocations,
  selectLocations,
  selectActiveLocationId,
  selectActiveLocation,
  setActiveLocationId,
  fetchLocationById,
  selectLocationById,
} from 'store/locations/duck'

const StyledOfferPartnerForm = styled.div`
  ul {
    color: white;
    padding-left: 20px;
    li a {
      color: white;
      text-decoration: underline;
    }
  }
`

const validationRules = {
  title: [required('A Title is required')],
  location: [required('A location is required')],
  rideContribution: [
    required('You must enter a Ride Contribution'),
    min(2, 'Offer amount must be between $2 and $10'),
    max(10, 'Offer amount must be between $2 and $10'),
  ],
  pointsOrCash: [required('Please choose either Points Ride or Cash Ride')],
  hours: (value, allValues) =>
    value && value.every((d) => !d.get('enabled'))
      ? 'You must enable at least one day for this Offer'
      : undefined,
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

const pointsRideHelpTip = (
  <>
    POINT RIDES
    <br />
    How it works: Users earn 500 points for each ride taken and those points can
    be converted to cash.
    <ul>
      <li>
        <strong>Simple $2 Merchant cost per ride</strong>
      </li>
      <li>
        Merchants receive ride confirmation, date, time and location origin data
        for each ride taken but points rides DO NOT have a transaction
        requirement.
      </li>
    </ul>
  </>
)

const cashRideHelpTip = (
  <>
    CASH BACK RIDES
    <br />
    How it works: Users earn a cash back amount set by you, provided the
    customer spends at least 3x the cash back amount in your venue.
    <ul>
      <li>
        <strong>
          $2.50 Merchant cost per ride + Cash Back Offer Amount (you set)
        </strong>
      </li>
      <li>
        Guaranteed results as the 3x spend requirement{' '}
        <strong>ensures you a positive return on investment</strong>.
      </li>
      <li>
        Promote special events (happy hours, local’s nights, brunch, etc.).
      </li>
    </ul>
  </>
)

const OfferPartnerForm = ({
  handleSubmit,
  submitSucceeded,
  error: submissionError,
  dirty,
  change,
  isEdit,
  offer,
  submitting,
  pristine,
  submit,
  form,
}) => {
  const dispatch = useDispatch()

  const [options, setOptions] = useState([])
  const [offerTypeCopy, setOfferTypeCopy] = useState(null)
  const [offerType, setOfferType] = useState(null)
  const [showMaxAmountMessage, setShowMaxAmountMessage] = useState(false)

  const offerFormValues = useSelector((state) =>
    getFormValues(form)(state)
  ).toJS()
  const location = useSelector((state) =>
    selectLocationById(state, isEdit && offer.location)
  )

  const locations = useSelector((state) => selectLocations(state))
  const activeLocationId = useSelector((state) =>
    selectActiveLocationId(state)
  )
  const activeLocation = useSelector((state) =>
    selectActiveLocation(state, activeLocationId)
  )

  const maxAmountMessage = (
    <>
      <Flex
        p={0}
        justifyContent="flex-end"
        style={{ position: 'absolute', right: 0, top: 0 }}
      >
        <FlatButton
          px={0}
          py={0}
          overBg="transparent"
          onClick={() => setShowMaxAmountMessage(false)}
          type="button"
        >
          <ReactIconWrapper icon={MdClose} fontSize={3} color={'white'} />
        </FlatButton>
      </Flex>
      <Box pt={2}>
        For offers exceeding $10, please contact
        <br />
        <a
          href="mailto:sales@freebirdrides.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.brightBrandColor }}
        >
          sales@freebirdrides.com
        </a>
      </Box>
    </>
  )

  useEffect(() => {
    if (!isEdit) {
      const handleFetchLocations = async () => {
        await dispatch(fetchLocations())
      }

      handleFetchLocations()
    }
  }, [isEdit, dispatch])

  useEffect(() => {
    if (!isEdit) {
      const options = locations
        .map((record) => ({
          label: record.get('name'),
          value: record.get('_id'),
        }))
        .toArray()

      if (!activeLocationId && options.length) {
        dispatch(setActiveLocationId(options[0].value))
      }

      change('location', activeLocationId)

      setOptions(options)
    }
  }, [isEdit, dispatch, locations, activeLocationId, change])

  useEffectOnce(() => {
    if (isEdit) {
      if (offer.points > 0) {
        setOfferType('points')
        setOfferTypeCopy('Your per ride cost: $2')
        change('pointsOrCash', 'points')
      } else {
        const cashAmount = (+offer.rideContribution + +2.5).toFixed(2)
        setOfferType('cash')
        setOfferTypeCopy(`Your per ride cost: $${cashAmount}`)
        change('pointsOrCash', 'cash')
      }

      const handleFetchLocationById = async () => {
        await dispatch(fetchLocationById(offer.location))
      }
      handleFetchLocationById()
    }
  }, [isEdit, dispatch, offer, change])

  const handleCopyHours = () => {
    change(
      'hours',
      mapApiHoursToReduxForm(location ? location.hours : activeLocation.hours)
    )
  }

  const handleSelectChange = (value) => {
    dispatch(setActiveLocationId(value.value))
  }

  const handleRadioChange = (event) => {
    if (event.target.value === 'points') {
      setOfferType('points')
      change('points', 500)
      change('pointsOrCash', 'points')
      setOfferTypeCopy('Your per ride cost: $2')
    } else if (event.target.value === 'cash') {
      setOfferType('cash')
      change('pointsOrCash', 'cash')
      const cashAmount = (+offerFormValues.rideContribution + +2.5).toFixed(2)
      setOfferTypeCopy(`Your per ride cost: $${cashAmount}`)
    }
  }

  const handleCashChange = (event) => {
    const newRideCost = +2.5 + +event.target.value
    setOfferTypeCopy(`Your per ride cost: $${newRideCost.toFixed(2)}`)

    if (event.target.value > 10) {
      setShowMaxAmountMessage(true)
    } else {
      setShowMaxAmountMessage(false)
    }
  }

  return (
    <StyledOfferPartnerForm>
      <form onSubmit={handleSubmit}>
        <Prompt when={dirty && !submitSucceeded} message={promptMsg} />
        {isEdit &&
          offer.conflictingOffers &&
          offer.conflictingOffers.filter(
            (conflictingOffer, index) =>
              conflictingOffer.get('_id') !== offer._id
          ).size > 0 && (
          <ShadowBox
            level={1}
            bg={theme.warningColor}
            px={3}
            py={2}
            width={1}
          >
            <BodyCopy color="white">
                This offer's hours conflict with the hours of the following
                offer(s). Please consider revising:
            </BodyCopy>
            <ul>
              {offer.conflictingOffers.map((conflictingOffer, index) => (
                <li key={index}>
                  <Link
                    to={`/dashboard/offers/${conflictingOffer.get(
                      '_id'
                    )}/edit`}
                  >
                    {conflictingOffer.get('_id')}
                  </Link>
                </li>
              ))}
            </ul>
          </ShadowBox>
        )}

        <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
          <Heading size={2} pb={1}>
            Offer Details
          </Heading>
          {location && (
            <Heading size={3} pb={2} color={theme.primaryButtonOverBg}>
              Location: {location.name} - {location.address}
            </Heading>
          )}
          {submissionError && (
            <ErrorPencil my={2}>{submissionError}</ErrorPencil>
          )}
          {!isEdit && (
            <Field
              label="Choose a location"
              name="location"
              component={SelectField}
              validate={validationRules.location}
              parse={(value) => value.value}
              options={options}
              blurInputOnSelect
              placeholder="Choose a location"
              type="text"
              onChange={handleSelectChange}
              width={1}
            />
          )}
          <Field
            label="Offer Title"
            name="title"
            component={InputField}
            placeholder="Offer Title"
            helpText="This title is not seen by your customers. It is for you to differentiate between your different offers"
            validate={validationRules.title}
            type="text"
            width={1}
          />

          <Field
            pb={2}
            pt={2}
            name="pointsOrCash"
            validate={validationRules.pointsOrCash}
            onChange={handleRadioChange}
            component={(props) => (
              <RadioFieldGroup labelPosition="right" {...props}>
                <Radio
                  label="Points Ride - 500 points for the rider, $2 fee per ride"
                  value="points"
                  checked={offerType === 'points'}
                  pb={1}
                  helpTipText={pointsRideHelpTip}
                />
                <Radio
                  label="Cash Ride - Cash amount for the rider specified by you, $2.50 fee per ride"
                  value="cash"
                  checked={offerType === 'cash'}
                  helpTipText={cashRideHelpTip}
                />
              </RadioFieldGroup>
            )}
          />

          {offerType === 'cash' && (
            <Flex
              flexDirection={['column', 'row']}
              alignItems="normal"
              pb={[2, 0]}
              pt={2}
            >
              <Box width={[1, 1 / 2]} pr={[0, 2]}>
                <Tooltip
                  content={maxAmountMessage}
                  placement="auto"
                  visible={showMaxAmountMessage}
                  interactive={true}
                >
                  <Field
                    label="Offer Cash Amount"
                    name="rideContribution"
                    component={InputField}
                    placeholder="Enter amount between $2 and $10"
                    adornmentText="$"
                    // helpText="Rider will only receive the cash amount if they spend a minimum of 3x the cash back amount, at your location."
                    validate={validationRules.rideContribution}
                    parse={normalizers.noDecimal}
                    type="text"
                    onChange={handleCashChange}
                    width={1}
                  />
                </Tooltip>
              </Box>
              <Box width={[1, 1 / 2]} pl={[0, 2]}>
                <BodyCopy pt={[0, 2]}>
                  Rider will only receive the cash amount if they spend a
                  minimum of 3x the cash amount, at your location.
                </BodyCopy>
              </Box>
            </Flex>
          )}

          {offerTypeCopy && (
            <Pill
              mr={1}
              pillStyle="info"
              size="large"
              color="white"
              p={1}
              fontSize={16}
            >
              {offerTypeCopy}
            </Pill>
          )}
        </ShadowBox>
        <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Heading size={2}>Offer Availability</Heading>
            <FlatButton
              primaryInvert
              small
              type="button"
              onClick={handleCopyHours}
            >
              <Box component="span" mr={1}>
                <MdAssignmentReturned />
              </Box>
              Copy Location Hours
            </FlatButton>
          </Flex>
          <FieldArray
            name="hours"
            validate={validationRules.hours}
            component={Hours}
            rerenderOnEveryChange
          />
          <Flex
            flexDirection={['column', 'row']}
            alignItems="center"
            mb={2}
            mt={3}
          >
            <Box pr={[0, 1]} pb={[1, 0]} width={[1, 1 / 2]}>
              <FlatButton
                cancel
                disabled={submitting}
                to={'/dashboard/offers'}
                width={1}
                mb={1}
              >
                Cancel
              </FlatButton>
            </Box>
            <Box pl={[0, 1]} width={[1, 1 / 2]}>
              <FlatButton
                primary
                disabled={submitting || pristine}
                submitting={submitting}
                onClick={/* istanbul ignore next */ () => submit(form)}
                width={1}
                mb={1}
              >
                Save
              </FlatButton>
            </Box>
          </Flex>
        </ShadowBox>
      </form>
    </StyledOfferPartnerForm>
  )
}

OfferPartnerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool,
  privateOffer: PropTypes.bool,
  error: PropTypes.string,
  change: PropTypes.func,
  dirty: PropTypes.bool,
  show: PropTypes.bool,
  isEdit: PropTypes.bool,
  offer: PropTypes.instanceOf(Offer),
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  submit: PropTypes.func,
  form: PropTypes.string,
}

export default reduxForm({
  enableReinitialize: true,
})(
  formValues({
    privateOffer: 'private',
  })(OfferPartnerForm)
)

// export default enhancements(OfferPartnerForm)
