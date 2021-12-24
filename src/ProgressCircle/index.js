import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader'

import theme from 'theme'

import StyledLoader from './style'

const propTypes = {
  // expects #fff format
  color: PropTypes.string,
  scale: PropTypes.number,
  // relative or absolute
  position: PropTypes.string,
}

const defaultProps = {
  color: theme.brandColor,
  scale: 0.25,
  position: 'relative',
  p: '9px',
}

const ProgressCircle = ({ color, scale, position, ...styledProps }) => {
  return (
    <StyledLoader {...styledProps}>
      <Loader
        loaded={false}
        color={color}
        lines={10}
        length={20}
        width={10}
        radius={30}
        scale={scale}
        corners={1}
        direction={1}
        fps={20}
        zIndex={2e9}
        hwaccel={false}
        position={position}
      />
    </StyledLoader>
  )
}

ProgressCircle.propTypes = propTypes
ProgressCircle.defaultProps = defaultProps

export default ProgressCircle
