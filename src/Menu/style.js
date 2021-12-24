import styled, { css } from 'styled-components'
import { space, color, fontSize, width } from 'styled-system'

export default styled.nav`
  ${space};
  ${color};
  ${fontSize};
  ${width};
  ${(props) =>
    !props.width &&
    css`
      display: table-cell;
    `};
`
