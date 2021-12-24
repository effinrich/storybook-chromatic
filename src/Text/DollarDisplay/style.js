import styled from 'styled-components'
import { color } from 'styled-system'

export default styled.div`
  ${color};
`

export const StyledDollarDisplayAmount = styled.span`
  font-size: ${(props) => {
    if (props.large) {
      return '27px;'
    }
    if (props.small) {
      return '25px;'
    }
    return '35px;'
  }};
`

export const StyledDollarDisplayCurrency = styled.span`
  font-size: ${(props) => {
    if (props.large) {
      return '18px;'
    }
    if (props.small) {
      return '12px;'
    }
    return '13px;'
  }};
`
