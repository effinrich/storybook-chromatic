import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import IPT from 'react-immutable-proptypes'
import { Field, reduxForm } from 'redux-form/immutable'

import { Location, User } from 'models'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import Heading from 'components/Text/Heading'
import InputField from 'components/InputField'
import TimeField from 'components/TimeField'
import Select from 'components/Select'
import SelectField from 'components/SelectField'
import TextArea from 'components/TextArea'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import { required, minChar, max, email, name, phone } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import { TabletDown } from 'components/Responsive'

const validationRules = {
  location: [required('Location is required')],
  dates: [required('Start/End date is required')],
  capTotalRedemptions: [required('Number of guests is required')],
  redemptionsPerUser: [required('Number of rides is required')],
  offerAmount: [
    required('Offer amount is required'),
    max(50, 'The maximum amount is $50'),
  ],
  voucherCodeName: [required('Promo code name is required'), minChar(3)],
  description: [required('Description is required')],
  contactName: [required('Contact name is required'), name()],
  contactEmail: [required('Contact email is required'), email('Invalid email')],
  contactPhone: [required('Contact phone is required'), phone('Invalid phone')],
}

const PromoRequestForm = ({
  locations,
  handleSubmit,
  submitting,
  pristine,
  change,
  closeModal,
  error: submissionError,
  success,
  me,
}) => {
  const [emailValues, setEmailValues] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    const optionsArr = []
    locations.map((location) => {
      optionsArr.push({
        value: location.get('_id'),
        label: `${location.get('name')} - ${location.get('address')}`,
      })
      return optionsArr
    })

    setOptions(optionsArr)
  }, [locations])

  useEffect(() => {
    me.getIn(['profile', 'name']) &&
      change('contactName', me.getIn(['profile', 'name']))

    me.get('email') && change('contactEmail', me.get('email'))
  }, [me, change])

  const handleChangeEmail = (emailValues) => {
    setEmailValues(emailValues)

    const emails = []
    emailValues &&
      emailValues.map((tag) => {
        emails.push(tag.value)
        return emails
      })

    change('guestList', emails)
  }

  return (
    <div>
      {submissionError && <ErrorPencil my={2}>{submissionError}</ErrorPencil>}
      {success ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          pt="25%"
        >
          <Heading size={1} textAlign="center">
            Your request was sent successfully!
          </Heading>
          <Heading size={2} textAlign="center" mt={3}>
            A salesperson will contact you shortly.
          </Heading>
          <FlatButton
            mt={3}
            primary
            type="button"
            width={1 / 3}
            onClick={/* istanbul ignore next */ closeModal}
          >
            Close
          </FlatButton>
        </Flex>
      ) : (
        <TabletDown>
          {(isTablet) => (
            <Box px={3} pb={3} pt={4}>
              <Heading size={3}>Create Promotion Request</Heading>
              <form onSubmit={handleSubmit}>
                <Field
                  label="Location"
                  name="location"
                  component={SelectField}
                  validate={validationRules.location}
                  options={options}
                  blurInputOnSelect
                  placeholder="Location"
                  type="text"
                  isSearchable={false}
                  width={1}
                />
                <Box width={1} my={3}>
                  <Flex
                    justifyContent="center"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} pr={[0, 1]} mb={[4, 0]}>
                      <Field
                        name="startDate"
                        type="text"
                        component={TimeField}
                        label="Start date"
                        validate={validationRules.dates}
                        enableTime={false}
                        noCalendar={false}
                        dateFormat="m/d/y"
                        expandLabel={isTablet}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} pl={[0, 1]}>
                      <Field
                        name="endDate"
                        type="text"
                        component={TimeField}
                        label="End date"
                        validate={validationRules.dates}
                        enableTime={false}
                        noCalendar={false}
                        dateFormat="m/d/y"
                        expandLabel={isTablet}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box width={1}>
                  <Flex
                    justifyContent="center"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} pr={[0, 1]}>
                      <Field
                        label="Quantity of promo codes"
                        name="capTotalRedemptions"
                        component={InputField}
                        validate={validationRules.capTotalRedemptions}
                        placeholder="i.e. 10"
                        type="number"
                        width={1}
                        helpText="Cap the number of available codes to stay within your budget."
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} pl={[0, 1]}>
                      <Field
                        label="Max promo codes per person"
                        name="redemptionsPerUser"
                        component={InputField}
                        validate={validationRules.redemptionsPerUser}
                        placeholder="i.e. 1"
                        type="number"
                        width={1}
                        helpText="The number of rides each individual will be allowed (can be more than 1 if a multi day event)"
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box width={1}>
                  <Flex
                    justifyContent="center"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} pr={[0, 1]}>
                      <Field
                        label="Preferred promo code name"
                        name="voucherCodeName"
                        component={InputField}
                        validate={validationRules.voucherCodeName}
                        placeholder="Preferred promo code name"
                        type="text"
                        width={1}
                        helpText="Code must be at least 3 characters and contain 3 numbers - codes are subject to availability"
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} pl={[0, 1]}>
                      <Field
                        label="Offer amount"
                        name="offerAmount"
                        component={InputField}
                        validate={validationRules.offerAmount}
                        placeholder="i.e. $5"
                        type="number"
                        adornmentText="$"
                        normalize={normalizers.currency}
                        width={1}
                        helpText="The rider's fare will be covered up to the amount of your offer. If their ride cost is less than your offer, you will only pay for the cost of the fare."
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box width={1} mb={3}>
                  <Flex
                    justifyContent="center"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} pr={[0, 1]}>
                      <Field
                        label="Description"
                        name="description"
                        component={TextArea}
                        validate={validationRules.description}
                        placeholder="Example: Join us for our summer menu tasting!..."
                        type="text"
                        maxLength="106"
                        width={1}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} pl={[0, 1]} pt={1}>
                      <Field
                        label="Contact phone"
                        name="contactPhone"
                        component={InputField}
                        validate={validationRules.contactPhone}
                        placeholder="Contact phone"
                        type="tel"
                        width={1}
                        helpText="Who should we contact if we have questions regarding your promo codes?"
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box width={1}>
                  <Flex
                    justifyContent="center"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} pr={[0, 1]}>
                      <Field
                        label="Contact name"
                        name="contactName"
                        component={InputField}
                        validate={validationRules.contactName}
                        placeholder="Contact name"
                        type="text"
                        width={1}
                        helpText="Who should we contact to notify the code has been created?"
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} pl={[0, 1]}>
                      <Field
                        label="Contact email"
                        name="contactEmail"
                        component={InputField}
                        validate={validationRules.contactEmail}
                        placeholder="Contact email"
                        type="email"
                        width={1}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box width={1} my={3}>
                  <Select
                    name="guestList"
                    isMulti
                    hideOptions
                    creatable
                    isClearable={false}
                    value={emailValues}
                    onChange={handleChangeEmail}
                    altLabel="Guest list (optional)"
                    placeholder="Enter emails..."
                    helpText="If you'd like this promo code available to specific users only, enter their Freebird user emails here"
                    delimiter=", "
                  />
                </Box>
                <Box width={1} mt={4}>
                  <Field
                    label="Questions or comments?"
                    name="comments"
                    component={TextArea}
                    placeholder="Questions or comments?"
                    type="text"
                    width={1}
                  />
                </Box>
                <Flex
                  mt={4}
                  mb={2}
                  justifyContent="center"
                  flexDirection={['column', 'row']}
                >
                  <Box width={[1, 1 / 3]} mr={[0, 1]} mb={[2, 0]}>
                    <FlatButton
                      primary
                      type="submit"
                      disabled={submitting || pristine}
                      submitting={submitting}
                      width={1}
                    >
                      Send
                    </FlatButton>
                  </Box>
                  <Box width={[1, 1 / 3]} ml={[0, 1]}>
                    <FlatButton
                      cancel
                      type="button"
                      disabled={submitting}
                      width={1}
                      onClick={/* istanbul ignore next */ closeModal}
                    >
                      Cancel
                    </FlatButton>
                  </Box>
                </Flex>
              </form>
            </Box>
          )}
        </TabletDown>
      )}
    </div>
  )
}

PromoRequestForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
  change: PropTypes.func,
  locations: IPT.mapOf(PropTypes.instanceOf(Location)),
  me: PropTypes.instanceOf(User),
}

export default reduxForm({
  form: 'promoRequestForm',
  destroyOnUnmount: false,
})(PromoRequestForm)
