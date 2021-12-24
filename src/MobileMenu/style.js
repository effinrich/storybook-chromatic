import styled, { css } from 'styled-components'

import Menu from 'components/Menu'

export default styled(Menu).attrs((props) => ({ ref: (props) => props.ref }))`
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  ${(props) =>
    props.absolute
      ? css`
          top: ${props.top}px;
        `
      : null};
  z-index: 1;
  transition: all 0.5s;
  transform: translateY(0px);
  opacity: 1;
  ${(props) => !props.show && hiddenMixin};
`

const hiddenMixin = css`
  opacity: 0;
  transform: translateY(-100px);
  pointer-events: none;
`
