import React from 'react'
import PropTypes from 'prop-types'

import StyledAspectRatioContainer, {
  StyledAspectRatioContainerOuter,
  StyledAspectRatioContainerInner,
} from './style'

const propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ratio: PropTypes.string,
  disableRatio: PropTypes.bool,
  bg: PropTypes.string,
  color: PropTypes.string,
}

const defaultProps = {
  width: 1,
  ratio: '1:1',
  disableRatio: false,
}

const calculateRatioPercent = (ratioString) => {
  const r = ratioString.split(':')
  return (r[1] / r[0]) * 100
}

const AspectRatioContainer = ({
  children,
  ratio,
  disableRatio,
  ...styledProps
}) => {
  return (
    <StyledAspectRatioContainer {...styledProps}>
      <StyledAspectRatioContainerOuter
        ratioPercent={calculateRatioPercent(ratio)}
        disableRatio={disableRatio}
      >
        <StyledAspectRatioContainerInner>
          {children}
        </StyledAspectRatioContainerInner>
      </StyledAspectRatioContainerOuter>
    </StyledAspectRatioContainer>
  )
}

AspectRatioContainer.propTypes = propTypes
AspectRatioContainer.defaultProps = defaultProps

export default AspectRatioContainer
