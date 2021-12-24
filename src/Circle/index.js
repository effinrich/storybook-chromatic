import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'

import StyledCircle from './style'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  d: 'inline-block',
  bg: theme.brandColor,
}

const Circle = ({ children, ...styledProps }) => {
  return <StyledCircle {...styledProps}>{children}</StyledCircle>
}

Circle.propTypes = propTypes
Circle.defaultProps = defaultProps

export default Circle
