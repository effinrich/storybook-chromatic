import React from 'react'
import PropTypes from 'prop-types'

import StyledHamburgerButton, { StyledHamburgerSlices } from './style'

const propTypes = {
  active: PropTypes.bool,
}

const defaultProps = {
  active: false,
}

const HamburgerButton = ({ active, ...props }) => {
  return (
    <StyledHamburgerButton active={active} {...props}>
      <StyledHamburgerSlices />
    </StyledHamburgerButton>
  )
}

HamburgerButton.propTypes = propTypes
HamburgerButton.defaultProps = defaultProps

export default HamburgerButton
