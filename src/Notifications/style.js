import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

export default styled.div``

export const StyledNotificationTransition = styled(CSSTransition)`
  transition: ${/* istanbul ignore next */ (props) => props.timeout}ms
    ease-in-out;
  opacity: 1;
  height: ${/* istanbul ignore next */ (props) => props.height};
  box-sizing: border-box;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity, height, padding;

  &.notification-enter,
  &.notification-appear {
    opacity: 0;
  }

  &.notification-exit.notification-exit-active {
    opacity: 0;
    height: 0px;
    padding-bottom: 0;
  }

  &.notification-enter.notification-enter-active,
  &.notification-appear.notification-appear-active,
  &.notification-exit {
    opacity: 1;
    height: ${/* istanbul ignore next */ (props) => props.height};
  }
`
