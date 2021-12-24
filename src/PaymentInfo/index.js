import React /*, { useState, useEffect }*/ from 'react'
import PropTypes from 'prop-types'
import {
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
  FaUniversity,
} from 'react-icons/fa'

import theme from 'theme'
import { BillingSource } from 'models'
import Heading from 'components/Text/Heading'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import { BANK_SOURCE, CARD_SOURCE, parsePaymentSource } from 'utils/billing'

const propTypes = {
  billingSource: PropTypes.instanceOf(BillingSource),
  color: PropTypes.string,
}

const PaymentInfo = ({ billingSource, color = theme.superLightGrey }) => {
  const renderCardIcon = (cardType, color) => {
    const CardIconMap = {
      'American Express': FaCcAmex,
      Visa: FaCcVisa,
      MasterCard: FaCcMastercard,
      bank: FaUniversity,
    }
    const DefaultCCIcon = FaCreditCard
    const Icon = CardIconMap[cardType] || DefaultCCIcon

    return <Icon size={40} color={color} />
  }

  const renderPaymentSourceIcon = (paymentSource, color) => {
    switch (paymentSource.get('__t')) {
    case CARD_SOURCE:
      return renderCardIcon(paymentSource.getIn(['card', 'brand']), color)
    case BANK_SOURCE:
      return renderCardIcon('bank', color)
    default:
      return null
    }
  }

  const { /*institution,*/ last4 } = parsePaymentSource(billingSource)
  const icon = renderPaymentSourceIcon(billingSource, color)

  return (
    <Heading size={4} color={color} regular>
      <Flex alignItems="center">
        <Box width={1 / 4} mr={2}>
          {icon}
        </Box>
        <Box width={1}> ••••{last4}</Box>
      </Flex>
    </Heading>
  )
}

PaymentInfo.propTypes = propTypes

export default PaymentInfo
