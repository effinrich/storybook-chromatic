/* eslint-disable no-restricted-globals */
import React, { useState, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FieldArray, reduxForm, formValues } from 'redux-form/immutable'
import { Field } from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'
import { MdAssignmentReturned } from 'react-icons/md'
import moment from 'moment'
import { List, Map } from 'immutable'
import axios from 'axios'
import { Link } from 'react-router-dom'

import theme from 'theme'
import { Location, User, Offer } from 'models'
import { mapApiHoursToReduxForm } from 'models/helpers'
import { Box } from 'reflexbox'
import Flex from 'components/Flex'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import ShadowBox from 'components/ShadowBox'
import InputField from 'components/InputField'
import CheckboxField from 'components/CheckboxField'
import RadioFieldGroup from 'components/RadioFieldGroup'
import Hours from 'components/Hours'
import Radio from 'components/Radio'
import Toggle from 'components/Toggle'
import Modal from 'components/Modal'
import SingleDatePickerField from 'components/SingleDatePickerField'
import Dropzone from 'components/Dropzone'
import AspectRatioImage from 'components/AspectRatioImage'
import { required, min, max } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import { fetchPresignedUrl } from 'store/locations/api'
import Config from 'config'

import Vouchers from 'views/Admin/Locations/Offers/Vouchers/container'

