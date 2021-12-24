import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as ss from 'styled-system'
import isNumber from 'lodash/isNumber'

import Flex from '../Flex'

const StyledStage = styled.div`
  ${ss.color};
  ${ss.width};
  ${ss.space};
  height: ${(props) =>
    isNumber(props.height) ? `${props.height}px` : props.height};
`

const ExtendedFlex = styled(Flex)`
  height: ${(props) =>
    isNumber(props.height) ? `${props.height}px` : props.height};
`

const determineFlex = (children, passedProps) => {
  if (passedProps.flex) {
    return (
      <ExtendedFlex height={passedProps.height} {...passedProps.flex}>
        {children}
      </ExtendedFlex>
    )
  }
  return children
}

const Stage = (props) => {
  const { children, bg, ...styledProps } = props
  return (
    <StyledStage bg={bg} {...styledProps}>
      {determineFlex(children, styledProps)}
    </StyledStage>
  )
}

Stage.propTypes = {
  bg: PropTypes.string,
  flex: PropTypes.object,
  box: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Stage.defaultProps = {
  height: 'auto',
  bg: 'transparent',
}

export default Stage
