import styled from 'styled-components'
import { space, color } from 'styled-system'

import { Box } from 'reflexbox'

export default styled.div`
  ${space};
  ${color};
  border: ${(props) => props.theme.primaryButtonOverBg} dotted 2px;
`
export const StyledLocationImgBox = styled(Box)`
  max-width: 115px;
`
