import styled from 'styled-components'
import { flexbox, space, color, fontSize, width } from 'styled-system'
import { display, maxWidth } from 'utils/styled'

export const StyledRadioFieldGroupInputContainer = styled.div`
  ${display};
  ${flexbox};
`

export const StyledRadioFieldGroupMessageContainer = styled.div`
  padding-top: 5px;
  font-size: 12px;
  line-height: 15px;
`

export const StyledRadioFieldGroupMessage = styled.div`
  color: ${({ error, warning, theme }) => {
    if (error) return theme.errorColor
    if (warning) return theme.warningColor
    return theme.medGrey
  }};
`
StyledRadioFieldGroupMessage.displayName = 'StyledRadioFieldGroupMessage'

export default styled.div`
  ${space};
  ${color};
  ${fontSize};
  ${width};
  ${maxWidth};
`
