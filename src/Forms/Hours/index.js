/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React from 'react'
import PropTypes from 'prop-types'
import { FieldArray, reduxForm } from 'redux-form/immutable'

import { Box } from 'reflexbox'
import Flex from 'components/Flex'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import SuccessPencil from 'components/SuccessPencil'
import Heading from 'components/Text/Heading'
import SmallCopy from 'components/Text/SmallCopy'
import Hours from 'components/Hours'

const validationRules = {
  hours: (value, allValues) =>
    value && value.every((d) => !d.get('enabled'))
      ? 'You must enable at least one day for this Offer'
      : undefined,
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

const HoursForm = (props) => {
  const {
    handleSubmit,
    submitSucceeded,
    submitting,
    submit,
    form,
    pristine,
    dirty,
    error: submissionError,
    closeModal,
  } = props

  const handleCloseModal = () => {
    if (dirty && !submitSucceeded) {
      const confirmDelete = confirm(promptMsg)

      if (confirmDelete) {
        setTimeout(() => {
          closeModal()
        }, 500)
      }
    } else {
      setTimeout(() => {
        closeModal()
      }, 500)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading size={2} mb={2}>
        Offer Availability
      </Heading>
      <FieldArray
        name="hours"
        validate={validationRules.hours}
        component={Hours}
        rerenderOnEveryChange
      />
      {submissionError && <ErrorPencil my={2}>{submissionError}</ErrorPencil>}
      {submitSucceeded && (
        <SuccessPencil my={2}>Offer hours successfully updated!</SuccessPencil>
      )}
      <Box width={1}>
        <SmallCopy mt={2} textAlign="center">
          Note: Changes to your offer may take 15 minutes to appear in the
          Freebird app.
        </SmallCopy>
      </Box>
      <Flex
        mt={3}
        mb={2}
        justifyContent="center"
        flexDirection={['column', 'row']}
      >
        <Box width={[1, 1 / 3]} mr={[0, 1]} mb={[2, 0]}>
          <FlatButton
            primary
            disabled={submitting || pristine}
            submitting={submitting}
            onClick={/* istanbul ignore next */ () => submit(form)}
            width={1}
          >
            Update
          </FlatButton>
        </Box>
        <Box width={[1, 1 / 3]} ml={[0, 1]}>
          <FlatButton
            cancel
            type="button"
            disabled={submitting}
            width={1}
            onClick={/* istanbul ignore next */ handleCloseModal}
          >
            Close
          </FlatButton>
        </Box>
      </Flex>
    </form>
  )
}

HoursForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func,
  submitSucceeded: PropTypes.bool,
  submit: PropTypes.func,
  closeModal: PropTypes.func,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  dirty: PropTypes.bool,
  form: PropTypes.string,
}

export default reduxForm({
  form: 'hoursForm',
  enableReinitialize: true,
})(HoursForm)
