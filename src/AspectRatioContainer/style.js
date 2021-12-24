import styled from 'styled-components'
import { width, color, space } from 'styled-system'

export default styled.div`
  ${space};
  ${width};
  ${color};
  box-sizing: border-box;
`

export const StyledAspectRatioContainerOuter = styled.div`
  width: 100%;
  padding-top: ${(props) =>
    props.disableRatio
      ? '36%;'
      : props.ratioPercent}%; /* defines aspect ratio */
  position: relative;
`

export const StyledAspectRatioContainerInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
