import * as React from 'react'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, formValues, clearSubmitErrors } from 'redux-form/immutable'

import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import StripeFieldset from 'components/Forms/StripeFieldset'

const StripeForm = ({
  handleSubmit,
  form,
  change,
  method,
  plaidMeta,
  onPreviousPage,
  submitting,
  pristine,
  isWizard,
  onDone,
  clearSubmitErrors,
  error: submissionError,
}) => {
  return (
    <React.Fragment>
      {submissionError && (
        <ErrorPencil mb={2} mt={1}>
          {submissionError}
        </ErrorPencil>
      )}
      <form onSubmit={handleSubmit}>
        <StripeFieldset
          form={form}
          method={method}
          plaidMeta={plaidMeta}
          change={change}
          clearSubmitErrors={clearSubmitErrors}
        />
        {isWizard ? (
          <Flex mt={2} mb={1}>
            <Box width={1 / 2} pr={1}>
              <FlatButton
                primary
                type="button"
                width={1}
                onClick={onPreviousPage}
                disabled={submitting}
              >
                Previous
              </FlatButton>
            </Box>
            <Box width={1 / 2} pl={1}>
              <FlatButton
                primary
                type="submit"
                width={1}
                disabled={submitting || pristine}
                submitting={submitting}
              >
                Next
              </FlatButton>
            </Box>
          </Flex>
        ) : (
          <Flex mt={2} mb={1}>
            <Box width={1} pr={1}>
              <FlatButton
                primary
                type="submit"
                disabled={submitting || pristine}
                submitting={submitting}
                width={1}
                my={2}
              >
                Save
              </FlatButton>
            </Box>
            <Box width={1} pl={1}>
              <FlatButton
                bg={theme.lightMedGrey}
                disabled={submitting}
                width={1}
                my={2}
                type="button"
                onClick={onDone}
              >
                Cancel
              </FlatButton>
            </Box>
          </Flex>
        )}
      </form>
    </React.Fragment>
  )
}

StripeForm.propTypes = {
  form: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  method: PropTypes.string,
  plaidMeta: PropTypes.object,
  change: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  onPreviousPage: PropTypes.func,
  error: PropTypes.string,
  isWizard: PropTypes.bool,
  onDone: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
}

StripeForm.defaultProps = {
  isWizard: true,
}

const reduxFormMap = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(formValues({ method: '_method', plaidMeta: '_plaid' })(StripeForm))

export default connect(null, { clearSubmitErrors })(reduxFormMap)
