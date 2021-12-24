import styled from 'styled-components'
import { space } from 'styled-system'

export default styled.div`
  ${space};
  position: relative;
  z-index: 2;
  background-color: ${(props) => props.theme.warningColor};
  color: white;
  text-align: center;
  border-radius: 4px;
`
