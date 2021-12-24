import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'

import StyledSeperator from './style'

const propTypes = {
  solid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
}

const defaultProps = {
  solid: false,
  fullWidth: false,
  color: theme.brandColor,
}

const Seperator = (props) => {
  return <StyledSeperator {...props} />
}

Seperator.propTypes = propTypes
Seperator.defaultProps = defaultProps

export default Seperator
