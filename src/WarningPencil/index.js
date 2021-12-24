import React from 'react'
import PropTypes from 'prop-types'

import StyledWarningPencil from './style'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  p: 1,
}

const WarningPencil = ({ children, ...styledProps }) => {
  return <StyledWarningPencil {...styledProps}>{children}</StyledWarningPencil>
}

WarningPencil.propTypes = propTypes
WarningPencil.defaultProps = defaultProps

export default WarningPencil
