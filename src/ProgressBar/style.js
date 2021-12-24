import styled from 'styled-components'
import { width, color } from 'styled-system'

export default styled.div`
  transition: width 0.3s, opacity 1s;
  ${width};
  ${color};
  height: 100%;

  opacity: ${({ show }) => (show ? 1 : 0)};
`
