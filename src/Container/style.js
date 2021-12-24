import React from 'react'
import styled from 'styled-components'
import {
  space,
  width,
  color,
  flex,
  typography,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
} from 'styled-system'
import omit from 'lodash/omit'

import {
  height,
  maxHeight,
  overflow,
  maxWidth,
  minWidth,
  minHeight,
} from 'utils/styled'

const styles = styled.div`
  ${space};
  ${width};
  ${typography};
  ${flex};
  ${color};
  ${height};
  ${maxHeight};
  ${minHeight};
  ${overflow};
  ${maxWidth};
  ${minWidth};
  ${backgroundImage};
  ${backgroundSize};
  ${backgroundPosition};
  ${backgroundRepeat};
`

export default styles.withComponent(
  ({ component, containerRef, ...styledProps }) =>
    React.createElement(component, {
      ...omit(styledProps, [
        'maxW',
        'minW',
        'height',
        'maxH',
        'minH',
        'backgroundImage',
        'backgroundSize',
        'backgroundPosition',
        'backgroundRepeat',
        'textAlign',
      ]),
      ref: containerRef,
    })
)
