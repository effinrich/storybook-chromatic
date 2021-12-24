import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { space, fontSize } from 'styled-system'
import omit from 'lodash/omit'

const StyledNavItemExternalLink = styled.a`
  ${space};
  ${fontSize};
  display: block;
  box-sizing: content-box;
  border-left: 2px solid transparent;
  color: ${(props) => props.theme.defaultTextColor};
  text-decoration: none;

  &.NavItem--active {
    border-left-color: ${(props) => props.theme.brandColor};
    color: ${(props) => props.theme.brandColor};
  }

  &:hover {
    text-decoration: underline;
  }
`

StyledNavItemExternalLink.defaultProps = {
  py: 1,
  pl: 2,
  fontSize: 3,
}

const StyledNavLink = styled(StyledNavItemExternalLink)``.withComponent(
  (props) => <NavLink {...omitProps(props)} />
)

const omitProps = (props) => omit(props, ['py', 'pl'])

const StyledSubNavItemContainer = styled.div`
  ${space};
  display: none;

  .NavItem--active + & {
    display: block;
  }

  ${StyledNavItemExternalLink}, ${StyledNavLink} {
    ${fontSize};
    border-left: 0;
    color: ${(props) => props.theme.darkMedGrey};
    padding-left: 0;
  }
`

StyledSubNavItemContainer.defaultProps = {
  pl: 3,
  fontSize: 2,
}

const StyledNavItem = styled.div``

export {
  StyledNavLink,
  StyledNavItem,
  StyledSubNavItemContainer,
  StyledNavItemExternalLink,
}
