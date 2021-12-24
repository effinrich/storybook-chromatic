import React from 'react'
import PropTypes from 'prop-types'

import Box from '../Box'
import theme from 'theme'

import StyledProgressBar from './style'

const propTypes = {
  show: PropTypes.bool,
  progress: PropTypes.number.isRequired,
  bg: PropTypes.string,
  h: PropTypes.string,
}

const defaultProps = {
  show: false,
  progress: 0,
  bg: theme.brandColor,
  h: '2px',
}

const ProgressBar = ({ show, progress, bg, h, ...styledProps }) => {
  return (
    <Box width={1} h={h} {...styledProps}>
      <StyledProgressBar show={show} width={progress || 0} bg={bg} />
    </Box>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
