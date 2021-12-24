import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'

import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import InputField from 'components/InputField'
import TextArea from 'components/TextArea'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import { required } from 'utils/validations'

const validationRules = {
  email: [required('Email is required')],
}

const EmailForm = ({
  handleSubmit,
  submitting,
  pristine,
  closeModal,
  error: submissionError,
  success,
}) => {
  if (success) {
    setTimeout(() => {
      closeModal()
    }, 500)
  }

  return (
    <div>
      {submissionError && <ErrorPencil my={2}>{submissionError}</ErrorPencil>}
      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          name="email"
          component={InputField}
          validate={validationRules.email}
          placeholder="Email"
          type="email"
          width={1}
        />
        <Field
          label="Message"
          name="message"
          component={TextArea}
          placeholder="Message (optional)"
          type="text"
          width={1}
        />
        <Flex
          mt={3}
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
    </div>
  )
}

EmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
}

export default reduxForm({
  form: 'emailForm',
})(EmailForm)
