import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'

import StyledDollarDisplay, {
  StyledDollarDisplayAmount,
  StyledDollarDisplayCurrency,
} from './style'

const propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string,
  large: PropTypes.bool,
  small: PropTypes.bool,
}

const defaultProps = {
  color: theme.brandColor,
  large: false,
  small: false,
}

const DollarDisplay = (props) => {
  const { amount, large, small, ...styledProps } = props
  return (
    <StyledDollarDisplay {...styledProps}>
      <StyledDollarDisplayCurrency large={large} small={small}>
        $
      </StyledDollarDisplayCurrency>
      <StyledDollarDisplayAmount large={large} small={small}>
        {amount}
      </StyledDollarDisplayAmount>
    </StyledDollarDisplay>
  )
}

DollarDisplay.propTypes = propTypes
DollarDisplay.defaultProps = defaultProps

export default DollarDisplay
