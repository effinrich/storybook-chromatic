import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import BodyCopy from 'components/Text/BodyCopy'
import ProgressCircle from 'components/ProgressCircle'

import StyledLoadingView from './style'

const propTypes = {
  loadingText: PropTypes.string,
  show: PropTypes.bool,
  showText: PropTypes.bool,
  showSubText: PropTypes.bool,
  scale: PropTypes.number,
  fullscreen: PropTypes.bool,
  color: PropTypes.string,
}

const defaultProps = {
  show: true,
  showText: true,
  showSubText: true,
  scale: 0.25,
  color: theme.brandColor,
}

const LoadingView = ({
  loadingText,
  showText,
  showSubText,
  scale,
  color,
  ...styleProps
}) => {
  return (
    <StyledLoadingView {...styleProps}>
      <Flex justifyContent="center" alignItems="center">
        <Box>
          <ProgressCircle scale={scale} color={color} />

          {showText && (
            <BodyCopy mt={3} textAlign="center">
              {loadingText}
              {showSubText && (
                <span>
                  {' '}
                  <br />
                  This may take a few moments, please be patient.
                </span>
              )}
            </BodyCopy>
          )}
        </Box>
      </Flex>
    </StyledLoadingView>
  )
}

LoadingView.propTypes = propTypes
LoadingView.defaultProps = defaultProps

export default LoadingView
