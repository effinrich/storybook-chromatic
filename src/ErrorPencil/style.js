import styled from 'styled-components'
import { space, fontSize } from 'styled-system'
import color from 'tinycolor2'

export default styled.div`
  ${space};
  ${fontSize};
  position: relative;
  z-index: 2;
  background-color: ${(props) =>
    color(props.theme.errorColor).lighten(12).toRgbString()};
  color: white;
  text-align: center;
  border-radius: 4px;
`
