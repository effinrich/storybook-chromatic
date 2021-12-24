import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import Heading from 'components/Text/Heading'

import StyledErrorCardFetch from './style'

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

const defaultProps = {
  // Default Props go here
}

const ErrorCardFetch = ({ children }) => {
  return (
    <StyledErrorCardFetch level={1} bg={theme.errorColor} p={3} width={1}>
      <Heading color={'white'} size={3} regular>
        {children}
      </Heading>
    </StyledErrorCardFetch>
  )
}

ErrorCardFetch.propTypes = propTypes
ErrorCardFetch.defaultProps = defaultProps

export default ErrorCardFetch
