import React from 'react'
import PropTypes from 'prop-types'

import StyledReactIconWrapper from './style'

const propTypes = {
  icon: PropTypes.func.isRequired,
}

const defaultProps = {
  // Default Props go here
}

const ReactIconWrapper = (props) => {
  return <StyledReactIconWrapper {...props} />
}

ReactIconWrapper.propTypes = propTypes
ReactIconWrapper.defaultProps = defaultProps

export default ReactIconWrapper
