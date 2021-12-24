import React from 'react'
import PropTypes from 'prop-types'

import StyledContainer from './style'

const propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  maxW: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minW: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  h: PropTypes.string,
  d: PropTypes.string,
  overflow: PropTypes.string,
  containerRef: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  component: 'div',
}

const Box = ({ children, ...styledProps }) => {
  return <StyledContainer {...styledProps}>{children}</StyledContainer>
}

Box.propTypes = propTypes
Box.defaultProps = defaultProps
Box.displayName = 'Box'

export default Box
