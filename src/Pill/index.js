import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'

import StyledPill, { pillValues } from './style'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  // Styled System Props
  bg: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  pillStyle: PropTypes.oneOf([
    'default',
    'warning',
    'error',
    'success',
    'info',
  ]),
  colorValue: PropTypes.oneOf(range(pillValues.length)),
}

const defaultProps = {
  pillStyle: 'default',
  size: 'small',
}

const Pill = ({ children, ...styledProps }) => {
  return <StyledPill {...styledProps}>{children}</StyledPill>
}

Pill.propTypes = propTypes
Pill.defaultProps = defaultProps

export default Pill
