import React from 'react'
import styled from 'styled-components'
import { space, fontSize, color } from 'styled-system'
import omit from 'lodash/omit'

const _StyledReactIconWrapper = styled.svg`
  transition: all 0.5s;
  ${fontSize};
  ${space};
  ${color};
`

export default _StyledReactIconWrapper.withComponent((props) =>
  React.createElement(props.icon, omit(props, ['icon']))
)
