import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FaInfoCircle } from 'react-icons/fa'
import {
  reduxForm,
  formValues,
  clearSubmitErrors,
  Field,
} from 'redux-form/immutable'
import { List } from 'immutable'

import theme from 'theme'
import { Box } from 'reflexbox'
import Heading from 'components/Text/Heading'
import Flex from 'components/Flex'
import FlatButton from 'components/FlatButton'
import RadioFieldGroup from 'components/RadioFieldGroup'
import ErrorPencil from 'components/ErrorPencil'
import StripeFieldset from 'components/Forms/StripeFieldset'
import PaymentInfo from 'components/PaymentInfo'
import BodyCopy from 'components/Text/BodyCopy'
import SmallCopy from 'components/Text/SmallCopy'
import Tooltip from 'components/Tooltip'
import { TabletUp } from 'components/Responsive'
import { BillingSource, BillingPlan } from 'models'
import { calculatePlanActivationCharge } from 'utils/billing'
import { required } from 'utils/validations'
import { formatCents } from 'utils/numberFormat'

import PlanTypeRadio from './PlanTypeRadio'
import SuccessPencil from 'components/SuccessPencil'

const validationRules = {
  billingPlanTypeId: [required('Please select a package amount')],
}

const BillingPlanForm = ({
  billingPlanTypes,
  billingPlan,
  billingSource,
  isEligibleForBonus,
  method,
  plaidMeta,
  form,
  change,
  submitting,
  pristine,
  error: submissionError,
  handleSubmit,
  onDone,
}) => {
  const dispatch = useDispatch()

  const showInitialBonus =
    isEligibleForBonus &&
    !!billingPlanTypes.find((planType) => planType.initialBonusFactor)

  const hasFailedCharge = billingPlan && !!billingPlan.get('failedChargeId')
  const activationCharge =
    hasFailedCharge &&
    calculatePlanActivationCharge(
      billingPlan.get('balance'),
      billingPlan.getIn(['planType', 'chargeAmount'])
    )

  const [showStripeFields, setShowStripeFields] = useState(!billingSource)

  return (
    <form onSubmit={handleSubmit}>
      {submissionError && (
        <ErrorPencil mb={2} mt={1}>
          {submissionError}
        </ErrorPencil>
      )}
      {hasFailedCharge ? (
        <Box pb={2}>
          <Heading size={2} pb={1}>
            Update Payment Method
          </Heading>
          {activationCharge.total ? (
            <BodyCopy>
              Your current outstanding balance is{' '}
              <b>{formatCents(-billingPlan.get('balance'))}</b>. You will be
              charged <b>{formatCents(activationCharge.total)}</b> to activate
              your billing plan.
            </BodyCopy>
          ) : (
            <BodyCopy>
              Please update your payment method to activate your billing plan.
            </BodyCopy>
          )}
        </Box>
      ) : (
        <>
          <Box pb={3}>
            <Heading size={2} pb={1}>
              Ride Package Options
            </Heading>
            <BodyCopy>
              Select the amount of Freebird credit you would like to fund your
              account with.
            </BodyCopy>
            <Tooltip
              content="Point rides have a service fee of $2.00 per ride to your business. Cash back rides have a service fee of $2.50 per ride PLUS the amount of cash back offered to the rider, as determined by you.  If you are offering cash back offers you may want to select a higher ride package amount to cover a larger number of rides."
              placement="bottom"
            >
              <FlatButton p="0px" overBg="transparent" type="button">
                <Flex mt={1} alignItems="center">
                  <FaInfoCircle size={16} color={theme.infoColor} />
                  <SmallCopy mt={0} ml="4px" color={theme.infoColor}>
                    What's the best package for my business?
                  </SmallCopy>
                </Flex>
              </FlatButton>
            </Tooltip>
            {showInitialBonus && (
              <SuccessPencil
                mt={2}
                mb={-2}
                style={{ background: theme.darkSuccessColor, zIndex: 0 }}
              >
                For a limited time, receive an additional bonus on your initial
                purchase of a Freebird package when you spend $100 or more!
              </SuccessPencil>
            )}
          </Box>
          <Box>
            <Heading size={4}>Select Ride Package</Heading>
            <Field
              name="billingPlanTypeId"
              component={(props) => (
                <RadioFieldGroup labelPosition="right" horizontal {...props}>
                  {billingPlanTypes.map((billingPlanType) => (
                    <PlanTypeRadio
                      key={billingPlanType.get('_id')}
                      billingPlanType={billingPlanType}
                      showInitialBonus={showInitialBonus}
                    />
                  ))}
                </RadioFieldGroup>
              )}
              validate={validationRules.billingPlanTypeId}
            />
          </Box>
        </>
      )}
      <Box mt={2}>
        <Heading size={4}>Payment Method</Heading>
        {!billingSource || hasFailedCharge || showStripeFields ? (
          <StripeFieldset
            form={form}
            method={method}
            plaidMeta={plaidMeta}
            change={change}
            clearSubmitErrors={() => dispatch(clearSubmitErrors(form))}
          />
        ) : (
          <Box>
            <Flex alignItems="center" maxW={10}>
              <PaymentInfo
                billingSource={billingSource}
                color={theme.darkGrey}
              />
              <FlatButton
                ml={2}
                primary
                small
                onClick={() => setShowStripeFields(true)}
              >
                Change<TabletUp> Payment Method</TabletUp>
              </FlatButton>
            </Flex>
          </Box>
        )}
      </Box>
      <Flex mt={2} mb={1}>
        <Box width={1} pr={1}>
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
        <Box width={1} pl={1}>
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
      </Flex>
    </form>
  )
}

BillingPlanForm.propTypes = {
  form: PropTypes.string,
  billingPlanTypes: PropTypes.instanceOf(List).isRequired,
  billingPlan: PropTypes.instanceOf(BillingPlan),
  billingSource: PropTypes.instanceOf(BillingSource),
  isEligibleForBonus: PropTypes.bool,
  method: PropTypes.string,
  plaidMeta: PropTypes.object,
  change: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onDone: PropTypes.func,
}

export default reduxForm({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(formValues({ method: '_method', plaidMeta: '_plaid' })(BillingPlanForm))
