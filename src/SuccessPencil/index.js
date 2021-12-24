import React from 'react'
import PropTypes from 'prop-types'

import StyledSuccessPencil from './style'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  p: 1,
  fontSize: 1,
}

const SuccessPencil = ({ children, ...styledProps }) => {
  return <StyledSuccessPencil {...styledProps}>{children}</StyledSuccessPencil>
}

SuccessPencil.propTypes = propTypes
SuccessPencil.defaultProps = defaultProps
SuccessPencil.displayName = 'SuccessPencil'

export default SuccessPencil
