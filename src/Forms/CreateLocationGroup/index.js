import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable'

import { Box } from 'reflexbox'
import Flex from 'components/Flex'
import Heading from 'components/Text/Heading'
import InputField from 'components/InputField'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import { required, name } from 'utils/validations'
import apiErrorHandler from 'utils/apiErrorHandler'

import { createLocationGroup } from 'store/locationGroups/duck'

const validationRules = {
  name: [required('Name is required'), name()],
}

const CreateLocationGroupForm = ({
  handleSubmit,
  submitting,
  pristine,
  error: submissionError,
  onDone,
}) => {
  const dispatch = useDispatch()

  const handleSubmitForm = async (values) => {
    const body = { name: values.get('name') }
    const { error, payload } = await dispatch(createLocationGroup(body))

    if (error) {
      throw new SubmissionError({
        _error: apiErrorHandler(payload, payload.message),
      })
    }

    onDone()
  }

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Heading size={3} pb={1}>
          Add Billing Group
        </Heading>
        {submissionError && <ErrorPencil>{submissionError}</ErrorPencil>}
        <Box pt={1} width="100%">
          <Field
            label="Billing group name"
            name="name"
            component={InputField}
            validate={validationRules.name}
            autoFocus
            placeholder="Enter a name"
            maxLength="50"
            width="100%"
          />
        </Box>
        <Flex>
          <FlatButton
            primary
            type="submit"
            ml="auto"
            disabled={submitting || pristine}
            submitting={submitting}
          >
            Add Group
          </FlatButton>
        </Flex>
      </form>
    </Box>
  )
}

CreateLocationGroupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  onDone: PropTypes.func,
}

export default reduxForm({
  form: 'createLocationGroupForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(CreateLocationGroupForm)
