import React from 'react'
import PropTypes from 'prop-types'

import Box from '../Box'

import {
  StyledNavItem,
  StyledSubNavItemContainer,
  StyledNavItemExternalLink,
  StyledNavLink,
} from './style'

/**
 * NavItem
 */

const NavItem = ({ children, label, href, ...restProps }) => {
  return (
    <StyledNavItem>
      {href ? (
        <StyledNavItemExternalLink href={href} {...restProps}>
          {label}
        </StyledNavItemExternalLink>
      ) : (
        <StyledNavLink activeClassName="NavItem--active" {...restProps}>
          {label}
        </StyledNavLink>
      )}
      {children && (
        <StyledSubNavItemContainer>{children}</StyledSubNavItemContainer>
      )}
    </StyledNavItem>
  )
}

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([NavItem]) })),
    PropTypes.shape({ type: PropTypes.oneOf([NavItem]) }),
  ]),
}

export { NavItem }

/**
 * VerticalNav
 */

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([NavItem]) })),
    PropTypes.shape({ type: PropTypes.oneOf([NavItem]) }),
  ]),
}

const defaultProps = {
  // Default Props go here
}

const VerticalNav = ({ children, ...styledProps }) => {
  return <Box {...styledProps}>{children}</Box>
}

VerticalNav.propTypes = propTypes
VerticalNav.defaultProps = defaultProps

export default VerticalNav
