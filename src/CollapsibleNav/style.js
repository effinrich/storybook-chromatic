import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { space, fontSize } from 'styled-system'

import Seperator from '../Seperator'
import { omitStyled } from 'utils/styled'

const sharedStylePropsToOmit = [
  'match',
  'subMatch',
  'collapsible',
  'open',
  'labelColor',
  'activeColor',
  'isNavItemsBg',
]

export const StyledNavList = styled.ul`
  display: block;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const StyledNavItemLink = omitStyled(NavLink, sharedStylePropsToOmit)`
  ${space};
  ${fontSize};
  color: ${(props) => props.labelColor};
  display: block;
  text-decoration: none;

  ${(props) =>
    (props.match || props.subMatch) &&
    css`
      color: ${(props) => props.activeColor};
      font-weight: 500;
      ${(props) =>
    props.isNavItemsBg &&
        css`
          background-color: ${(props) => props.theme.primaryButtonOverBg};
        `}
    `};

  &:hover {
    color: ${(props) => props.activeColor};
    text-decoration: none;
  }
`

StyledNavItemLink.displayName = 'StyledNavItemLink'

StyledNavItemLink.defaultProps = {
  px: 3,
  py: 2,
  fontSize: 2,
}

export const StyledNavItemSeperator = omitStyled(
  Seperator,
  sharedStylePropsToOmit
)`
  ${(props) =>
    props.collapsible &&
    !props.open &&
    css`
      display: none;
    `};
`

StyledNavItemSeperator.displayName = 'StyledNavItemSeperator'

export const StyledNavItem = styled.li`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;

  ${(props) =>
    props.collapsible &&
    !props.open &&
    !props.match &&
    css`
      display: none;
    `};

  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `};
`

StyledNavItem.displayName = 'StyledNavItem'

export const StyledSubNavItemContainer = styled.ul`
  ${space};
  display: none;
  padding-left: 0;
  list-style: none;
  text-indent: 10px;

  ${(props) =>
    props.isNavItemsBg &&
    css`
      padding: 0;
    `}

  .active + & {
    display: block;
  }

  ${(props) =>
    props.collapsible &&
    !props.open &&
    css`
      display: none !important;
    `};
`

StyledSubNavItemContainer.defaultProps = {
  fontSize: 2,
}

StyledSubNavItemContainer.displayName = 'StyledSubNavItemContainer'

export const StyledNavItemIcon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  line-height: 10px;
  ${space};
`

StyledNavItemIcon.defaultProps = {
  px: 3,
  py: 2,
}

export const StyledNav = styled.nav`
  background: ${(props) => props.navBgColor};
`
