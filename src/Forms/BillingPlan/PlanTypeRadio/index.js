import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import { Box } from 'reflexbox'
import Radio from 'components/Radio'
import SmallCopy from 'components/Text/SmallCopy'
import { BillingPlanType } from 'models'
import { formatCents } from 'utils/numberFormat'

const PlanTypeRadio = ({
  billingPlanType,
  showInitialBonus,
  my: _my,
  ...props
}) => {
  const chargeAmount = billingPlanType.get('chargeAmount')
  const initialBonusFactor = billingPlanType.get('initialBonusFactor')

  return (
    <Box width={['33.3%', 120]} my={1}>
      <Radio
        label={formatCents(chargeAmount, { precision: 0 })}
        value={billingPlanType.get('_id')}
        my={0}
        {...props}
      />
      {showInitialBonus && initialBonusFactor > 0 && (
        <SmallCopy mt="2px" color={theme.darkSuccessColor}>
          + {formatCents(chargeAmount * initialBonusFactor, { precision: 0 })}{' '}
          bonus!
        </SmallCopy>
      )}
    </Box>
  )
}

PlanTypeRadio.propTypes = {
  billingPlanType: PropTypes.instanceOf(BillingPlanType),
  showInitialBonus: PropTypes.bool,
  my: PropTypes.any,
}

export default PlanTypeRadio
