import React from 'react'
import PropTypes from 'prop-types'

import StyledBodyCopy from './style'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  light: PropTypes.bool,
}

const defaultProps = {
  textAlign: 'left',
  // See https://github.com/jxnblk/styled-system for syntax
  fontSize: 2,
  mt: 0.5,
  mb: 0.5,
  light: false,
}

const BodyCopy = (props) => {
  const { children, ...styledProps } = props
  return <StyledBodyCopy {...styledProps}>{children}</StyledBodyCopy>
}

BodyCopy.propTypes = propTypes
BodyCopy.defaultProps = defaultProps

export default BodyCopy
