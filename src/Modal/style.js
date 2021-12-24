import styled from 'styled-components'
import { space } from 'styled-system'

import Flex from '../Flex'
import Box from '../Box'

const StyledModalBackdrop = styled(Flex)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  overflow: auto;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${space};
`

const StyledModalWrapper = styled(Box)`
  display: block;
  overflow: auto;
  margin: 0 auto;
`

const StyledCloseButton = styled(Flex)`
  z-index: 20000;
  position: absolute;
  right: 0;
  top: 0;
`
StyledModalBackdrop.displayName = 'StyledModalBackdrop'

export { StyledModalBackdrop, StyledModalWrapper, StyledCloseButton }
