import styled, { css } from 'styled-components'
import { ENTERING, ENTERED, EXITING } from 'react-transition-group/Transition'

export default styled.div`
  display: table-cell;
  transform-origin: top;
  transition-property: all;
  position: fixed;
  z-index: 9998;

  opacity: 0;
  transform: scaleY(0);

  ${(props) => {
    switch (props.transitionState) {
    case ENTERING:
      return css`
          opacity: 1;
          transform: scaleY(1);
          transition-duration: ${(passedProps) =>
    passedProps.animationTiming.enter}ms;
        `
    case ENTERED:
      return css`
          opacity: 1;
          transform: scaleY(1);
        `
    case EXITING:
      return css`
          transition-duration: ${(passedProps) =>
    passedProps.animationTiming.exit}ms;
        `
    default:
      return null
    }
  }};
`
