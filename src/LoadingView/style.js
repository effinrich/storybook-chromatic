import styled, { css } from 'styled-components'
import { space } from 'styled-system'

export default styled.div`
  ${space};
  display: ${(props) => (!props.show ? 'none' : 'block')};

  ${(props) => (props.fullscreen ? fullscreenMixin : null)};
`

const fullscreenMixin = css`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
