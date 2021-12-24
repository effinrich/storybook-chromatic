import React from 'react'
import PropTypes from 'prop-types'

import StyledMenu from './style'

const propTypes = {
  // This component implements styled-system
  // See props available at: https://github.com/jxnblk/styled-system
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  py: 1,
  bg: 'white',
}

const Menu = (props) => {
  const { children, ...styledProps } = props
  return <StyledMenu {...styledProps}>{children}</StyledMenu>
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

export default Menu