const StyledOfferForm = styled.div`
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
  rideContribution: [
    required('You must enter a Ride Contribution'),
    max(100, 'The maximum Ride Contribution is $100'),
  ],
  budget: [
    required('You must enter a Budget amount if you turn on a daily budget'),
    min(10, 'The minimum daily budget is $10'),
  ],
  hours: (value, allValues) =>
    value && value.every((d) => !d.get('enabled'))
      ? 'You must enable at least one day for this Offer'
      : undefined,
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

const OfferForm = (props) => {
  const {
    handleSubmit,
    submitSucceeded,
    error: submissionError,
    dirty,
    dailyBudget,
    dailyLimit,
    change,
    privateOffer,
    privateVoucherPhoto,
    offerIsFreeTrial,
    isEdit,
    location,
    offer,
    me,
  } = props

  const [focused, setFocused] = useState(false)
  const [show, showModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(new List())

  const uploadProgressRef = useRef(new List())

  const handleCopyHours = () => {
    change('hours', mapApiHoursToReduxForm(location.hours))
  }

  const handleShowModal = (event) => {
    event && event.stopPropagation()
    event && event.preventDefault()

    showModal(true)
  }

  const handleHideModal = () => {
    showModal(false)
  }

  const handleInitUploadProgress = async (file) => {
    const initUploadProgress = file.reduce(
      (l, f, i) => l.set(i, new Map({ loaded: 0, total: f.size })),
      new List().setSize(file.length)
    )
    setIsUploading(true)
    uploadProgressRef.current = initUploadProgress
  }

  const handleUploadProgress = (index, event) => {
    const progress = uploadProgressRef.current.setIn(
      [index, 'loaded'],
      event.loaded
    )
    setUploadProgress(progress)
  }

  const handleUploadFiles = async (files) => {
    return await axios.all(
      files.map(async (f, i) => {
        const signedUrl = await fetchPresignedUrl(f.type)
        try {
          const response = await axios.put(signedUrl, f, {
            headers: {
              'Content-Type': f.type,
            },
            onUploadProgress: handleUploadProgress.bind(this, i),
          })
          return { signedUrl, response }
        } catch (err) {
          console.log(err) // eslint-disable-line no-console
        }
      })
    )
  }

  const handleUploadComplete = (uploadedFile) => {
    setUploadProgress(new List())
    setIsUploading(false)

    const updatedPhoto = new List([
      new Map({
        isPrimary: false,
        url: uploadedFile[0].signedUrl.split('?')[0],
      }),
    ])

    change('privateVoucherPhoto', updatedPhoto)
  }

  const handleFileDrop = async (file) => {
    handleInitUploadProgress(file)
    const uploadedFile = await handleUploadFiles(file)
    handleUploadComplete(uploadedFile)
  }

  const handleDeletePhoto = () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this photo?  Select "ok" to proceed.'
    )

    if (confirmDelete) {
      change('privateVoucherPhoto', new List())
    }
  }

  let loaded = 0
  let total = 0

  loaded = uploadProgress.reduce((sum, entry) => sum + entry.get('loaded'), 0)
  total = uploadProgress.reduce((sum, entry) => sum + entry.get('total'), 0)

  return (
    <StyledOfferForm>
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
                    to={`/dashboard/locations/${
                      location._id
                    }/offers/${conflictingOffer.get('_id')}/edit`}
                  >
                    {conflictingOffer.get('_id')}
                  </Link>
                </li>
              ))}
            </ul>
          </ShadowBox>
        )}

        <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
          <Heading size={2} mb={2}>
            Offer Details
          </Heading>
          {submissionError && (
            <ErrorPencil my={2}>{submissionError}</ErrorPencil>
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
            label="Ride Contribution"
            name="rideContribution"
            component={InputField}
            placeholder="i.e $10"
            adornmentText="$"
            helpText="Set the amount you would like to contribute to your customers Uber ride. Our $2 service fee is added to this amount."
            validate={validationRules.rideContribution}
            normalize={normalizers.currency}
            type="text"
            width={1}
          />
          <Field
            label="Points"
            name="points"
            component={InputField}
            placeholder="100"
            normalize={normalizers.onlyDecimal}
            type="text"
            width={1}
          />
          <Field
            label="Free Trial"
            name="offerIsFreeTrial"
            component={CheckboxField}
            labelPosition="right"
            my={0}
            width={1}
            onChange={(event) =>
              change(
                'freeTrialExpires',
                event.target.checked ? moment().add(30, 'd') : null
              )
            }
          />
          {offerIsFreeTrial && (
            <Field
              name="freeTrialExpires"
              component={SingleDatePickerField}
              normalize={(value) => value.value.format()}
              width={1}
            />
          )}
          {me.isSuperAdmin() && (
            <Fragment>
              <Field
                label="Redeem Immediately"
                name="redeemImmediately"
                component={CheckboxField}
                labelPosition="right"
                mt={2}
                width={1}
              />
              <Field
                label="Up to"
                name="upTo"
                component={CheckboxField}
                labelPosition="right"
                mt={2}
                width={1}
              />
            </Fragment>
          )}
          {me.isAdmin() && (
            <Fragment>
              <Box width={[1 / 2, 3 / 4]}>
                <Field
                  label="Private Offer"
                  name="private"
                  component={CheckboxField}
                  labelPosition="right"
                  mt={1}
                  mb={2}
                  width={1}
                />
              </Box>
            </Fragment>
          )}
          {isEdit && (
            <Flex alignItems="center">
              {offer.private && privateOffer && (
                <Box width={[1 / 2, 1 / 4]}>
                  <FlatButton
                    py={1}
                    px={1}
                    primary
                    id="vouchers_link"
                    onClick={handleShowModal}
                    style={{ float: 'right' }}
                  >
                    Promo Code
                  </FlatButton>
                  <Modal
                    show={show}
                    bg={theme.backgroundColor}
                    onClose={handleHideModal}
                    align={['fullscreen', 'fullscreen', 'center']}
                    width={[1, 1, 9 / 10]}
                    maxW="950px"
                    maxH={['100%', '100%', '1120px']}
                    p={[0, 2, 2]}
                    closeOnOutsideClick={false}
                  >
                    {(closeModal) => <Vouchers offer={offer} {...props} />}
                  </Modal>
                </Box>
              )}
              {privateOffer && !offer.private && (
                <Box width={1 / 2}>
                  <BodyCopy textAlign="right" color={theme.warningColor}>
                    Click 'Update' to access promos
                  </BodyCopy>
                </Box>
              )}
            </Flex>
          )}
          <Box my={2}>
            <Flex justifyContent="space-between">
              <label>Promotion Budget?</label>
              <Toggle
                name="_dailyBudget"
                toggleText={['Unlimited', 'Limited']}
                checked={dailyBudget > 0}
                onChange={(event) =>
                  change('budget', event.target.checked ? 10 : 0)
                }
              />
            </Flex>
          </Box>
          {(dailyBudget > 0 || focused) && (
            <Field
              label="Daily Budget"
              name="budget"
              component={InputField}
              placeholder="i.e $200"
              adornmentText="$"
              helpText="Enable daily budget to set a maximum daily spend on rides."
              validate={validationRules.budget}
              normalize={normalizers.currency}
              onFocus={/* istanbul ignore next */ () => setFocused(true)}
              onBlur={/* istanbul ignore next */ () => setFocused(false)}
              type="text"
              width={1}
            />
          )}
          <Box my={2}>
            <Flex justifyContent="space-between">
              <label>Limit Rides/Person?</label>
              <Toggle
                name="_limitRides"
                toggleText={['Unlimited', 'Limited']}
                checked={dailyLimit > 0}
                onChange={(event) =>
                  change('dailyLimit', event.target.checked ? 7 : 0)
                }
              />
            </Flex>
          </Box>
          {dailyLimit > 0 && (
            <Field
              name="dailyLimit"
              format={(value) => value.toString()}
              parse={/* istanbul ignore next */ (value) => parseInt(value, 10)}
              component={(props) => (
                <RadioFieldGroup labelPosition="right" {...props}>
                  <Radio label="Once per week" value="7" />
                  <Radio label="Once per month" value="30" />
                  <Radio label="Once per year" value="365" />
                </RadioFieldGroup>
              )}
            />
          )}
        </ShadowBox>
        {isEdit && offer.private && privateOffer && (
          <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Heading size={2}>Photo</Heading>

              {privateVoucherPhoto.size > 0 && (
                <FlatButton
                  type="button"
                  danger
                  small
                  onClick={handleDeletePhoto}
                >
                  Delete photo
                </FlatButton>
              )}
            </Flex>
            <Flex flexDirection={['column', 'column', 'column', 'row']}>
              {privateVoucherPhoto.size > 0 ? (
                <Fragment>
                  <Box width={[1, 1, 1, 1 / 2]} pr={[0, 0, 0, 1]}>
                    <Dropzone
                      isUploading={isUploading}
                      onDrop={handleFileDrop}
                      ratio="50:16"
                      placeholderCopy="Drag image here to upload, or click below"
                      progress={loaded / total}
                    />
                  </Box>
                  <Box
                    width={[1, 1, 1, 1 / 2]}
                    pl={[0, 0, 0, 1]}
                    pt={[2, 2, 2, 0]}
                  >
                    <AspectRatioImage
                      width={1}
                      ratio="50:16"
                      alt=""
                      bg={theme.lightMedGrey}
                      src={`${Config.get(
                        '/CloudFrontDomain'
                      )}/images?url=${encodeURIComponent(
                        privateVoucherPhoto.getIn([0, 'url'])
                      )}&width=483&height=151`}
                      border
                    />
                  </Box>
                </Fragment>
              ) : (
                <Box width={1}>
                  <Dropzone
                    isUploading={isUploading}
                    onDrop={handleFileDrop}
                    placeholderCopy="Drag image here to upload, or click below"
                    ratio="50:16"
                    progress={loaded / total}
                  />
                </Box>
              )}
            </Flex>
          </ShadowBox>
        )}
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
        </ShadowBox>
      </form>
    </StyledOfferForm>
  )
}

OfferForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Location),
  submitSucceeded: PropTypes.bool,
  dailyBudget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dailyLimit: PropTypes.number,
  privateOffer: PropTypes.bool,
  offerIsFreeTrial: PropTypes.bool,
  error: PropTypes.string,
  change: PropTypes.func,
  dirty: PropTypes.bool,
  show: PropTypes.bool,
  isEdit: PropTypes.bool,
  offer: PropTypes.instanceOf(Offer),
  me: PropTypes.instanceOf(User),
  privateVoucherPhoto: PropTypes.instanceOf(List),
}

export default reduxForm({
  enableReinitialize: true,
})(
  formValues({
    dailyBudget: 'budget',
    dailyLimit: 'dailyLimit',
    privateOffer: 'private',
    offerIsFreeTrial: 'offerIsFreeTrial',
    privateVoucherPhoto: 'privateVoucherPhoto',
  })(OfferForm)
)

// export default enhancements(OfferForm)
