import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { Flex } from 'reflexbox'

export default styled(Flex)``

export const StyledBreadcrumbSeperator = styled.span`
  color: ${(props) => props.theme.defaultTextColor};
`

export const StyledBreadcrumbFinal = styled.span`
  color: ${(props) => props.theme.defaultTextColor};
`

export const StyledBreadcrumbItem = styled(NavLink)`
  &:hover {
    text-decoration: underline;
  }
`
