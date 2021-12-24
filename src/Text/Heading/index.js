import React from 'react'
import PropTypes from 'prop-types'

import StyledHeading from './style'
import theme from 'theme'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  // this is the <h> tag size.
  // eslint-disable-next-line no-magic-numbers
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  // boolean sets font-weight to 200
  light: PropTypes.bool,
  // boolean sets font-weight to 400
  regular: PropTypes.bool,
  grey: PropTypes.bool,
}

const defaultProps = {
  textAlign: 'left',
  size: 1,
  // See https://github.com/jxnblk/styled-system for syntax
  color: theme.brandColor,
  lineHeight: 1.25,
  m: 0,
  light: false,
  regular: false,
  grey: false,
}

const Heading = (props) => {
  const { children, ...styledProps } = props
  return <StyledHeading {...styledProps}>{children}</StyledHeading>
}

Heading.propTypes = propTypes
Heading.defaultProps = defaultProps
Heading.displayName = 'Heading'

export default Heading
