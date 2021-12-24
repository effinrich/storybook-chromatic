import React from 'react'
import styled, { css } from 'styled-components'
import omit from 'lodash/omit'
import { space, fontSize, color, lineHeight } from 'styled-system'

import StyledTextBase from '../Base/style'

export default styled(
  StyledTextBase.withComponent((props) =>
    React.createElement(`h${props.size}`, omitProps(props))
  )
)`
  ${space};
  ${fontSize};
  ${color};
  ${lineHeight};
  ${(props) => {
    if (props.light) {
      return css`
        font-weight: ${props.theme.fontSizeLight};
      `
    }
    if (props.regular) {
      return css`
        font-weight: ${props.theme.fontSizeRegular};
      `
    }
    if (props.grey) {
      return css`
        color: ${props.theme.medGrey};
      `
    }
    return null
  }};
`

const omitProps = (props) =>
  omit(props, [
    'textAlign',
    'lineHeight',
    'm',
    'light',
    'regular',
    'grey',
    'p',
  ])
