import React from 'react'
import PropTypes from 'prop-types'

import StyledErrorPencil from './style'

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

const ErrorPencil = ({ children, ...styledProps }) => {
  return <StyledErrorPencil {...styledProps}>{children}</StyledErrorPencil>
}

ErrorPencil.propTypes = propTypes
ErrorPencil.defaultProps = defaultProps
ErrorPencil.displayName = 'ErrorPencil'

export default ErrorPencil
