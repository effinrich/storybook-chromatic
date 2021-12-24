import React from 'react'
import PropTypes from 'prop-types'

import FlatButton from '../FlatButton'
import StyledMenuItem from './style'

const propTypes = {
  // This component implements styled-system
  // See props available at: https://github.com/jxnblk/styled-system
  primaryText: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  replace: PropTypes.bool,
  itemRef: PropTypes.func,
}

const defaultProps = {
  textAlign: 'left',
  fontSize: 1,
}

const MenuItem = (props) => {
  const { primaryText, itemRef, ...restProps } = props
  return (
    <StyledMenuItem ref={itemRef}>
      <FlatButton px={15} py={10} width={1 / 1} {...restProps}>
        {primaryText}
      </FlatButton>
    </StyledMenuItem>
  )
}

MenuItem.propTypes = propTypes
MenuItem.defaultProps = defaultProps

export default MenuItem
