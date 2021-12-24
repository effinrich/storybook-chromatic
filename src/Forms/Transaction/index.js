import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'

import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import InputField from 'components/InputField'
import SingleDatePickerField from 'components/SingleDatePickerField'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import { required } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'

const validationRules = {
  name: [required('Location is required')],
  amount: [required('Amount is required')],
  accountId: [required('Account ID is required')],
}

const TransactionForm = ({
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
          label="Location name"
          name="name"
          component={InputField}
          validate={validationRules.name}
          placeholder="Location name"
          type="text"
          width={1}
        />
        <Field
          label="Amount"
          name="amount"
          component={InputField}
          validate={validationRules.amount}
          placeholder="Amount"
          type="number"
          adornmentText="$"
          normalize={normalizers.currency}
          width={1}
        />
        <Field
          label="Account ID"
          name="accountId"
          component={InputField}
          validate={validationRules.accountId}
          placeholder="Account ID"
          type="text"
          width={1}
          mb={2}
          helpText="Get this from an existing transaction in the 'Transactions' table"
        />
        <Field
          label="Date"
          name="date"
          component={SingleDatePickerField}
          normalize={(value) => value.value.format()}
          block={true}
          isOutsideRange={() => false}
        />
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
    </div>
  )
}

TransactionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
}

export default reduxForm({
  form: 'transactionForm',
})(TransactionForm)
